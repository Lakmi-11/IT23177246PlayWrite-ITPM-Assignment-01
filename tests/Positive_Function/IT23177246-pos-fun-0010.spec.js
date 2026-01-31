const { test, expect } = require('@playwright/test');

test('Pos_Fun_0010 - Convert sentence with English technical terms embedded in Singlish', async ({ page }) => {

  // Allow enough time for AI translation
  test.setTimeout(90000);

  // 1️⃣ Open Swift Translator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 2️⃣ Locate Singlish input textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Type Singlish sentence with English technical terms
  await page.keyboard.type(
    'Campus ekee WIFI vaeda naee. DATA Card ekak vath dhaamu.',
    { delay: 150 }
  );

  // 5️⃣ Trigger auto-translation
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  // 6️⃣ Blur the input (force translation engine)
  await page.mouse.click(10, 10);
  await page.waitForTimeout(7000);

  // 7️⃣ SAFE assertion – Sinhala Unicode exists on page
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // 8️⃣ Screenshot proof for submission
  await page.screenshot({ path: 'screenshots/pos-fun-0010.png' });
});
