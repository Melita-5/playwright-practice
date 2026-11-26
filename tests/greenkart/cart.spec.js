// @ts-check
import { test, expect } from '@playwright/test';
import { BASE_URL, ALL_PRODUCTS_COUNT, CART } from '../data/greenkart-data'
import { count } from 'node:console';


test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});


// 15a-1
test('Items in the header grow with every added product', async ({ page }) => {
    const productsList = page.locator('div.product');

    // products are loaded before adding to the cart
    const fullList = productsList.filter({ visible: true });
    await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

    for (const product of CART) {
        const name = product.name;
        const count = product.expectedCards;
        const added = product.addedItems;

        // search for the specific name, only one card should be displayed
        await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(name);
        await expect(fullList).toHaveCount(count);
        await expect(fullList.locator('h4.product-name')).toContainText(name);

        // add the product to the cart
        await fullList.getByRole('button', { name: 'ADD TO CART' }).click();
        // check the "Items" number in the header
        await expect(page.locator(`//tr[td[1][contains(., 'Items')]]//td[3]//strong`)).toHaveText(String(added));
        console.log(`Added ${name} -> items in the cart: ${added}.`);
    }
});


// 15a-2
test('header price equals the sum of the added products', async ({ page }) => {
    const productsList = page.locator('div.product');

    // products are loaded before adding to the cart
    const fullList = productsList.filter({ visible: true });
    await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

    const priceLocator = fullList.locator('p.product-price');
    let total = 0;


    for (const product of CART) {
        const name = product.name;
        const count = product.expectedCards;
        const added = product.addedItems;
        const price = product.price;
        const sum = product.sum;

        // search for the specific name, only one card should be displayed
        await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(name);
        await expect(fullList).toHaveCount(count);
        await expect(fullList.locator('h4.product-name')).toContainText(name);

        // read the price from the card
        const cardPrice = await priceLocator.innerText();
        expect(Number(cardPrice)).toBe(price);
        console.log(`${cardPrice} is equal to the ${price} `);

        // add this card price to the total (pattern: sum)
        total = total + Number(cardPrice);
        console.log('The sum is ' + total);

        // my total (from the cards) equals the sum from the data
        expect(total).toBe(sum);

        // add the product to the cart
        await fullList.getByRole('button', { name: 'ADD TO CART' }).click();

        // check the "Price" number in the header
        const headPrice = page.locator('.cart-info tr').filter({ hasText: 'Price' }).locator('strong');

        // check: the "Price" number in the header equals your sum
        await expect(headPrice).toHaveText(String(sum));
        console.log(`Added ${name} -> items in the cart: ${added} cost: ${sum}.`);
    }
    // final check: my total equals the last sum in the data
    expect(total).toBe(CART[CART.length - 1].sum);
    console.log(`The sum ${total} is equal to the data sum ${CART[CART.length - 1].sum}`);
});

