import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';
const NEW_URL = 'https://www.qaclickacademy.com';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('Open Tab opens qaclickacademy in a new tab', async ({ page }) => {
    await expect(page).toHaveTitle('Practice Page');
    // wait for the page
    const newPagePromise = page.waitForEvent('popup');
    // click on the tab 
    await page.getByRole('link', { 'name': 'Open Tab' }).click();

    const newPage = await newPagePromise;
    await expect(newPage).toHaveURL(NEW_URL);
    await newPage.close();

    if (newPage.isClosed()) {
        console.log('Page is closed!');
    }
    // checking it the page was realy closed
    page.context().pages().length;
})

test('Open Window opens qaclickacademy in a new window', async ({ page }) => {
    // wait for the page
    const newPagePromise = page.waitForEvent('popup');
    // click on the window button
    await page.getByRole('button', { 'name': 'Open Window' }).click();

    const newPage = await newPagePromise;
    await expect(newPage).toHaveURL(NEW_URL);
    await newPage.close();

    if (newPage.isClosed()) {
        console.log('Page is closed!');
    }
    // checking it the page was realy closed
    page.context().pages().length;
});