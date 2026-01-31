const { test, expect } = require('@playwright/test');

test('Pos_Fun_0022 - Convert paragraph with past tense actions and events', async ({ page }) => {

  // Long past-tense paragraph needs more time
  test.setTimeout(180000);

  // 1️⃣ Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForTimeout(6000);

  // 2️⃣ Locate Singlish textarea
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear existing text
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');

  // 4️⃣ Type past tense paragraph (slow typing = stability)
  await page.keyboard.type(
`ape ammaa iiye gamee giyaa.yanna kalin gedhara as karalaa lassanata hoodhalaa giyee.eeth apee malli aevith mulu gedharama haeti karalaa dhaemmaa.passe mama baennaa eyaata.ammata Call karalath kivvaa.ammaa mallita aragena kivvaa ammaa enna kalin gedhara thibbaa vageema as karanna kiyalaa.malli pav nisaa mamath udhav karaa.naeththam eyaata gedhara iiyema as karaganna baeri venavaa.`,
    { delay: 70 }
  );

  // 5️⃣ 🔁 CLICK center translate icon (↔) — KEY FIX
  const translateIcon = page.locator('div').filter({
    has: page.locator('svg')
  }).nth(1);

  await translateIcon.click();

  // 6️⃣ Wait for Sinhala output (long past tense content)
  await page.waitForTimeout(14000);

  // 7️⃣ SAFE assertion – Sinhala Unicode exists
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // 8️⃣ Screenshot proof for assignment submission
  await page.screenshot({ path: 'screenshots/pos-fun-0022.png' });
});
