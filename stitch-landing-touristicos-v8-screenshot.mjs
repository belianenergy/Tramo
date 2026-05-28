
import { chromium } from 'playwright';
import path from 'path';
const viewports = [
  { name: 'mobile-375', width: 375, height: 1200 },
  { name: 'tablet-768', width: 768, height: 1200 },
  { name: 'desktop-1440', width: 1440, height: 1400 }
];
const browser = await chromium.launch({ headless: true });
for (const viewport of viewports) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve('stitch-landing-touristicos-v8.html'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const out = 'stitch-landing-touristicos-v8-preview-' + viewport.name + '.png';
  await page.screenshot({ path: out, fullPage: true });
  await page.close();
  console.log('Screenshot saved: ' + out);
}
await browser.close();
