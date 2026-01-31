const { test, expect } = require('@playwright/test');

test('Neg_Fun_0005 - Malformed Singlish without word boundaries', async ({ page }) => {

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
    'apasaipansalyann.gihinennenwadayanna',
    { delay: 80 }
  );

  // Trigger auto-translation (blur)
  await page.mouse.click(10, 10);
  await page.waitForTimeout(2000);

  // Wait for and read translator output
  await page.waitForFunction(() => {
    const textareas = document.querySelectorAll('textarea');
    const output = textareas.length > 1 ? textareas[1].value : (textareas.length === 1 ? textareas[0].value : '');
    return output && output.length > 0;
  }, { timeout: 30000 });

  const outputText = await page.evaluate(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 1) return textareas[1].value || '';
    if (textareas.length === 1) return textareas[0].value || '';
    return document.body.innerText || '';
  });

  // ❌ NEGATIVE ASSERTIONS
  // System should FAIL to correctly understand malformed input
  expect(outputText).not.toContain('අපි ආසයි පන්සල් යන්න.ගිහින් එන්න එනවද යන්න.');
  expect(outputText).toMatch(/[A-Za-z]/); // evidence of failed conversion

  // Screenshot proof
  await page.screenshot({
    path: 'screenshots/Negative_Function/neg-fun-0005.png',
    fullPage: true
  });
});
