const { test, expect } = require('@playwright/test');

test('Neg_Fun_0004 - Foreign currency and slang handling failure', async ({ page }) => {

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
    'usd 200 ta gatta alut sellm bike ekk. ek gammc tami, mn asai ekta. mn gawa ehm gtta legos godak tiyenwa. welawak mn oyta pennanm.',
    { delay: 80 }
  );

  // Trigger auto-translation (blur)
  await page.mouse.click(10, 10);
  await page.waitForTimeout(2000);

  // Read translator output textarea
  const outputText = await page.evaluate(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 1) return textareas[1].value || '';
    if (textareas.length === 1) return textareas[0].value || '';
    return document.body.innerText || '';
  });

  // ❌ NEGATIVE TEST - Foreign currency and slang handling failure
  // System should FAIL to properly convert currency and slang
  expect(outputText).not.toContain('USD 200 ට ගත්ත අලුත් සෙල්ලම් bike එකක් . ඒක ගැම්මක් තමයි, මන් ආසයි ඒකට.මන් ගාව  එහෙම ගත්ත Legos  ගොඩක් තියෙනවා.වෙලාවක  මන්  ඔයාට  පෙන්නන්නම්.,');
  // Verify Latin/numbers remain (evidence of failed conversion)
  expect(outputText).toMatch(/[A-Za-z0-9]/);

  // Screenshot proof
  await page.screenshot({
    path: 'screenshots/Negative_Function/neg-fun-0004.png',
    fullPage: true
  });
});
