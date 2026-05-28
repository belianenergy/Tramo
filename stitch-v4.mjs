import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

const prompt = `Create a premium energy management dashboard called "EnergyOS Pro" with an "Aurora Glass" design style inspired by MSN Weather / Windows 11 Fluent Design.

## Design System
- Background: Dark aurora gradient (purple #1a1a2e → blue #0f3460 → purple #2d1b4e)
- Cards: Glassmorphism effect (rgba(255,255,255,0.08) background, backdrop-filter: blur(20px), 1px rgba(255,255,255,0.1) border, 24px border-radius)
- Primary color: Warm amber #e8913a
- Secondary: Violet #8b5cf6
- Success: Emerald #10b981
- Warning: Amber #f59e0b
- Danger: Red #ef4444
- Text primary: Warm white #f0e6d3
- Text secondary: Warm gray #b8b0a4
- Font: Inter for text, JetBrains Mono for numbers

## Layout Structure

**Header (64px):**
- Left: EnergyOS logo + wordmark
- Center: Search bar with glass effect
- Right: Notification bell, user avatar, "+ New Property" button

**Sidebar (80px collapsed, 280px expanded on hover):**
- Navigation icons with module colors:
  - Dashboard (amber)
  - Fincas/Communities (blue)
  - Apartments (amber)
  - Arbitrage (violet)
  - AI Advisor (emerald)
  - Datadis (gray)
  - Alerts (red when active)
- Active item: gradient background + colored border + glow

**Main Content — Bento Grid:**

**Row 1 — Hero Metric (full width, 160px height):**
- Large card with amber gradient glow
- "Total Consumption This Month"
- Big number: "2,450 kWh" in JetBrains Mono 48px
- Trend: "↑ 12% vs last month" in green
- Large energy icon (⚡)

**Row 2 — KPI Cards (2 columns, 120px height each):**
- Card 1: "Monthly Savings" — "€340" — trend ↓ (green)
- Card 2: "Active Properties" — "12" — "+2 this month"

**Row 3 — Chart (full width, 320px height):**
- Area chart with amber gradient fill
- Title: "Hourly Consumption"
- Time selectors: [24H] [7D] [30D] [90D]
- Smooth line, gradient from amber to transparent

**Row 4 — Action Cards (2 columns, 140px height):**
- Card 1 — AI Advisor:
  - Robot icon (🤖)
  - "Save up to €500/year"
  - "AI-powered tariff analysis"
  - Button: "View Strategy" (green glow)
  
- Card 2 — Arbitrage:
  - Battery icon (🔋)
  - "Simulate your battery ROI"
  - "Real-time OMIE data"
  - Button: "Calculate ROI" (violet glow)

**Row 5 — Alerts (full width, auto height):**
- List of recent alerts with severity colors:
  - Warning: "High consumption detected in Vigo Centro — 45% above average"
  - Info: "Savings opportunity: switch to indexed tariff recommended"
  - Success: "Datadis: New data available for 3 properties"

## Visual Details
1. All cards have glassmorphism with subtle inner glow (inset box-shadow)
2. Cards lift on hover (translateY -2px) with increased border brightness
3. Staggered entrance animation (cards fade in one by one)
4. Action cards have colored glow shadows
5. Numbers use tabular figures for alignment
6. Icons from Phosphor Icons (outlined, 1.5px stroke)
7. Responsive: Desktop sidebar expanded, Tablet collapsed, Mobile bottom nav

## Technical Requirements
- React + Tailwind CSS
- Recharts for charts
- Framer Motion for animations
- Phosphor Icons (react-icons/ph)
- Inter font from Google Fonts
- JetBrains Mono for numbers`;

async function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
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
  console.log('🚀 EnergyOS v4 — Stitch Aurora Glass Dashboard');
  console.log('================================================\n');
  
  console.log('1. Creating Stitch project...');
  const project = await callStitch('create_project', { title: 'EnergyOS Aurora Glass v4' });
  console.log('Project response:', JSON.stringify(project, null, 2).substring(0, 500));
  
  // Parse project ID from text content
  let projectId = project.result?.project?.id || project.result?.projectId;
  
  if (!projectId && project.result?.content?.[0]?.text) {
    try {
      const parsed = JSON.parse(project.result.content[0].text);
      projectId = parsed.name;
    } catch (e) {
      // ignore
    }
  }
  
  // Extract numeric ID if format is "projects/12345"
  if (projectId && projectId.includes('/')) {
    projectId = projectId.split('/')[1];
  }
  
  if (!projectId) {
    console.error('❌ Failed to create project. Full response:');
    console.log(JSON.stringify(project, null, 2));
    process.exit(1);
  }
  
  console.log(`\n✅ Project created: ${projectId}\n`);
  
  console.log('2. Generating dashboard screen...');
  const screen = await callStitch('generate_screen_from_text', {
    project_id: projectId,
    prompt: prompt,
    device_type: 'DESKTOP'
  });
  
  console.log('Screen response:', JSON.stringify(screen, null, 2).substring(0, 1000));
  
  let screenId = screen.result?.screen?.id || screen.result?.screenId;
  
  if (!screenId && screen.result?.content?.[0]?.text) {
    try {
      const parsed = JSON.parse(screen.result.content[0].text);
      screenId = parsed.name || parsed.id;
    } catch (e) {
      // ignore
    }
  }
  
  if (!screenId) {
    console.error('❌ Failed to generate screen. Full response:');
    console.log(JSON.stringify(screen, null, 2));
    process.exit(1);
  }
  
  console.log(`\n✅ Screen generated: ${screenId}\n`);
  
  console.log('3. Fetching screen HTML...');
  const html = await callStitch('get_screen', { 
    project_id: projectId,
    screen_id: screenId
  });
  
  // Save response
  const outputFile = `stitch-v4-response.json`;
  fs.writeFileSync(outputFile, JSON.stringify(html, null, 2));
  console.log(`\n💾 Response saved to: ${outputFile}`);
  
  // Extract and save HTML if present
  if (html.result?.screen?.html) {
    const htmlFile = `stitch-dashboard-v4.html`;
    fs.writeFileSync(htmlFile, html.result.screen.html);
    console.log(`💾 HTML saved to: ${htmlFile}`);
  }
  
  console.log('\n✅ Done! Check the generated files.');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
