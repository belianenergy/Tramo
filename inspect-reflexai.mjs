import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('https://www.reflexai.com', { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: '/tmp/reflexai-screenshot.png', fullPage: false });
const fonts = await page.evaluate(() => {
  const hero = document.querySelector('h1');
  const h2 = document.querySelector('h2');
  const body = document.body;
  const p = document.querySelector('p');
  const nav = document.querySelector('nav a, header a');
  return {
    heroFont: hero ? getComputedStyle(hero).fontFamily : null,
    heroWeight: hero ? getComputedStyle(hero).fontWeight : null,
    heroSize: hero ? getComputedStyle(hero).fontSize : null,
    heroLetterSpacing: hero ? getComputedStyle(hero).letterSpacing : null,
    h2Font: h2 ? getComputedStyle(h2).fontFamily : null,
    h2Weight: h2 ? getComputedStyle(h2).fontWeight : null,
    bodyFont: body ? getComputedStyle(body).fontFamily : null,
    pFont: p ? getComputedStyle(p).fontFamily : null,
    navFont: nav ? getComputedStyle(nav).fontFamily : null,
    navWeight: nav ? getComputedStyle(nav).fontWeight : null,
    stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href),
    fontClasses: [...document.querySelectorAll('[class*="font"]')].map(el => el.className?.toString?.()).filter(Boolean).slice(0, 20),
    bodyHTML: (document.head.innerHTML.match(/font[^<]*?family[^"']+/gi) || []).slice(0, 10),
  };
});
console.log(JSON.stringify(fonts, null, 2));
await browser.close();
