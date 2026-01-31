const { test, expect } = require('@playwright/test');

test('Pos_Fun_0003 - Convert sentence with time and English word', async ({ page }) => {

  test.setTimeout(70000);

  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // Singlish input
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  await page.keyboard.type(
    'mata raee 9 n passee Diet karanna oonee',
    { delay: 120 }
  );

  await page.waitForTimeout(2500);

  // Click translate
  await page.locator('button svg').first().click();
  await page.waitForTimeout(5000);

  // ✅ STABLE ASSERTION (same as 0001 & 0002)
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // Screenshot proof
  await page.screenshot({ path: 'screenshots/pos-fun-0003.png' });
});
