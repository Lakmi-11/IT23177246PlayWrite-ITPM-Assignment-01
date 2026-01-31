const { test, expect } = require('@playwright/test');

test('Pos_Fun_0006 - Convert short sentence with date', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(5000);

  await page.getByText('Singlish').click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(1000);

  await page.mouse.click(400, 450);
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  await page.keyboard.type('2026/02/06 venidhaa exam patan gannavaa.', { delay: 120 });
  await page.waitForTimeout(5000);

  await expect(page.locator('body')).toContainText('2026/02/06');
  await expect(page.locator('body')).toContainText('exam');

  await page.screenshot({ path: 'screenshots/pos-fun-0006.png' });
});
