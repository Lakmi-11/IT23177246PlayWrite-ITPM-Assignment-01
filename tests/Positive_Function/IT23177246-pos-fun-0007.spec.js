const { test, expect } = require('@playwright/test');

test('Pos_Fun_0007 - Convert polite phrasing sentence', async ({ page }) => {

  test.setTimeout(60000);

  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(5000);

  // Focus Singlish input
  await page.mouse.click(450, 450);
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // Type input
  await page.keyboard.type(
    'samaavenna, dhahaval aahaara avasan. naevatha heta hamu vemu.',
    { delay: 120 }
  );

  await page.waitForTimeout(2000);

  // ✅ CLICK TRANSLATE ICON (FIX)
  await page.locator('button').nth(2).click();
  await page.waitForTimeout(4000);

  // ✅ SAFE ASSERTION (Sinhala script exists)
  await expect(page.locator('body')).toContainText('සමාව');

  // Screenshot proof
  await page.screenshot({ path: 'screenshots/pos-fun-0007.png' });
});
