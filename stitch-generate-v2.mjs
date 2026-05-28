import https from 'https';
import fs from 'fs';

const API_KEY = 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';
const PROJECT_ID = '9100679721232803019'; // Without "projects/" prefix

async function callStitch(method, params = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: method,
      params: params
    });

    const options = {
      hostname: 'stitch.googleapis.com',
      port: 443,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-Goog-Api-Key': API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Generating design with Stitch...');
  
  const prompt = `Create a premium energy management dashboard for "EnergyOS" - a B2B platform for property managers in Spain.

Requirements:
- LIGHT MODE with white backgrounds (#FFFFFF) and light gray borders (#E5E5E5)
- Emerald green primary color (#10B981) for energy/savings indicators
- Professional, clean design like Linear.app or Stripe
- All text in SPANISH
- Layout: Sidebar navigation (left), main content area (right)
- Include: KPI cards, data tables, charts placeholder, status badges
- Typography: Plus Jakarta Sans for headings, Inter for body text
- Device: Desktop`;

  const result = await callStitch('generate_design', {
    project_id: PROJECT_ID,
    prompt: prompt,
    design_system: {
      theme: {
        color_mode: 'LIGHT',
        custom_color: '#10B981',
        body_font: 'INTER',
        headline_font: 'PLUS_JAKARTA_SANS',
        roundness: 'ROUND_EIGHT'
      }
    }
  });
  
  console.log('Result:', JSON.stringify(result, null, 2).substring(0, 5000));
  
  fs.writeFileSync('stitch-design-response.json', JSON.stringify(result, null, 2));
}

main().catch(console.error);
