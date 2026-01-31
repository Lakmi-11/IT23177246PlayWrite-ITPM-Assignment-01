const { test, expect } = require('@playwright/test');

test('IT23177246-Pos_UI_0001 - Sinhala output get correctly in real-time', async ({ page }) => {

  test.setTimeout(120000);

  await page.goto('https://www.swifttranslator.com/', {
    waitUntil: 'domcontentloaded'
  });

  await page.waitForTimeout(4000);

  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();
  await singlishBox.fill('');

  await singlishBox.type('sapaththu hadhanna thiyenavaa', { delay: 120 });
  await page.waitForTimeout(1000);

  const translateButton = page.locator('button').filter({ has: page.locator('svg') }).first();
  await translateButton.click();
  await page.waitForTimeout(8000);

  const pageText = await page.evaluate(() => document.body.innerText);
  expect(pageText).toMatch(/[අ-ෆ]/);
  expect(pageText.length).toBeGreaterThan(100);

  await page.screenshot({
    path: 'screenshots/UI/IT23177246-Pos-UI-0001.png',
    fullPage: true
  });
});
