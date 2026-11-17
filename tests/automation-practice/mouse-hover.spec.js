// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('Hover the Mause hover button and click Top on the menu', async ({ page }) => {
    const topBtn = page.getByRole('link', { name: 'Top' });
    const reloadBtn = page.getByRole('link', { name: 'Reload' });
    const heading = page.getByRole('heading', { name: 'Practice Page' });

    // menu is hidden before hover
    await expect(page.locator('div.mouse-hover-content')).toBeHidden();

    // hover shows the menu (and scrolls the page down)
    await page.getByRole('button', { name: 'Mouse Hover' }).hover();

    // checkes the menu elements to be displayed
    await expect(topBtn).toBeVisible();
    await expect(reloadBtn).toBeVisible();

    // the heading is not visible
    await expect(heading).not.toBeInViewport();
    await page.getByRole('link', { name: 'Top' }).click();

    // back at the top
    await expect(heading).toBeInViewport();
});

test('Add data to alert fieldm click Reload and check that data was removed', async ({ page }) => {
    const textBox = page.getByRole('textbox', { name: 'Enter Your Name' });
    const NAME = 'Jaka';

    // add data to the Alert field
    await textBox.fill(NAME);
    await expect(textBox).toHaveValue(NAME);

    // hover the button and ckick reload the page
    await page.getByRole('button', { name: 'Mouse Hover' }).hover();
    await page.getByRole('link', { name: 'Reload' }).click();

    // after the reload the field is empty again
    await expect(textBox).toBeEmpty();
});