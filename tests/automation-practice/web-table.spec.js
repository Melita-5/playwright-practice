// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('has 9 rows', async ({ page }) => {
    // rows of the right table
    const rows = page.getByRole('group', { name: 'Web Table Fixed header' }).locator('tbody').locator('tr');
    await expect(rows).toHaveCount(9);
    const rowCount = await rows.count();

    // add up the Amount column (4th cell in every row)
    let total = 0;
    for (let i = 0; i < rowCount; i++) {
        const amountText = await rows.nth(i).locator('td').nth(3).innerText();
        total = total + Number(amountText);
        console.log(`Row ${i}: ${amountText}, total so far: ${total}`);
    }
    // read the number from "Total Amount Collected: 296"
    const totalText = await page.getByText('Total Amount Collected').innerText();

    const expectedTotal = Number(totalText.split(':')[1]);
    console.log("The result is: " + expect(total).toBe(expectedTotal));
});


test.only('three courses in the Web Table cost 25', async ({ page }) => {
    // rows of the left table (the header row has no td cells, so it is skipped)
    const rows = page.getByRole('group', { name: 'Web Table Example' })
        .locator('tbody tr').filter({ has: page.locator('td') });
    const rowCount = await rows.count();

    // add up the Amount column (3th cell in every row)
    const PRICE = 25;
    let count = 0;
    for (let i = 0; i < rowCount; i++) {
        const amountText = await rows.nth(i).locator('td').nth(2).innerText();
        if (Number(amountText) === PRICE) {
            count = count + 1;
            console.log(`Count status for price ${amountText} is ${count}`);
        }
    }
    console.log(`There are ${count} courses that cost ${PRICE}`);
    expect(count).toBe(4);
});

