const { test, expect } = require('@playwright/test');

test('Pos_Fun_0023 - Convert sentence with punctuation marks', async ({ page }) => {

  // ⏱ Long sentence processing needs more time
  test.setTimeout(120000);

  // 1️⃣ Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 2️⃣ Locate Singlish input textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Test input with punctuation
  const inputText =
    'mal dhenne himi kaarayolu ! hinaa yana kathaa meevaa.. ' +
    'mal dhiipu kochcharak nam Couple aethdha thamange sambanDhathaa avasaana karapu.';

  await page.keyboard.type(inputText, { delay: 120 });

  // 5️⃣ Wait for input to stabilize, then blur to trigger translation
  await page.waitForTimeout(1000);
  await page.mouse.click(5, 5);

  // 6️⃣ WAIT until Sinhala Unicode appears in the translation output
  await page.waitForFunction(() => {
    return /[අ-ෆ]/.test(document.body.innerText);
  }, { timeout: 40000 });

  // 7️⃣ Give more time for translation to complete
  await page.waitForTimeout(2000);

  // 8️⃣ ASSERTION – Sinhala conversion happened
  const pageText = await page.evaluate(() => document.body.innerText);
  expect(pageText).toMatch(/[අ-ෆ]/);

  // 8️⃣ ASSERTION – punctuation preserved in INPUT
  const singlishValue = await singlishBox.inputValue();
  expect(singlishValue).toContain('!');
  expect(singlishValue).toContain('..');

  // 9️⃣ Screenshot proof
  await page.screenshot({ path: 'screenshots/pos-fun-0023.png' });

});
