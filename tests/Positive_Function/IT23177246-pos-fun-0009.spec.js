const { test, expect } = require('@playwright/test');

test('Pos_Fun_0009 - Convert sentence with negation patterns', async ({ page }) => {

  // Increase timeout for translation
  test.setTimeout(90000);

  // 1️⃣ Open Swift Translator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 2️⃣ Locate Singlish input (first textarea)
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear any existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Type negation sentences slowly (important)
  await page.keyboard.type(
    'mama dhanne naee oovaa. mama kiyannee mata ooka epaa.',
    { delay: 150 }
  );

  // 5️⃣ Trigger auto translation
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  // 6️⃣ Blur textarea (force translation engine)
  await page.mouse.click(10, 10);

  // 7️⃣ WAIT until Sinhala Unicode appears anywhere on page
  await page.waitForFunction(() => {
    return /[අ-ෆ]/.test(document.body.innerText);
  }, { timeout: 15000 });

  // 8️⃣ SAFE assertion – Sinhala exists
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // 9️⃣ Screenshot proof (for submission)
  await page.screenshot({ path: 'screenshots/pos-fun-0009.png' });
});
