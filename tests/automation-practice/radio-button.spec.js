import { test, expect } from '@playwright/test';
const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('Only one radio button can be selected at a time', async ({ page }) => {
    const radioButtons = page.getByRole('radio');
    // check that there are 3 radio buttons
    await expect(radioButtons).toHaveCount(3);
    // check each radio button one by one
    for (let i = 0; i < await radioButtons.count(); i++) {
        await expect(radioButtons.nth(i)).not.toBeChecked();
        console.log(`How many radio buttons are there? ${i}`);
    }
    // the 0-th radio button is selected
    await radioButtons.nth(0).click();
    // check which radio button is not selected
    const count = await radioButtons.count();
    for (let j = 0; j < count; j++) {
        if (j !== 0) {
            await expect(radioButtons.nth(j)).not.toBeChecked();
            console.log(` Which button is not selected? ${j}`);
        }
    }
});

test('Check that the radio button is selected', async ({ page }) => {
    const radioButtons = page.getByRole('radio');
    const button1 = radioButtons.nth(0);
    const button2 = radioButtons.nth(1);
    const button3 = radioButtons.nth(2);
    // there are exactly 3 radio buttons
    await expect(radioButtons).toHaveCount(3);
    // none is selected at the start
    await expect(button1).not.toBeChecked();
    await expect(button2).not.toBeChecked();
    await expect(button3).not.toBeChecked();
    // select Radio1 -> only Radio1 is selected
    await button1.click();
    await expect(button1).toBeChecked();
    await expect(button2).not.toBeChecked();
    await expect(button3).not.toBeChecked();
    // select Radio2 -> only Radio2 is selected
    await button2.click();
    await expect(button2).toBeChecked();
    await expect(button1).not.toBeChecked();
    await expect(button3).not.toBeChecked();
    // select Radio3 -> only Radio3 is selected
    await button3.click()
    await expect(button3).toBeChecked();
    await expect(button1).not.toBeChecked();
    await expect(button2).not.toBeChecked();
});

test.only('Only one radio button is selected after each click', async ({ page }) => {
    const radioButtons = page.getByRole('radio');
    // check that there are 3 radio buttons
    await expect(radioButtons).toHaveCount(3);
    // count buttons
    const count = await radioButtons.count();

    // check each radio button one by one
    for (let clicked = 0; clicked < count; clicked++) {
        await radioButtons.nth(clicked).click();
        await expect(radioButtons.nth(clicked)).toBeChecked();
        console.log(`Clicked ${clicked}`);

        // all other radio buttons are not selected
        for (let j = 0; j < count; j++) {
            if (j !== clicked) {
                await expect(radioButtons.nth(j)).not.toBeChecked();
                console.log(` Which button is not selected? ${j}`);
            }
        }
    }
});