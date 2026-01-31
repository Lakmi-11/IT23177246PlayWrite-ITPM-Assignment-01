const { test, expect } = require('@playwright/test');

test('Neg_Fun_0008 - Slang, numbers, and spelling error handling failure', async ({ page }) => {

  test.setTimeout(90000);

  // Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // Locate Singlish input textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();
  await singlishBox.fill('');

  // Type malformed Singlish input
  await singlishBox.type(
    'ballec penn vahaneekta.99nbeerunee.',
    { delay: 80 }
  );

  // Trigger auto-translation
  await page.mouse.click(10, 10);
  await page.waitForTimeout(3000);

  // Read translator output
  const outputText = await page.evaluate(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 1) return textareas[1].value || '';
    if (textareas.length === 1) return textareas[0].value || '';
    return document.body.innerText || '';
  });

  // ❌ NEGATIVE ASSERTIONS
  // System should FAIL to normalize slang + numbers
  expect(outputText).not.toContain('බල්ලෙක් පැන්නා වාහනේකට.99න් බේරුනේ.');
  expect(outputText).toMatch(/[A-Za-z0-9]/); // evidence of failed conversion

  // Screenshot proof
  await page.screenshot({
    path: 'screenshots/Negative_Function/neg-fun-0008.png',
    fullPage: true
  });
});
