//@ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('iframe content is not visible to the main page', async ({ page }) => {
    const HEADER = 'JOIN OUR ACADEMY';
    const frame = page.frameLocator('#courses-iframe');

    // check that the expected text is not on the main page
    await expect(page.getByText(HEADER)).not.toBeVisible();

    // checking iframe
    await expect(frame.getByText(HEADER)).toBeVisible();
});

test('Clicking a link inside the iframe changes only the iframe', async ({ page }) => {
    const frame1 = page.frameLocator('#courses-iframe');
    const navigation = frame1.getByRole('link', { name: 'All Access plan' });
    const heading = frame1.getByRole('heading', { name: 'All Access Subscription' });

    // click All Access plan to move to new page
    await navigation.click();

    // check the text on the new page  
    await expect(heading).toBeVisible();

    //the main page should still have the title Practice Page
    await expect(page.getByText('Practice Page')).toBeVisible();
});

test('iframe shows more than 100000 students', async ({ page }) => {
    const frame2 = page.frameLocator('#courses-iframe');

    // filter the field with the specific value you are looking for
    const text = await frame2.locator('.counter-column').filter({ hasText: 'Students' }).locator('.count-text').innerText();
    console.log(`The innertext is: ${text}`);

    // remove the comma
    const number = Number(text.replace(/[.,]/g, ''));
    // keep only digits 0-9
    // const number = Number(text.replace(/[^0-9]/g, ''));       
    console.log((`When removing the comma you get ${number}`));

    // expect that the number you get is greater than 100000
    expect(number).toBeGreaterThan(100000);
    console.log(`The number: ${number} is greater then 100000`);
});
