// @ts-check
import { test, expect } from '@playwright/test';
import { BASE_URL, ALL_PRODUCTS_COUNT, SEARCHES, NO_MATCH, CA_NAMES, SEARCHES_INSENSITIVE } from '../data/greenkart-data.js';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('All products are shown at the start', async ({ page }) => {
    // all product cards are visible (count from your manual check)
    // only visible product cards (one hidden element also has the class "product")
    const products = page.locator('div.product').filter({ visible: true });
    await expect(products).toHaveCount(ALL_PRODUCTS_COUNT);
    console.log(`There are ${ALL_PRODUCTS_COUNT} products!`);
});



test('Search "ca" shows only matching products', async ({ page }) => {
    // type "ca" into the search field
    const term = SEARCHES[0].term;
    const count = SEARCHES[0].expectedCount;
    const productsList = page.locator('div.product');

    // products are visible before the search
    const fullList = productsList.filter({ visible: true });
    await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

    await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(term);

    // the number of products is right
    const products = productsList.filter({ visible: true });
    await expect(products).toHaveCount(count);

    // read all product names -> list of texts
    const names = await products.locator('h4.product-name').allTextContents();
    console.log('The names are: ' + names);
    console.log(`There are ${await products.count()} products: ${names}`);

    // every name contains "ca" (ignore upper/lower case)
    for (const name of names) {
        expect(name.toLowerCase()).toContain(term);
    }
    console.log(`If searching with '${term}' you get ${count} products.`);
});


for (const search of SEARCHES) {
    test(`search "${search.term}" shows ${search.expectedCount} products`, async ({ page }) => {
        const searchTerm = search.term;
        const result = search.expectedCount;
        const productsList = page.locator('div.product');

        // products are visible before the search
        const fullList = productsList.filter({ visible: true });
        await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

        // type into the search field
        await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(searchTerm);

        // the number of products is right
        const products = productsList.filter({ visible: true });
        await expect(products).toHaveCount(result);
        console.log(`If searching with '${searchTerm}' you get ${result} products.`);
    });
}


test('Search with no match shows no products', async ({ page }) => {
    // products are visible before the search
    const products = page.locator('div.product').filter({ visible: true });
    await expect(products).toHaveCount(ALL_PRODUCTS_COUNT);

    // type "xyz"
    await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(NO_MATCH.term);

    // no products are shown
    await expect(products).toHaveCount(0);

    // the "no products" message is visible
    await expect(page.locator('h2:visible')).toContainText(NO_MATCH.message);
});



// bonus
test('Search "ca" returns the expected product names', async ({ page }) => {
    const term = SEARCHES[0].term;
    const count = SEARCHES[0].expectedCount;
    const productsList = page.locator('div.product');

    // products are visible before the search
    const fullList = productsList.filter({ visible: true });
    await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

    // FIRST search ...
    await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(term);

    // ... THEN wait for the right number of products
    const products = productsList.filter({ visible: true });
    await expect(products).toHaveCount(count);

    // read all product names -> list of texts
    const names = await products.locator('h4.product-name').allTextContents();
    console.log('The names are: ' + names);
    console.log(`There are ${await products.count()} products: ${names}`);

    // Check if the cut off names equal to the expected array
    const shortNames = [];
    for (const name of names) {
        shortNames.push(name.split(' - ')[0]);
    }
    expect(shortNames).toEqual(CA_NAMES);
    console.log(shortNames + ' equals to ' + CA_NAMES + '!');
});



// Task 14 – extra practice
// 14b
test('Every product price on the start page is greater than 0', async ({ page }) => {
    const productsList = page.locator('div.product');

    // wait till all products are visible
    const products = productsList.filter({ visible: true });
    await expect(products).toHaveCount(ALL_PRODUCTS_COUNT);

    // read all the prices
    const priceTexts = await products.locator('p.product-price').allTextContents();
    console.log(`There are ${await products.count()} products: ${priceTexts}`);

    let total = 0;
    // change the values into numbers and check that each is greater than 0
    for (const text of priceTexts) {
        const price = Number(text);
        expect(price).toBeGreaterThan(0);
        console.log(`The ${price} is greater than 0.`);
        total = total + price;
    }
    console.log('The sum is ' + total);
});



// 14c
test('sum of prices for "ca" equals the expected total', async ({ page }) => {
    const term = SEARCHES[0].term;
    const count = SEARCHES[0].expectedCount;
    const sum = SEARCHES[0].expectedTotal;
    const productsList = page.locator('div.product');

    // wait till all products are visible
    const fullList = productsList.filter({ visible: true });
    await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

    // search by 'ca'
    await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(term);

    // wait until only the "ca" products are left
    const products = productsList.filter({ visible: true });
    await expect(products).toHaveCount(count);

    // read all the prices
    const priceTexts = await products.locator('p.product-price').allTextContents();
    console.log(`There are ${await products.count()} products: ${priceTexts}`);

    // sum the prices
    let total = 0;
    for (const text of priceTexts) {
        const price = Number(text);
        total = total + price;
    }
    // check that value is equal to the one you calculated
    expect(total).toBe(sum);
    console.log(`The ${total} is equal to ${sum}!`);
});



// 14d: names + total for every search (one test per data set)
for (const search of SEARCHES) {
    test(`search "${search.term}" shows the expected products and their total price`, async ({ page }) => {
        const term = search.term;
        const count = search.expectedCount;
        const sum = search.expectedTotal;
        const searchNames = search.names;
        const productsList = page.locator('div.product');

        // wait till all products are visible
        const fullList = productsList.filter({ visible: true });
        await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

        // search by the term
        await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(term);

        // read all product names and how many are there -> list of texts
        const products = productsList.filter({ visible: true });
        await expect(products).toHaveCount(count);
        const names = await products.locator('h4.product-name').allTextContents();
        console.log(`If searching with '${term}' you get '${count}' of the following products: ${names}.`);

        // Check if the cut off names equal to the expected array
        const shortNames = [];
        for (const name of names) {
            shortNames.push(name.split(' - ')[0]);
        }
        expect(shortNames).toEqual(searchNames);
        console.log(`${shortNames} equals to ${searchNames}!`);

        // read all the prices
        const priceTexts = await products.locator('p.product-price').allTextContents();
        console.log(`There are ${await products.count()} products: ${priceTexts}`);

        // sum the prices
        let total = 0;
        for (const text of priceTexts) {
            const price = Number(text);
            total = total + price;
        }
        // check that value is equal to the one you calculated
        expect(total).toBe(sum);
        console.log(`The ${total} is equal to ${sum}!`);
    });
}



// 14e
test('Search is not case sensitive ("ca" and "CA" give the same products)', async ({ page }) => {
    const searchField = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
    const productsList = page.locator('div.product');
    const resultLists = [];

    // wait till all products are visible
    const fullList = productsList.filter({ visible: true });
    await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

    // search with every term from the data
    for (const search of SEARCHES_INSENSITIVE) {
        const term = search.term;
        const count = search.expectedCount;

        await searchField.fill(term);
        // read all product names and how many are there -> list of texts
        const products = productsList.filter({ visible: true });
        await expect(products).toHaveCount(count);
        const names = await products.locator('h4.product-name').allTextContents();
        resultLists.push(names);
        // print only THIS search
        console.log(`If searching with '${term}' you get '${count}' and the following product/s list: ${names}`);
    }
    // print everything once, after the loop
    console.log(resultLists);
    // check that the lists are equal
    expect(resultLists[0]).toEqual(resultLists[1]);
});


// 14f
test('Tomato has the expected price', async ({ page }) => {
    // take the whole object once, then use the dot
    const search = SEARCHES[5];
    const term = search.term;
    const count = search.expectedCount;
    const expectedPrice = search.expectedTotal;
    const productName = search.names[0];
    const searchField = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
    const productsList = page.locator('div.product');

    // wait till all products are visible
    const fullList = productsList.filter({ visible: true });
    await expect(fullList).toHaveCount(ALL_PRODUCTS_COUNT);

    // search by 'tom'
    await searchField.fill(term);

    // fast check: find the Tomato card, then the price INSIDE the card
    const tomatoCard = productsList.filter({ hasText: productName });
    await expect(tomatoCard.locator('p.product-price')).toHaveText(String(expectedPrice));

    // slow check: read all product names and how many are there -> list of texts
    const products = productsList.filter({ visible: true });
    await expect(products).toHaveCount(count);
    const names = await products.locator('h4.product-name').allTextContents();
    // prices only from the found products, not from the whole page
    const priceTexts = await products.locator('p.product-price').allTextContents();
    console.log(`If searching with '${term}' you get '${count}' of the following products: ${names} with ${priceTexts}.`);

    // take the FIRST element of the list, then make a number
    const price = Number(priceTexts[0]);
    expect(price).toBe(expectedPrice);
    console.log(`${price} is equal to the ${expectedPrice}`);
});