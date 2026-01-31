const { test, expect } = require('@playwright/test');

test('IT23177246-Neg_UI_0001 - Sinhala output not generated for invalid Singlish input', async ({ page }) => {

  // UI negative tests still need stable timeout
  test.setTimeout(60000);

  // 1️⃣ Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/', {
    waitUntil: 'domcontentloaded'
  });

  await page.waitForTimeout(4000);

  // 2️⃣ Locate Singlish input textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();
  await singlishBox.fill('');

  // 3️⃣ Type INVALID Singlish input (nonsense words)
  await singlishBox.type(
    'hava tanakla knw',
    { delay: 120 }
  );

  // 4️⃣ Wait some time to allow real-time conversion attempt
  await page.waitForTimeout(6000);

  // 5️⃣ Read Sinhala output textarea (if exists)
  const outputText = await page.evaluate(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 1) return textareas[1].value || '';
    return '';
  });

  // ❌ NEGATIVE ASSERTIONS
  // Sinhala Unicode should NOT appear
  expect(outputText).not.toMatch(/[අ-ෆ]/);

  // Output should be empty or unchanged
  expect(outputText.trim().length).toBe(0);

  // 6️⃣ Screenshot proof
  await page.screenshot({
    path: 'screenshots/UI/IT23177246-Neg-UI-0001.png',
    fullPage: true
  });
});
