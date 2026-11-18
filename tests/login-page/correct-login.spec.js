//@ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/loginpagePractise/';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
})

test('Sign in to the app', async ({ page }) => {
    const radio = page.getByRole('radio', { name: 'User' });
    const dropdown = page.getByRole('combobox');
    const OPTION = 'consult';
    const checkbox = page.getByRole('checkbox');
    const dialogMessage = 'You will be limited to only fewer functionalities of the app. Proceed?';

    // read the username and password from the page
    const pageText = await page.locator('p.text-center.text-white').innerText();
    console.log(`The innertext is: ${pageText}`);
    const username = pageText.split('username is ')[1].split(' and')[0];
    const password = pageText.split('Password is ')[1].split(')')[0].trim();
    console.log("Username is: " + username);
    console.log("Password is: " + password);
    // add username and password
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    // choose radio button - User
    await radio.click();
    // check the dialog after choosing User
    const dialog = page.getByText(dialogMessage);
    console.log("The dialog text is: " + await dialog.innerText());
    await expect(dialog).toHaveText(dialogMessage);


    await page.getByRole('button', { name: 'Okay' }).click();
    // check if the dialog is hidden 
    await expect(dialog).not.toBeVisible();
    // is the User selected
    await expect(radio).toBeChecked();

    // select the Consultant option from dropdown and check that is visible after selection
    await dropdown.selectOption(OPTION);
    await expect(dropdown).toHaveValue(OPTION);

    // check the conditions
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // click sign in
    await page.getByRole('button', { name: 'Sign In' }).click();

    // check that you are on a new page
    await expect(page).toHaveURL(/shop/);

    // each product is one app-card
    const products = page.locator('app-card');
    await expect(products).toHaveCount(4);
    console.log('On the page there are ' + await products.count() + ' products');
});


