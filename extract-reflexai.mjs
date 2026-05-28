import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 3000 } });
await page.goto('https://www.reflexai.com', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);

// Take a full-page screenshot for visual reference
await page.screenshot({ path: '/tmp/reflexai-full.png', fullPage: true });

// Extract design system
const design = await page.evaluate(() => {
  const styles = getComputedStyle(document.body);
  
  // Get all CSS custom properties from :root
  const rootStyles = getComputedStyle(document.documentElement);
  const customProps = {};
  for (let i = 0; i < rootStyles.length; i++) {
    const prop = rootStyles[i];
    if (prop.startsWith('--')) {
      customProps[prop] = rootStyles.getPropertyValue(prop).trim();
    }
  }
  
  // Section structure
  const sections = [...document.querySelectorAll('section, header, footer')].map(s => ({
    tag: s.tagName,
    bg: getComputedStyle(s).backgroundColor,
    padding: getComputedStyle(s).padding,
    maxWidth: getComputedStyle(s).maxWidth,
    childCount: s.children.length,
    firstChild: s.children[0]?.tagName,
    text: (s.textContent || '').trim().slice(0, 100),
  }));
  
  // Hero area
  const hero = document.querySelector('h1');
  const heroSection = hero?.closest('section') || hero?.closest('header');
  
  // Button styles
  const primaryBtn = document.querySelector('a[href*="demo"], a[href*="tour"], button');
  const btnStyle = primaryBtn ? {
    bg: getComputedStyle(primaryBtn).backgroundColor,
    color: getComputedStyle(primaryBtn).color,
    borderRadius: getComputedStyle(primaryBtn).borderRadius,
    padding: getComputedStyle(primaryBtn).padding,
    fontSize: getComputedStyle(primaryBtn).fontSize,
    fontWeight: getComputedStyle(primaryBtn).fontWeight,
  } : null;
  
  // Typography scale
  const typeScale = {};
  ['h1','h2','h3','p'].forEach(tag => {
    const el = document.querySelector(tag);
    if (el) {
      const cs = getComputedStyle(el);
      typeScale[tag] = {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
      };
    }
  });
  
  // Spacing - section gaps
  const sectionGaps = [];
  const allSections = [...document.querySelectorAll('section, header ~ *, main > *')];
  for (let i = 1; i < allSections.length; i++) {
    const prev = allSections[i-1].getBoundingClientRect();
    const curr = allSections[i].getBoundingClientRect();
    sectionGaps.push({
      from: (allSections[i-1].textContent || '').trim().slice(0, 40),
      to: (allSections[i].textContent || '').trim().slice(0, 40),
      gap: curr.top - prev.bottom,
    });
  }
  
  // Nav
  const nav = document.querySelector('nav, header nav');
  const navStyle = nav ? {
    bg: getComputedStyle(nav).backgroundColor,
    height: getComputedStyle(nav).height,
    position: getComputedStyle(nav).position,
  } : null;
  
  return {
    customProps,
    sections: sections.slice(0, 15),
    hero: hero ? { text: hero.textContent?.trim().slice(0, 100), fontSize: getComputedStyle(hero).fontSize, color: getComputedStyle(hero).color } : null,
    btnStyle,
    typeScale,
    sectionGaps: sectionGaps.slice(0, 10),
    navStyle,
  };
});

console.log(JSON.stringify(design, null, 2));
await browser.close();
