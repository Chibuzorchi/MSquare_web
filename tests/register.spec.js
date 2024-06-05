const { test, chromium} = require('@playwright/test');


test('click register button', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://dev-admin.msq.market/');
  await page.click('#btn_login_register');
  await page.getByPlaceholder('Name').fill("Kelly Handsome")
  await page.getByPlaceholder('Email address').fill("kelly@gmail.com");
  await page.getByPlaceholder('Password', { exact: true }).fill("123456")
  await page.getByPlaceholder('Confirm Password', { exact: true }).fill("123456")

  await page.getByRole('checkbox', { name: 'I accept terms & conditions' }).check();
  
  await page.getByRole('button', { name: "Sign Up" }).click();
  
});
