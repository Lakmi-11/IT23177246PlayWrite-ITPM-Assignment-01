const { test, expect } = require('@playwright/test');

test('Pos_Fun_0020 - Convert long paragraph style Singlish input', async ({ page }) => {

  // ⏱️ Long paragraph needs more time
  test.setTimeout(180000);

  // 1️⃣ Open SwiftTranslator
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // 2️⃣ Locate Singlish textarea (LEFT box)
  const singlishBox = page.locator('textarea').first();
  await singlishBox.click();

  // 3️⃣ Clear existing text
  await singlishBox.fill('');

  // 4️⃣ Type LONG paragraph slowly (important)
  await singlishBox.type(
`liisaa kiyanne igenaganna dhakSha lamayek. eyaa haema vishayakatama vagee dhakShayi.
godakma Science, English valata vageema Sinhala, History valata eyaa echchara dhakSha naee.
mee Semester ekee vaara viBhaage thibunaa.
kohoma hari eyaa panthiye paLaveniyaa velaa thibunaa.
lakuNuth haema vishayakatama 90kata vadaa aran thibunaa.
eyaa hoDHAta vaeda karalaa godak mahansi velaa.
liisaa kiyanne anik ayatath aadharshayata ganna puluvan kenek.`,
    { delay: 60 }
  );

  // 5️⃣ Click outside to trigger auto-translation
  await page.mouse.click(10, 10);

  // 6️⃣ ✅ SAFE WAIT (NO page.waitForFunction)
  await expect(async () => {
    const pageText = await page.textContent('body');
    expect(pageText).toMatch(/[අ-ෆ]/);
  }).toPass({ timeout: 90000 });

  // 7️⃣ Screenshot proof
  await page.screenshot({
    path: 'screenshots/Positive_Function/pos-fun-0020.png',
    fullPage: true
  });

});
