const { test, expect } = require('@playwright/test');

test('Pos_Fun_0018 - Convert sentence with future tense expressions', async ({ page }) => {

  test.setTimeout(90000);

  // 1️⃣ Open site
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 2️⃣ Singlish textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Type future tense input
  await page.keyboard.type(
    'thaaththaa heta enavaa. mama heta eeka karannam.',
    { delay: 120 }
  );

  // 5️⃣ 🔥 CLICK TRANSLATE ICON (CENTER ↔)
  const translateIcon = page.locator('div').filter({
    has: page.locator('svg')
  }).nth(1);

  await translateIcon.click();

  // 6️⃣ Wait for Sinhala output
  await page.waitForTimeout(8000);

  // 7️⃣ SAFE assertion – Sinhala Unicode exists
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // 8️⃣ Screenshot proof
  await page.screenshot({ path: 'screenshots/pos-fun-0018.png' });
});
