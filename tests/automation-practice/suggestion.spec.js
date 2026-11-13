import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';
const SHORT_WORD_COUNTRY = 'slove';
const TEST_WORD = 'tralal';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('Select Slovenia from the suggestion list', async ({ page }) => {
    const placeholder = page.getByRole('textbox', { name: 'Type to Select Countries' });
    const value = page.getByText('Slovenia', { exact: true });

    await placeholder.pressSequentially(SHORT_WORD_COUNTRY);
    await expect(placeholder).toHaveValue(SHORT_WORD_COUNTRY);

    // wait until the suggestion is visible
    await expect(value).toBeVisible();

    // click Slovenia in the suggestion list
    await value.click();

    // the text box now contains the selected country
    await expect(placeholder).toHaveValue('Slovenia');
});


test('No suggestions for a country that does not exist', async ({ page }) => {
    const placeholder = page.getByRole('textbox', { name: 'Type to Select Countries' });

    // first make sure the suggestion list works
    await placeholder.pressSequentially(SHORT_WORD_COUNTRY);
    await expect(page.getByText('Slovenia', { exact: true })).toBeVisible();

    // clear the text box and type a country that does not exist
    await placeholder.clear();
    await placeholder.pressSequentially(TEST_WORD);
    await expect(placeholder).toHaveValue(TEST_WORD);

    // no suggestion is visible for a country that does not exist
    await expect(page.locator('.ui-menu-item').filter({ visible: true })).toHaveCount(0);
});


