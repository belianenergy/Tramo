import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0] || await browser.newContext();
  const page = await context.newPage();
  
  console.log('1. Navegando a superdesign.dev...');
  await page.goto('https://app.superdesign.dev', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('Título:', await page.title());
  
  // Tomar screenshot
  await page.screenshot({ path: 'superdesign-homepage.png', fullPage: false });
  console.log('Screenshot gardado: superdesign-homepage.png');
  
  // Buscar seccións de deseño
  const content = await page.textContent('body');
  console.log('Contido (primeiros 500 chars):', content?.substring(0, 500));
  
  await browser.close();
})();
