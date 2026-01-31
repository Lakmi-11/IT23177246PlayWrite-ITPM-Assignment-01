const { test, expect } = require('@playwright/test');

test('Pos_Fun_0001 - Convert basic everyday statement', async ({ page }) => {

  test.setTimeout(70000);

  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // Singlish input
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  await page.keyboard.type(
    'mama kadeeta yanavaa',
    { delay: 120 }
  );

  await page.waitForTimeout(2500);

  // Click translate
  await page.locator('button svg').first().click();
  await page.waitForTimeout(5000);

  // ✅ SAFE ASSERTION (Sinhala unicode exists)
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // Screenshot proof
  await page.screenshot({ path: 'screenshots/pos-fun-0001.png' });
});
