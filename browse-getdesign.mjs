import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0] || await browser.newContext();
  const page = await context.newPage();
  
  // 1. Getdesign - Vercel
  console.log('1. Navegando a getdesign.md/vercel...');
  await page.goto('https://getdesign.md/vercel', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'getdesign-vercel.png', fullPage: false });
  
  // Coller o contido do DESIGN.md
  const vercelContent = await page.textContent('body');
  fs.writeFileSync('getdesign-vercel.txt', vercelContent || '');
  console.log('Vercel gardado en getdesign-vercel.txt');
  console.log('Contido (primeiros 500 chars):', vercelContent?.substring(0, 500));
  
  // 2. Getdesign - Stripe
  console.log('\n2. Navegando a getdesign.md/stripe...');
  await page.goto('https://getdesign.md/stripe', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'getdesign-stripe.png', fullPage: false });
  
  const stripeContent = await page.textContent('body');
  fs.writeFileSync('getdesign-stripe.txt', stripeContent || '');
  console.log('Stripe gardado en getdesign-stripe.txt');
  console.log('Contido (primeiros 500 chars):', stripeContent?.substring(0, 500));
  
  // 3. Superdesign - Buscar deseños de dashboard
  console.log('\n3. Explorando superdesign.dev library...');
  await page.goto('https://app.superdesign.dev', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Buscar botóns ou links de deseño
  const buttons = await page.$$eval('button, a', els => els.map(e => e.textContent?.trim()).filter(t => t && t.length > 1 && t.length < 50));
  console.log('Botóns/links:', buttons.slice(0, 30));
  
  await browser.close();
})();
