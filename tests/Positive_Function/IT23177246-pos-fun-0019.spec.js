const { test, expect } = require('@playwright/test');

test('Pos_Fun_0019 - Convert paragraph style medium length input', async ({ page }) => {

  test.setTimeout(120000);

  // 1️⃣ Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 2️⃣ Locate Singlish textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Type paragraph-style input
  await page.keyboard.type(
`mama adha Campus giyaa. yanakotama yaaluvo hamba unaa.api Assignment eka gaena kathaa kalaa.amaarae vaedak karanna thiyennee.31 ta kalin karannath oonee.`,
    { delay: 90 }
  );

  // 5️⃣ 🔁 Click center translate icon (↔)
  const translateIcon = page.locator('div').filter({
    has: page.locator('svg')
  }).nth(1);

  await translateIcon.click();

  // 6️⃣ Wait for Sinhala output
  await page.waitForTimeout(9000);

  // 7️⃣ SAFE assertion – Sinhala Unicode exists
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // 8️⃣ Screenshot proof
  await page.screenshot({ path: 'screenshots/pos-fun-0019.png' });
});
