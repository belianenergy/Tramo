
      import { chromium } from 'playwright';
      import path from 'path';
      const htmlPath = path.resolve('stitch-dashboard-premium.html');
      (async () => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'stitch-dashboard-premium-preview.png', fullPage: true });
        console.log('Screenshot gardado');
        await browser.close();
      })();
    