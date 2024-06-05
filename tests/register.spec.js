const { test, chromium } = require('@playwright/test');

test('click register button', async ({ page }) => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log("Navigating to the registration page...");
    await page.goto('https://dev-admin.msq.market/');
    await page.click('#btn_login_register');

    console.log("Filling in the registration form...");
    await page.getByPlaceholder('Name').fill("Kelly Handsome");
    await page.getByPlaceholder('Email address').fill("kelly@gmail.com");
    await page.getByPlaceholder('Password', { exact: true }).fill("123456");
    await page.getByPlaceholder('Confirm Password', { exact: true }).fill("123456");

    console.log("Accepting terms and conditions...");
    await page.getByRole('checkbox', { name: 'I accept terms & conditions' }).check();

    console.log("Submitting the registration form...");
    await page.getByRole('button', { name: "Sign Up" }).click();

    console.log("Test completed.");
  } catch (error) {
    console.error('Test failed:', error);
    await page.screenshot({ path: 'screenshot.png' });
    throw error;
  }
});
