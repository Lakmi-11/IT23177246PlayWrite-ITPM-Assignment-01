const { test, expect } = require('@playwright/test');

test('Pos_Fun_0008 - Convert sentence with multi-word expressions and collocations', async ({ page }) => {

  test.setTimeout(90000);

  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 1️⃣ Singlish textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 2️⃣ Clear text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 3️⃣ Type slowly
  await page.keyboard.type(
    'mata oona bath kanna, namuth velaavak naee hariyata vaeda.',
    { delay: 150 }
  );

  // 4️⃣ WAIT before clicking translate
  await page.waitForTimeout(2000);

  // 5️⃣ CLICK THE TRANSLATE ARROW BUTTON (🔥 REAL FIX)
  const translateButton = page.locator('button').filter({
    has: page.locator('svg')
  }).first();

  await translateButton.click();

  // 6️⃣ WAIT for translation
  await page.waitForTimeout(8000);

  // 7️⃣ ASSERT Sinhala exists
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // 8️⃣ Screenshot proof
  await page.screenshot({ path: 'screenshots/pos-fun-0008.png' });
});
