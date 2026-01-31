const { test, expect } = require('@playwright/test');

test('Neg_Fun_0002 - Incorrect past tense conversion', async ({ page }) => {

  test.setTimeout(60000);

  // Open Swift Translator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(5000);

  // Locate Singlish input box
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // Clear existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // Type Singlish sentence
  await page.keyboard.type('amm baththaa kewwa', { delay: 120 });

  // Blur to trigger translation
  await page.mouse.click(5, 5);
  await page.waitForTimeout(6000);

  // ❌ NEGATIVE ASSERTIONS
  // 1) The correct Sinhala SHOULD NOT be present
  // 2) The output should still contain the original Latin/garbled token (evidence of failed conversion)
  // Read the translator output from the output textarea if available
  const outputText = await page.evaluate(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 1) return textareas[1].value || '';
    if (textareas.length === 1) return textareas[0].value || '';
    return document.body.innerText || '';
  });

  // Ensure correct Sinhala conversion is absent
  expect(outputText).not.toContain('අම්මා බත් කැව්වා.');
  // Ensure some Latin characters remain (evidence of failed conversion)
  expect(outputText).toMatch(/[A-Za-z]/);

  // Screenshot proof
  await page.screenshot({ path: 'screenshots/Negative_Function/neg-fun-0002.png' });
});
