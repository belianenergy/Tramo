import https from 'https';

const API_KEY = process.env.OPENROUTER_API_KEY;

const prompt = `You are a world-class product designer specializing in modern SaaS dashboards. Your work is inspired by Linear, Raycast, Arc Browser, and Vercel's design language.

Design a REVOLUTIONARY dashboard layout for "EnergyOS Pro" — a B2B energy management platform for property managers in Spain.

Requirements:
- Light mode with warm, sophisticated colors
- All text in SPANISH (Castellano)
- Must look like a 2026 premium product, NOT a generic Bootstrap dashboard

Think about:
1. What makes Linear's UI feel fast and premium?
2. What makes Notion feel warm and friendly?
3. What makes Stripe feel trustworthy and data-rich?
4. What makes Raycast feel modern and innovative?

Design a layout that combines the best of these. Be specific about:
- Exact pixel dimensions, spacing, border-radius
- Color values (hex codes)
- Font sizes and weights
- Component arrangements
- Micro-interactions
- Information hierarchy
- How data flows visually

Output a detailed HTML+CSS specification that could be directly implemented. Include:
- Sidebar design (collapsible, with sections)
- KPI cards design (with trend indicators)
- Chart area design (with context)
- Table design (with hover states)
- Alert/notification design
- Lead capture form design (for hardware sales)

Make it INNOVATIVE — not a standard grid layout. Think about:
- Bento grid layouts
- Asymmetric compositions
- Floating panels
- Layered depth (not flat)
- Animated transitions
- Contextual sidebars

Output ONLY the design specification, no code. Be extremely detailed.`;

async function callGemini() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'google/gemini-2.5-pro-preview-05-06',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 8000
    });

    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse: ' + data.substring(0, 500)));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Consultando Gemini Pro para deseño innovador...');
  const response = await callGemini();
  
  if (response.choices && response.choices[0]) {
    const content = response.choices[0].message.content;
    require('fs').writeFileSync('GEMINI_DESIGN_SPEC.md', content);
    console.log('Especificación gardada en GEMINI_DESIGN_SPEC.md');
    console.log('Lonxitude:', content.length, 'caracteres');
    console.log('\n--- PREVIEW (primeiras 500 chars) ---');
    console.log(content.substring(0, 500));
  } else {
    console.error('Resposta inesperada:', JSON.stringify(response).substring(0, 500));
  }
}

main().catch(console.error);
