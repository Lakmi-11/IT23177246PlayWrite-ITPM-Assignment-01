const { test, expect } = require('@playwright/test');

test('Neg_Fun_0009 - Emotional paragraph with spelling and grammar errors', async ({ page }) => {

  test.setTimeout(90000);

  // Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // Locate Singlish input textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();
  await singlishBox.fill('');

  // Type Singlish input slowly
  await singlishBox.type(
    'Cuple ekk unhamaaa smgiiyen smen sathutn innone. randu nkra tharah nov adharyen inn nm dennma avnka vennne. sathuta thami vadagath',
    { delay: 80 }
  );

  // Trigger auto-translation
  await page.mouse.click(10, 10);
  await page.waitForTimeout(5000);

  // Read translator output
  const outputText = await page.evaluate(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 1) return textareas[1].value || '';
    if (textareas.length === 1) return textareas[0].value || '';
    return document.body.innerText || '';
  });

  // ❌ NEGATIVE ASSERTIONS
  // System should FAIL to fully normalize emotional + slang content
  expect(outputText).not.toContain('Couple එකක් උනහම සමඟියෙන් සාමෙන් සතුටෙන් ඉන්නෝනෙ.රණ්ඩු නොකර තරහා නොවී ආදරයෙන් ඉන්න නම් දෙන්නම අවංක වෙන්නෝනෙ.සතුට තමයි වැදගත්');
  expect(outputText).toMatch(/[A-Za-z]/); // evidence of failed conversion

  // Screenshot proof
  await page.screenshot({
    path: 'screenshots/Negative_Function/neg-fun-0009.png',
    fullPage: true
  });
});
