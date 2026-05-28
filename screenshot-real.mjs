import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:3010', { waitUntil: 'networkidle', timeout: 120000 });
await page.screenshot({ path: 'energyos-real-dashboard.png', fullPage: true });
await page.goto('http://127.0.0.1:3010/datadis', { waitUntil: 'networkidle', timeout: 120000 });
await page.screenshot({ path: 'energyos-real-datadis.png', fullPage: true });
await browser.close();
console.log('screenshots saved');
