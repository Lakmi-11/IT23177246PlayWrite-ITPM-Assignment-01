const { test, expect } = require('@playwright/test');

test('Pos_Fun_0025 - Convert future consequence environmental sentence', async ({ page }) => {

  // ⏱️ Moderate timeout for AI translation
  test.setTimeout(90000);

  // 1️⃣ Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 2️⃣ Locate Singlish input textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear existing content
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Type Singlish sentence (slow typing is important)
  const inputText =
    'gas kapana minissu anaagathee gaena hithanne naee.apita issarahata thavath gooliiya haani vaedi veevi, aahaara hiGA veevi.';

  await page.keyboard.type(inputText, { delay: 120 });

  // 5️⃣ Wait for input to stabilize, then blur to trigger translation
  await page.waitForTimeout(1000);
  await page.mouse.click(5, 5);

  // 6️⃣ WAIT until Sinhala Unicode appears in the output area
  await page.waitForFunction(() => {
    return document.body.innerText.match(/වීවි|වෙනවා|උෂ්ණ|ආහාර|හිඟ/) !== null;
  }, { timeout: 45000 });

  // 7️⃣ Get the page text containing the translation
  const pageText = await page.evaluate(() => document.body.innerText);

  // 8️⃣ Verify Sinhala Unicode output exists
  expect(pageText).toMatch(/[අ-ෆ]/);

  // 9️⃣ Verify the semantic meaning (future consequence wording)
  expect(pageText).toMatch(/වීවි|වෙනවා|උෂ්ණ|ආහාර|හිඟ/);

  // 1️⃣2️⃣ Screenshot proof
  await page.screenshot({ path: 'screenshots/pos-fun-0024.png' });

});
