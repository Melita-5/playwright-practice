import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('Test the dropdown field, by selecting Option2', async ({ page }) => {
    const selectField = page.getByRole('combobox');
    // nothing is selected at the start (value of "Select" is empty)
    await expect(selectField).toHaveValue('');
    await expect(selectField.locator('option:checked')).toHaveText('Select');

    // select Option2
    await selectField.selectOption('option2');
    await expect(selectField).toHaveValue('option2');
    // select Option3
    await selectField.selectOption('option3');
    await expect(selectField).toHaveValue('option3');
});

test('Test the checkbox field, option 1 and option 3', async ({ page }) => {
    const option1 = page.locator('#checkBoxOption1');
    const option3 = page.locator('#checkBoxOption3');
    const option2 = page.locator('#checkBoxOption2');
    const options = [option1, option2, option3];

    // nothing is selected at the start
    for (let i = 0; i < options.length; i++) {
        const notSelected = options[i];
        console.log(`Unchecked chceckbox ${options[i]}`);
        await expect(options[i]).not.toBeChecked();
    }
    // check Option1 and Option3
    await option1.check();
    await option3.check();
    await expect(option1).toBeChecked();
    await expect(option3).toBeChecked();
    // option2 should not be checked
    await expect(option2).not.toBeChecked();
    // uncheck Option1
    await option1.uncheck();
    // Option1 is not checked, Option3 still is
    await expect(option1).not.toBeChecked();
    await expect(option2).not.toBeChecked();
    await expect(option3).toBeChecked();
});
