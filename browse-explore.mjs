import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0] || await browser.newContext();
  const page = await context.newPage();
  
  // 1. Superdesign - Explore
  console.log('1. Explorando superdesign.dev...');
  await page.goto('https://app.superdesign.dev', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'superdesign-explore.png', fullPage: false });
  
  // Buscar deseños de dashboard
  const links = await page.$$eval('a', els => els.map(e => ({ text: e.textContent?.trim(), href: e.href })).filter(l => l.text && l.text.length > 2));
  console.log('Links atopados:', links.slice(0, 20).map(l => `${l.text} -> ${l.href}`));
  
  // 2. Getdesign.md
  console.log('\n2. Navegando a getdesign.md...');
  await page.goto('https://getdesign.md', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'getdesign-homepage.png', fullPage: false });
  console.log('Título:', await page.title());
  
  // Buscar deseños dispoñibles
  const designs = await page.$$eval('a[href*="/design-md"]', els => els.map(e => ({ text: e.textContent?.trim(), href: e.href })).filter(l => l.text));
  console.log('Deseños:', designs.slice(0, 15).map(l => `${l.text}`));
  
  // 3. Getdesign - Linear
  console.log('\n3. Navegando a getdesign.md/linear...');
  await page.goto('https://getdesign.md/linear', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'getdesign-linear.png', fullPage: false });
  console.log('Título:', await page.title());
  
  // Coller o contido do DESIGN.md
  const mdContent = await page.textContent('body');
  console.log('Contido Linear (primeiros 800 chars):', mdContent?.substring(0, 800));
  
  await browser.close();
})();
