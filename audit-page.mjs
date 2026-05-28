import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3015', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForSelector('h1', { timeout: 10000 });
await page.waitForTimeout(1000);

const audit = await page.evaluate(() => {
  const findings = [];
  const h1 = document.querySelector('h1');
  const h1Parent = h1 ? h1.parentElement : null;
  
  return {
    navLinks: [...(document.querySelector('header')?.querySelectorAll('a') || [])].map(a => a.textContent?.trim()).filter(Boolean),
    navBg: document.querySelector('header') ? getComputedStyle(document.querySelector('header')).backgroundColor : null,
    heroTextAlign: h1Parent ? getComputedStyle(h1Parent).textAlign : null,
    heroSectionBg: h1?.closest('section') ? getComputedStyle(h1.closest('section')).backgroundColor : null,
    sections: [...document.querySelectorAll('section')].slice(0,10).map((s,i) => ({
      id: s.id || 'no-id-'+i,
      bg: getComputedStyle(s).backgroundColor,
      hasEyebrow: !!s.querySelector('p.font-mono.text-xs.font-semibold.uppercase'),
    })),
    threeCol: [...document.querySelectorAll('[class*="grid-cols-3"]')].map(g => ({
      parent: g.closest('section')?.id || 'none',
      classes: g.className?.toString?.()?.slice(0, 120),
      cards: g.children.length,
    })),
    bodyFont: getComputedStyle(document.body).fontFamily,
    h1Font: h1 ? getComputedStyle(h1).fontFamily : null,
    h1LineHeight: h1 ? getComputedStyle(h1).lineHeight : null,
    footerCols: document.querySelector('footer') ? document.querySelector('footer').querySelectorAll(':scope > div > div').length : 0,
    tokens: {
      ink: getComputedStyle(document.documentElement).getPropertyValue('--color-ink').trim(),
      paper: getComputedStyle(document.documentElement).getPropertyValue('--color-paper').trim(),
      accent: getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim(),
    },
    eyebrowCount: [...document.querySelectorAll('p.font-mono.text-xs.font-semibold.uppercase')].length,
  };
});

console.log(JSON.stringify(audit, null, 2));
await page.screenshot({ path: 'validation-screenshots/tramo-audit.png', fullPage: true });
console.log('screenshot done');
await browser.close();
