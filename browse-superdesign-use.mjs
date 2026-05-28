import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0] || await browser.newContext();
  const page = await context.newPage();
  
  // 1. Superdesign - Use Design System
  console.log('1. Navegando a superdesign.dev - Use Design System...');
  await page.goto('https://app.superdesign.dev', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'superdesign-home.png', fullPage: false });
  
  // Buscar o texto "Import from Site"
  const importLink = await page.$('text=Import from Site');
  if (importLink) {
    console.log('Atopou "Import from Site", facendo click...');
    await importLink.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'superdesign-import.png', fullPage: false });
    console.log('Título:', await page.title());
    console.log('URL:', page.url());
    
    // Buscar input para URL
    const input = await page.$('input[type="text"], input[type="url"], input[placeholder*="url"], input[placeholder*="site"]');
    if (input) {
      console.log('Atopou input de URL, escribindo linear.app...');
      await input.fill('https://linear.app');
      await page.waitForTimeout(1000);
      
      // Buscar botón de submit
      const submitBtn = await page.$('button[type="submit"], button:has-text("Import"), button:has-text("Generate")');
      if (submitBtn) {
        console.log('Facendo click en submit...');
        await submitBtn.click();
        await page.waitForTimeout(5000);
        await page.screenshot({ path: 'superdesign-linear-result.png', fullPage: false });
        console.log('Resultado gardado');
      }
    }
  }
  
  // 2. Superdesign - Use prompt (Landing Page)
  console.log('\n2. Navegando a superdesign.dev - Prompt Library...');
  await page.goto('https://app.superdesign.dev', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Buscar "Use prompt" buttons
  const usePromptBtns = await page.$$('button:has-text("Use prompt")');
  console.log('Botóns "Use prompt" atopados:', usePromptBtns.length);
  
  if (usePromptBtns.length > 0) {
    console.log('Facendo click no primeiro "Use prompt"...');
    await usePromptBtns[0].click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'superdesign-prompt-result.png', fullPage: false });
    console.log('Título:', await page.title());
    console.log('URL:', page.url());
  }
  
  await browser.close();
})();
