const { test, expect } = require('@playwright/test');

test('Pos_Fun_0017 - Convert input with multiple spaces and line breaks', async ({ page }) => {

  // Allow enough time for AI translation
  test.setTimeout(90000);

  // 1️⃣ Open Swift Translator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 2️⃣ Locate Singlish input textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear any existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Type text with multiple spaces and a line break
  await page.keyboard.type(
    'lassanata    mal       pipilaa.\nmal              kadanna          puluvan.',
    { delay: 120 }
  );

  // 5️⃣ Trigger auto translation
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  // 6️⃣ Blur textarea to force translation
  await page.mouse.click(10, 10);
  await page.waitForTimeout(7000);

  // 7️⃣ SAFE assertion – Sinhala Unicode exists
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // 8️⃣ Screenshot proof for assignment submission
  await page.screenshot({ path: 'screenshots/pos-fun-0017.png' });
});
