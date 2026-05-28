import { chromium } from 'playwright';
import path from 'path';

const htmlPath = path.resolve('stitch-dashboard-v3.html');
const htmlUrl = 'file://' + htmlPath;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(htmlUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'stitch-dashboard-v3-preview.png', fullPage: true });
  console.log('Screenshot gardado');
  await browser.close();
})();
