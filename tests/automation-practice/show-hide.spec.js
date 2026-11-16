// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';
const VALUE = 'test';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
})

test('Show and hidde textbox', async ({ page }) => {
    const textBox = page.getByRole('textbox', { name: 'Hide/Show Example' });

    await expect(textBox).toBeVisible();
    await page.getByRole('button', { name: 'Hide' }).click();
    await expect(textBox).toBeHidden();
    await page.getByRole('button', { name: 'Show' }).click();
    await expect(textBox).toBeVisible();
});

test('Check that the value is visible after hidding', async ({ page }) => {
    const textBox = page.getByRole('textbox', { name: 'Hide/Show Example' });

    await textBox.fill(VALUE);
    await expect(textBox).toHaveValue(VALUE);
    await page.getByRole('button', { name: 'Hide' }).click();
    await page.getByRole('button', { name: 'Show' }).click();
    await expect(textBox).toHaveValue(VALUE);
});