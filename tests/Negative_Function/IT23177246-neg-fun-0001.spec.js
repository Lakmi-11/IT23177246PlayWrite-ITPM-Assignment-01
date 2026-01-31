const { test, expect } = require('@playwright/test');

test('Neg_Fun_0001 - Convert present tense function (interrogative failure)', async ({ page }) => {

  // Increase timeout
  test.setTimeout(60000);

  // 1️⃣ Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(5000);

  // 2️⃣ Locate Singlish input
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Type interrogative sentence with present tense
  // Input: sindhuvakahannaaoneda? (< 30 characters)
  await page.keyboard.type(
    'sindhuvakahannaaoneda?',
    { delay: 100 }
  );

  // 5️⃣ Wait for input to stabilize, then blur to trigger auto-translate
  await page.waitForTimeout(1000);
  await page.mouse.click(10, 10);

  // 6️⃣ Wait for translation to process and capture the translator output
  await page.waitForTimeout(2000);
  const outputText = await page.evaluate(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 1) return textareas[1].value || '';
    if (textareas.length === 1) return textareas[0].value || '';
    // fallback: try common result containers
    const selectors = ['.output', '#result', '.translated-text', '.translation'];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el.innerText || el.textContent || '';
    }
    return document.body.innerText || '';
  });

  // 7️⃣ ❌ NEGATIVE TEST - Question tone not detected to Sinhala output
  // Expected: System FAILS to properly convert interrogative function
  // Validate that the correct Sinhala question is NOT present in the translator output
  expect(outputText).not.toContain('සින්දුවක් අහන්න ඕනෙද?');
  expect(outputText).not.toContain('සින්දුවක් අහන්න ඕනෙද?');

  // 8️⃣ Screenshot for evidence of failure
  await page.screenshot({ path: 'screenshots/Negative_Function/neg-fun-0001.png' });

});
