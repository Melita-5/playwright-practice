//@ts-check
import { test, expect } from '@playwright/test';
import wrongLogins from '../data/wrong-logins.json';

const BASE_URL = 'https://rahulshettyacademy.com/loginpagePractise/';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

for (const data of wrongLogins) {
    test(`Wrong login for ${data.name}`, async ({ page }) => {

        const username = page.getByRole('textbox', { name: 'Username' });
        const password = page.getByRole('textbox', { name: 'Password' });

        await username.fill(data.username);
        await password.fill(data.password);

        // sign in
        await page.getByRole('button', { name: 'Sign In' }).click();

        // expect error message
        await expect(page.getByText(data.message)).toBeVisible();
        console.log(`Wrong login for ${data.name}`);

        // check URL that you are still on the same page
        await expect(page).toHaveURL(BASE_URL);
    });
}

