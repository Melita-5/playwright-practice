// @ts-check
import { test, expect } from '@playwright/test';
import { ALL_PRODUCTS_COUNT, CART, QUANTITY_ORDER } from '../data/greenkart-data'
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
        expect(cardPrice).toBe(price);
        console.log(`${cardPrice} is equal to the ${price} `);

        // add this card price to the total (pattern: sum)
        total = total + cardPrice;
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

// 15d
test('Adding products with one method gives the expected header price', async ({ page }) => {
    const greenKart = new GreenKartPage(page);

    // products are loaded before adding to the cart
    await expect(greenKart.visibleProducts).toHaveCount(ALL_PRODUCTS_COUNT);

    for (const product of CART) {
        const name = product.name;
        const count = product.expectedCards;
        const sum = product.sum;

        // add the product (search + click) with one method
        await greenKart.addProduct(name);

        // check: the "Price" number in the header equals the sum from the data
        await expect(greenKart.priceInHeader).toHaveText(String(sum));
        console.log(`Added ${name} -> price in the header: ${sum}`);

    }
});

// 15e: add several pieces of one product (quantity) and check the header
test.only('Adding 3 pieces of one product gives the expected price', async ({ page }) => {
    const greenKart = new GreenKartPage(page);

    const productName = QUANTITY_ORDER[0].name;
    const quantity = QUANTITY_ORDER[0].quantity;
    const addedItem = QUANTITY_ORDER[0].addedItems;
    const price = QUANTITY_ORDER[0].price;
    const finalSum = QUANTITY_ORDER[0].sum;
    const cardNumber = QUANTITY_ORDER[0].cards;

    // products are loaded before adding to the cart
    await expect(greenKart.visibleProducts).toHaveCount(ALL_PRODUCTS_COUNT);

    // search for the product
    await greenKart.search(productName);

    // check that only specific card is visible
    await expect(greenKart.visibleProducts).toHaveCount(cardNumber);

    // increase the quantity
    await greenKart.increaseQuantity(productName, (quantity - 1));

    // check: the quantity field shows the expected number
    const cardQuantity = await greenKart.getQuantity(productName);
    expect(cardQuantity).toBe(quantity);

    // check: the price on the card
    await expect(greenKart.priceLocator).toHaveText(String(price));
    console.log(`Price on the product card is '${price}'.`);

    // add to cart
    await greenKart.addToCart();

    // check: "Items" in the header
    await expect(greenKart.itemsInHeader).toHaveText(String(addedItem));
    console.log(`Added product is '${productName}'.`);

    // check: the "Price" number in the header equals the sum from the data
    await expect(greenKart.priceInHeader).toHaveText(String(finalSum));
    console.log(`Added ${productName} -> items in the cart: ${addedItem} cost: ${finalSum}.`);
});


