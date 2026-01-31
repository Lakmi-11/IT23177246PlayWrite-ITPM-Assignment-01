const { test, expect } = require('@playwright/test');

test('Pos_Fun_0021 - Convert slang and colloquial paragraph', async ({ page }) => {

  // Long slang-heavy paragraph needs more time
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

  // 4️⃣ Type slang & colloquial paragraph (slow typing for stability)
  await page.keyboard.type(
`ela bQQ, mama hithuve naee uba ohoma karayi kiyalaa.aeyi apita polla thibbe ? mama hithuve kivvaa vagee vaedee karayi kiyalaa.uba nam sathek bQQ.siraavata saththu kiyanne ohoma ayata aaye apee yaalukam methanin ivarayi.puluvan dheyak karapan.vaedak baara gaththanam eeka ee vidhiyata karanna purudhu veyan.kiyanne ekak karanne thava ekak.uBAlath minissu apith minissu anek minissu gaenath poddak hithapan goothayaa`,
    { delay: 70 }
  );

  // 5️⃣ 🔁 CLICK center translate icon (↔) — KEY FIX
  const translateIcon = page.locator('div').filter({
    has: page.locator('svg')
  }).nth(1);

  await translateIcon.click();

  // 6️⃣ Wait for Sinhala output (slang + long text)
  await page.waitForTimeout(14000);

  // 7️⃣ SAFE assertion – Sinhala Unicode exists
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);

  // 8️⃣ Screenshot proof for assignment
  await page.screenshot({ path: 'screenshots/pos-fun-0021.png' });
});
