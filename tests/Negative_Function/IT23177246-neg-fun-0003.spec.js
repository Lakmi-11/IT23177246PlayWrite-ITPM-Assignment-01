const { test, expect } = require('@playwright/test');

test('Neg_Fun_0003 - Informal negation and slang handling failure', async ({ page }) => {

  test.setTimeout(90000);

  // Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // Singlish input textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();
  await singlishBox.fill('');

  // Type Singlish input slowly
  await singlishBox.type(
    'mallit on bath kanna ,eth gedhara bath iwara wela. amma kiwwa kaden argen enn kiyla. et mlli ynne nh eyt kmmali kiyla. ane mnd,',
    { delay: 80 }
  );

  // Trigger auto-translation (blur)
  await page.mouse.click(10, 10);
  await page.waitForTimeout(1000);

  // Wait for translator output to appear (with extended timeout)
  await page.waitForFunction(() => {
    const textareas = document.querySelectorAll('textarea');
    const output = textareas.length > 1 ? textareas[1].value : (textareas.length === 1 ? textareas[0].value : '');
    return output && output.length > 5;
  }, { timeout: 40000 });

  // Read translator output textarea
  const outputText = await page.evaluate(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 1) return textareas[1].value || '';
    if (textareas.length === 1) return textareas[0].value || '';
    return document.body.innerText || '';
  });

  // ❌ NEGATIVE TEST - Correct Sinhala should NOT be present
  // System fails to properly handle informal negation and slang
  expect(outputText).not.toContain('මල්ලිට ඕනේ බත් කන්න ,එත් ගෙදර බත් ඉවර වෙලා. අම්මා කිව්වා කඩෙන් අරගෙන එන්න කියලා.ඒත් මල්ලි යන්නෙ නැහැ එයාට කම්මැලී කියලා.අනේ මන්දා,');
  // Verify some Latin text remains (evidence of failed conversion)
  expect(outputText).toMatch(/[A-Za-z]/);

  // Screenshot proof
  await page.screenshot({
    path: 'screenshots/Negative_Function/neg-fun-0003.png',
    fullPage: true
  });
});
