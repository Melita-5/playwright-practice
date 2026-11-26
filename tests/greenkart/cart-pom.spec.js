// @ts-check
import { test, expect } from '@playwright/test';
import { ALL_PRODUCTS_COUNT, CART } from '../data/greenkart-data'
import { GreenKartPage } from '../page-object/GreenKartPage';

test.beforeEach(async ({ page }) => {
    const greenKart = new GreenKartPage(page);
    await greenKart.goto();
});

// 15b-1
test('Items in the header grow with every added product', async ({ page }) => {
    const greenKart = new GreenKartPage(page);

    // products are loaded before adding to the cart
    await expect(greenKart.visibleProducts).toHaveCount(ALL_PRODUCTS_COUNT);

    for (const product of CART) {
        const name = product.name;
        const count = product.expectedCards;
        const added = product.addedItems;

        // search for the specific name, only one card should be displayed
        await greenKart.search(name);
        await expect(greenKart.visibleProducts).toHaveCount(count);
        await expect(greenKart.foundName).toContainText(name);

        // add the product to the cart
        await greenKart.addToCart();
        // check the "Items" number in the header
        await expect(greenKart.itemsInHeader).toHaveText(String(added));
        console.log(`Added ${name} -> items in the cart: ${added}.`);
    }
});


// 15b-2
test('header price equals the sum of the added products', async ({ page }) => {
    const greenKart = new GreenKartPage(page);

    // products are loaded before adding to the cart
    await expect(greenKart.visibleProducts).toHaveCount(ALL_PRODUCTS_COUNT);

    let total = 0;

    for (const product of CART) {
        const name = product.name;
        const count = product.expectedCards;
        const added = product.addedItems;
        const price = product.price;
        const sum = product.sum;

        // search for the specific name, only one card should be displayed
        await greenKart.search(name);
        await expect(greenKart.visibleProducts).toHaveCount(count);
        await expect(greenKart.foundName).toContainText(name);

        // read the price from the card
        const cardPrice = await greenKart.getCardPrice();
        expect(Number(cardPrice)).toBe(price);
        console.log(`${cardPrice} is equal to the ${price} `);

        // add this card price to the total (pattern: sum)
        total = total + Number(cardPrice);
        console.log('The sum is ' + total);

        // my total (from the cards) equals the sum from the data
        expect(total).toBe(sum);

        // add the product to the cart
        await greenKart.addToCart();

        // check: the "Price" number in the header equals your sum
        await expect(greenKart.priceInHeader).toHaveText(String(sum));
        console.log(`Added ${name} -> items in the cart: ${added} cost: ${sum}.`);
    }
    // final check: my total equals the last sum in the data
    expect(total).toBe(CART[CART.length - 1].sum);
    console.log(`The sum ${total} is equal to the data sum ${CART[CART.length - 1].sum}`);
});

