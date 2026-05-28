import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

const PROMPT = `Create a complete energy management MVP for Airbnb/property owners with hardware focus.

## CONTEXT
EnergyOS helps Airbnb owners know what happens in their properties. We install a Shelly EM device that measures consumption in real-time. If something is on when it shouldn't, they get a Telegram alert.

## VALUE PROPOSITION
"Sabe o que pasa nos teus apartamentos, sen ter que ir alí."

## DESIGN SYSTEM (Light Mode)
- Background: #FAFAFA (very light gray)
- Cards: #FFFFFF (white)
- Borders: #E5E5E5
- Primary: #10B981 (emerald green)
- Secondary: #6366F1 (indigo)
- Warning: #F59E0B (amber)
- Error: #EF4444 (red)
- Text primary: #1A1A1A
- Text secondary: #6B6660
- Font: Inter for text, JetBrains Mono for numbers
- Border-radius: 12px for cards, 8px for buttons

## PAGES TO CREATE

### 1. LANDING PAGE (/)
Hero Section:
- Title: "¿Sabes canto gastan os teus apartamentos cando non hai ninguén?"
- Subtitle: "Instálamos un dispositivo que mide o consumo en tempo real. Se algo está encendido sen que debería, recíbes unha alerta no teu móbil."
- CTA Button: "Solicitar demo gratuíta" (green, large)
- Background: light gradient with subtle green tint

3 Benefits (3 columns with cards):
1. 📱 Control desde calquera sitio - Ves todos os apartamentos nunha pantalla
2. 🔔 Alertas de consumo anómalo - Recíbes notificación se algo está gastando demais
3. ⚡ Sinxelo de instalar - 15 minutos, sen obras, só pinzas

Testimonial:
"María, propietario de 4 apartamentos en Galicia"
"⭐⭐⭐⭐⭐"
"Gardei 180€ no primeiro mes só cambiando os hábitos dos hóspedes"

How it works (3 steps):
1️⃣ Instalamos o dispositivo (15 min)
2️⃣ Ves os datos en tempo real
3️⃣ Recíbes alertas se algo está mal

Contact Form:
- Nome
- Email
- Nº propiedades (dropdown: 1-3, 4-10, 10+)
- Localidade
- [Solicitar demo] button

### 2. DASHBOARD (/dashboard)
Header:
- Logo: ⚡ EnergyOS
- Search: "Buscar propiedades..."
- Bell icon with notification badge
- User avatar with dropdown

Sidebar (left, 240px):
- ⚡ EnergyOS logo
- 📊 Panel (active, green highlight)
- 🏠 Propiedades
  - Todos
  - Airbnb
  - Villas
- 🔔 Alertas
- ⚡ Arbitraxe (disabled/coming soon)
- 🤖 Asesor IA
- ⚙️ Configuración

Main Content - Panel:
Greeting:
"Bos días, Mauro 👋"
"4 propiedades activas · 2 alertas esta semana"

Properties Grid (3 columns):
Card for each property:
- Name + type badge (Airbnb, Villa, etc)
- Status indicator: 🟢 Normal (green) / 🔴 Anómalo (red)
- Current consumption: "0.3 kWh" or "2.1 kWh"
- "Normal" or "ANÓMALO" label
- [Ver →] link

+ Engadir propiedade button

### 3. PROPERTY DETAIL (/properties/[id])
Back link: "← Volver a propiedades"

Property header:
- Name: "🏠 Apartamento Centro — Airbnb"
- Status badge

Current Consumption Card (large):
- "2.1 kWh/hora" (big number)
- ⚠️ ANÓMALO badge
- "(normal: 0.3 kWh)"
- "Consumo 7x superior"

Time selector: [HOXE] [7 DÍAS ●] [30 DÍAS] [ANO]

Chart (area chart showing 24h consumption):
- Green line/fill
- X-axis: 00, 04, 08, 12, 16, 20, 24
- Y-axis: kWh
- Shows anomaly clearly

Recent Alerts:
- 🔴 Hoxe 14:32 — Consumo anómalo detectado (2.1 kWh/hora)
- ⚠️ Onte 23:15 — Consumo elevado (1.8 kWh/hora)
- ✅ Onte 22:00 — Consumo normalizado

Configuration:
- "Alerta se consumo > [0.5] kWh/hora [Gardar]"
- "Notificar por: [Telegram ▾]"

### 4. ALERTS PAGE (/alerts)
Header: "🔔 Alertas"

Sections by date:
HOXE:
- 🔴 14:32 | Apart. Praia | Consumo 7x normal (2.1 kWh/h)
  - [Enviar mensaxe ao hóspede] [Marcar resolto]

ONTE:
- ⚠️ 23:15 | Apart. Centro | Consumo elevado (1.8 kWh/h)
- ✅ 22:00 | Apart. Praia | Resolto automaticamente

### 5. CONFIGURATION (/config)
Header: "⚙️ Configuración"

Sections:
CONTA:
- Nome: [Mauro________________________________]
- Email: [mauro@email.com_____________________]
- Google: [Connected ✓]

NOTIFICACIÓNS:
- Telegram: [@mauro___ ✓] [Cambiar]
- Alertas: [● Todos ○ Só anómalos ○ Desactivadas]

DISPOSITIVOS:
Table:
| Status | Device | Property | Connection |
| 🟢 | Shelly_EM_01 | Apart. Centro | Conectado | [Ver →] |
| 🟢 | Shelly_EM_02 | Apart. Praia | Conectado | [Ver →] |
| 🟡 | Shelly_EM_03 | Villa Montaña | Sen sinal | [Ver →] |

[+ Engadir novo dispositivo]

## TECHNICAL REQUIREMENTS
- React + Tailwind CSS (via CDN)
- Google Fonts: Inter + JetBrains Mono
- Lucide React or Phosphor icons
- Emojis for icons (not material symbols)
- All text in Galician/Spanish
- Responsive (desktop, tablet, mobile)
- Skeleton loading states
- Realistic data, no lorem ipsum

## DATA EXAMPLES
Properties:
- Apartamento Centro (Airbnb) - Santiago - 45m² - normal
- Apartamento Praia (Airbnb) - Ferrol - 38m² - anomaly detected
- Villa Montaña (Airbnb) - Ordes - 120m² - normal
- Casa Rural Río (Rural) - Betanzos - 85m² - normal

Normal consumption: 0.2-0.4 kWh/hora
Anomaly: 2.1 kWh/hora (air conditioning left on)

Alerts active: 2`;

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
  console.log('🚀 EnergyOS MVP v4 — Stitch HW Focus for Airbnb');
  console.log('================================================\n');
  
  console.log('1. Creating Stitch project...');
  const project = await callStitch('create_project', { title: 'EnergyOS MVP v4 - HW Airbnb' });
  console.log('Project response:', JSON.stringify(project, null, 2).substring(0, 500));
  
  let projectId = project.result?.project?.id || project.result?.projectId;
  
  if (!projectId && project.result?.content?.[0]?.text) {
    try {
      const parsed = JSON.parse(project.result.content[0].text);
      projectId = parsed.name;
    } catch (e) {}
  }
  
  if (projectId && projectId.includes('/')) {
    projectId = projectId.split('/')[1];
  }
  
  if (!projectId) {
    console.error('❌ Failed to create project. Full response:');
    console.log(JSON.stringify(project, null, 2));
    process.exit(1);
  }
  
  console.log(`\n✅ Project created: ${projectId}\n`);
  
  console.log('2. Generating landing page screen...');
  const landingScreen = await callStitch('generate_screen_from_text', {
    project_id: projectId,
    prompt: PROMPT,
    device_type: 'DESKTOP'
  });
  
  console.log('Landing screen response:', JSON.stringify(landingScreen, null, 2).substring(0, 1000));
  
  let screenId = landingScreen.result?.screen?.id || landingScreen.result?.screenId;
  
  if (!screenId && landingScreen.result?.content?.[0]?.text) {
    try {
      const parsed = JSON.parse(landingScreen.result.content[0].text);
      screenId = parsed.name || parsed.id;
    } catch (e) {}
  }
  
  if (!screenId) {
    console.error('❌ Failed to generate screen. Full response:');
    console.log(JSON.stringify(landingScreen, null, 2));
    process.exit(1);
  }
  
  console.log(`\n✅ Screen generated: ${screenId}\n`);
  
  console.log('3. Fetching screen HTML...');
  const html = await callStitch('get_screen', { 
    project_id: projectId,
    screen_id: screenId
  });
  
  // Save response
  const outputFile = `stitch-mvp-v4-response.json`;
  fs.writeFileSync(outputFile, JSON.stringify(html, null, 2));
  console.log(`\n💾 Response saved to: ${outputFile}`);
  
  // Extract and save HTML if present
  if (html.result?.screen?.html) {
    const htmlFile = `stitch-mvp-v4.html`;
    fs.writeFileSync(htmlFile, html.result.screen.html);
    console.log(`💾 HTML saved to: ${htmlFile}`);
  }
  
  // Extract screenshot if present
  if (html.result?.screen?.screenshot?.downloadUrl) {
    console.log(`\n📸 Screenshot URL: ${html.result.screen.screenshot.downloadUrl}`);
  }
  
  console.log('\n✅ Done!');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});