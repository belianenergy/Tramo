import { chromium } from 'playwright';
import path from 'path';

const htmlPath = path.resolve('stitch-dashboard-es.html');
const htmlUrl = 'file://' + htmlPath;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(htmlUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'stitch-dashboard-es-preview.png', fullPage: true });
  console.log('Screenshot gardado como stitch-dashboard-es-preview.png');
  await browser.close();
})();
