//@ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/angularpractice/';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('Form is submitted with valid data', async ({ page }) => {
    const name = page.locator("div[class='form-group'] input[name='name']");
    const email = page.locator("[name='email']");
    const password = page.getByRole('textbox', { name: 'Password' });
    const checkbox = page.getByRole('checkbox', { name: 'Check me out if you Love IceCreams!' });
    const dropdown = page.getByRole('combobox', { name: 'Gender' });
    const radio = page.getByRole('radio', { name: 'Employed' });
    const date = page.locator('[name="bday"]');
    const successText = page.locator('div.alert.alert-success.alert-dismissible');

    const USER_NAME = 'user1';
    const USER_EMAIL = 'user@u.com';
    const USER_PASSWORD = 'user1';
    const DROPDOWN_F = 'Female';
    const SET_DATE = '1956-01-01';
    const SUCCESS = 'The Form has been submitted successfully!.'

    // fill Name, Email, Password
    await name.fill(USER_NAME);
    await email.fill(USER_EMAIL);
    await expect(email).toHaveValue(USER_EMAIL);
    await password.fill(USER_PASSWORD);
    await expect(password).toHaveValue(USER_PASSWORD);

    // check "Check me out if you Love IceCreams!"
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // select Gender in the dropdown
    await dropdown.selectOption(DROPDOWN_F);
    await expect(dropdown).toHaveValue(DROPDOWN_F);

    // choose Employment Status (radio)
    await radio.click();
    await expect(radio).toBeChecked();

    // fill Date of Birth (format YYYY-MM-DD)
    await page.locator('[name="bday"]').fill(SET_DATE);
    await expect(date).toHaveValue(SET_DATE);

    // click Submit
    await page.getByRole('button', { name: 'Submit' }).click();

    // the success message is visible ("Success! ...)
    await expect(successText).toContainText(SUCCESS);
});



test('Name shows length and required errors', async ({ page }) => {
    const name = page.locator("div[class='form-group'] input[name='name']");
    const alertMessage = page.locator('div.alert.alert-danger');

    const USER_NAME = 'u';

    // type one letter into Name
    await name.fill(USER_NAME);

    // leave the field (press Tab)
    await page.keyboard.press('Tab');

    // the message "Name should be at least 2 characters" is visible
    await expect(alertMessage).toContainText('Name should be at least 2 characters');
    await name.clear();
    // the message "Name is required" is visible
    await expect(page.locator('div.form-group').first()).toContainText('Name is required');
});



test('Entrepreneur option is disabled', async ({ page }) => {
    // the Entrepreneur radio button is disabled
    await expect(page.getByLabel('Entrepreneur (disabled)')).toBeDisabled();
});



test('Typed name appears in the two-way binding field', async ({ page }) => {
    const name = page.locator("div[class='form-group'] input[name='name']");

    const USER_NAME = 'user2';

    // type a name into Name (in the form);
    await name.fill(USER_NAME);
    // the Two-way Binding field shows the same name
    await expect(page.getByRole('heading', { name: 'Two-way Data Binding example: ' }).getByRole('textbox')).toHaveValue(USER_NAME);
});

