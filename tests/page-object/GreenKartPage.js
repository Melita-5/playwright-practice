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
        return await this.priceLocator.innerText();
    }

    // click "ADD TO CART" in the (only) visible card
    async addToCart() {
        await this.addCartButton.click();
    }
}








