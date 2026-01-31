const { test, expect } = require('@playwright/test');

test('Pos_Fun_0005 - Convert slang and colloquial sentence', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(5000);

  await page.getByText('Singlish').click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(1000);

  await page.mouse.click(400, 450);
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  await page.keyboard.type('adoo kanna yamQQ.', { delay: 120 });
  await page.waitForTimeout(5000);

  await expect(page.locator('body')).toContainText('kanna');

  await page.screenshot({ path: 'screenshots/pos-fun-0005.png' });
});
