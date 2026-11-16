import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/AutomationPractice/';
const NAME = 'Jaka';
const MESSAGE_ALERT = `Hello ${NAME}, share this practice page and share your knowledge`;
const MESSAGE_CONFIRM = `Hello ${NAME}, Are you sure you want to confirm?`;

// Task 5: Alert in Confirm 

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

test('Test alert button, and check the popup window', async ({ page }) => {
    // empty box for the message
    let messageAlert = '';
    // when the dialog appears: remember its message and press OK
    page.once('dialog', async dialog => {
        messageAlert = dialog.message();
        await dialog.accept();
    });
    await page.getByPlaceholder('Enter Your Name').fill(NAME);
    await page.locator('#alertbtn').click();
    // check the remembered message
    console.log("The message is:" + messageAlert)
    expect(messageAlert).toBe(MESSAGE_ALERT);
});

test('Test confirm button, and confirm the popup window', async ({ page }) => {
    // empty box for the message
    let messageConfirm = '';
    // wait for dialog 
    page.once('dialog', async dialog => {
        messageConfirm = dialog.message();
        await dialog.accept();
    });
    await page.getByPlaceholder('Enter Your Name').fill(NAME);
    await page.locator('#confirmbtn').click();
    console.log('The message is ' + messageConfirm);
    expect(messageConfirm).toBe(MESSAGE_CONFIRM);
});

test('Test confirm button, and cencel the popup window', async ({ page }) => {
    // empty box for the message
    let messageConfirm2 = '';
    // wait for dialog
    page.once('dialog', async dialog => {
        messageConfirm2 = dialog.message();
        await dialog.dismiss();
    });
    await page.getByPlaceholder('Enter Your Name').fill(NAME);
    await page.locator('#confirmbtn').click();
    console.log('The message is ' + messageConfirm2);
    expect(messageConfirm2).toBe(MESSAGE_CONFIRM);
});




