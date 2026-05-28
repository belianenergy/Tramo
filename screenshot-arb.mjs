
      import { chromium } from 'playwright';
      import path from 'path';
      (async () => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto('file://' + path.resolve('stitch-arbitrage.html'), { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'stitch-arbitrage-preview.png', fullPage: true });
        console.log('Screenshot gardado');
        await browser.close();
      })();
    