//@ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/loginpagePractise/';
const NEW_PAGE_URL = 'https://rahulshettyacademy.com/documents-request';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});


test('email from the Free Access page is entered as username', async ({ page }) => {
    const linkFreeA = 'Free Access to InterviewQues/ResumeAssistance/Material';
    const userNameField = page.getByRole('textbox', { name: 'Username' });

    // wait for the page
    const newPagePromise = page.waitForEvent('popup');
    // click on the free access link
    await page.getByRole('link', { name: linkFreeA }).click();

    // on new page read the text with e-mail
    const newPage = await newPagePromise;
    await expect(newPage).toHaveURL(NEW_PAGE_URL);

    // read the email from the new page text
    const pageText = await newPage.locator('p.im-para.red').innerText();
    console.log(`The innertext is: ${pageText}`);
    const email = pageText.split('Please email us at ')[1].split(' with')[0];
    console.log("Email is: " + email);

    // the first tab is still on the login page
    await expect(page).toHaveURL(BASE_URL);

    // add username and check the value
    await userNameField.fill(email);
    expect(email).toBe('mentor@rahulshettyacademy.com');
});

test('domain from the Free Access page is entered as username', async ({ page }) => {
    const linkFreeA = 'Free Access to InterviewQues/ResumeAssistance/Material';
    const userNameField = page.getByRole('textbox', { name: 'Username' });

    // wait for the page
    const newPagePromise = page.waitForEvent('popup');
    // click on the free access link
    await page.getByRole('link', { name: linkFreeA }).click();

    // on new page read the text with e-mail
    const newPage = await newPagePromise;
    await expect(newPage).toHaveURL(NEW_PAGE_URL);

    // read the username from the new page text
    const pageText = await newPage.locator('p.im-para.red').innerText();
    console.log(`The innertext is: ${pageText}`);
    const email = pageText.split('Please email us at ')[1].split(' with')[0];
    const domain = email.split('@')[1];
    console.log("Domain is: " + domain);

    // the first tab is still on the login page
    await expect(page).toHaveURL(BASE_URL);

    // add username and check the value
    await userNameField.fill(domain);
    expect(domain).toBe('rahulshettyacademy.com');
});