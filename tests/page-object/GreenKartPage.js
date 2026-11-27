//@ts-check
import { BASE_URL } from '../data/greenkart-data';

export class GreenKartPage {

    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.productsList = page.locator('div.product');
        this.searchField = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
        this.visibleProducts = this.productsList.filter({ visible: true });
        this.foundName = this.visibleProducts.locator('h4.product-name');
        this.itemsInHeader = page.locator(`//tr[td[1][contains(., 'Items')]]//td[3]//strong`);
        this.priceInHeader = page.locator('.cart-info tr').filter({ hasText: 'Price' }).locator('strong');
        this.priceLocator = this.visibleProducts.locator('p.product-price');
        this.addCartButton = this.visibleProducts.getByRole('button', { name: 'ADD TO CART' });
    }

    // open the GreenKart start page
    async goto() {
        await this.page.goto(BASE_URL);
    }

    // type a name into the search field
    /** @param {string} name */
    async search(name) {
        await this.searchField.fill(name);
    }

    // read the price of the (only) visible card -> return it
    async getCardPrice() {
        return Number(await this.priceLocator.innerText());
    }

    // click "ADD TO CART" in the (only) visible card
    async addToCart() {
        await this.addCartButton.click();
    }

    // returns THE card with this name (a locator - nothing is clicked)
    /** @param {string} name */
    getCard(name) {
        return this.visibleProducts.filter({ hasText: name });
    }

    // add the product (search + click) with one method
    /** @param {string} name */
    async addProduct(name) {
        await this.search(name);
        // click the button in THE card with this name (not "the only visible card")
        await this.getCard(name).getByRole('button', { name: 'ADD TO CART' }).click();
    }

    /**
     * @param {string} name
     * @param {number} times
     */
    async increaseQuantity(name, times) {
        for (let i = 0; i < times; i++) {
            await this.getCard(name).getByRole('link', { name: '+' }).click()
        }
    }

    /**
     * @param {string} name 
     */
    async getQuantity(name) {
        return Number(await this.getCard(name).locator('input.quantity').inputValue());
    }
}



