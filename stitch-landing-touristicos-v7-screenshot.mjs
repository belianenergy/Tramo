
import { chromium } from 'playwright';
import path from 'path';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.resolve('stitch-landing-touristicos-v7.html'), { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'stitch-landing-touristicos-v7-preview.png', fullPage: true });
await browser.close();
console.log('Screenshot saved: stitch-landing-touristicos-v7-preview.png');
