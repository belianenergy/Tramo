import https from 'https';
import fs from 'fs';
const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';
const PROJECT_ID = process.env.STITCH_PROJECT_ID || '12456492063083112200';
const prompt = `Create a polished DESKTOP dashboard for EnergyOS, hardware-first energy monitoring for Airbnb property owners.

LANGUAGE: Galician. STYLE: Light mode premium B2B SaaS, Stripe/Linear style. COLORS: #FAFAFA background, #FFFFFF cards, #E5E5E5 borders, primary #10B981, warning #F59E0B, danger #EF4444. FONTS: Inter + JetBrains Mono for numbers.

LAYOUT:
Fixed left sidebar 240px with logo ⚡ EnergyOS and navigation: 📊 Panel active, 🏠 Propiedades, 🔔 Alertas, ⚡ Arbitraxe (soon badge), 🤖 Asesor IA, ⚙️ Configuración.
Top header: search "Buscar propiedades...", notification bell with red badge 2, user avatar Mauro.

MAIN DASHBOARD:
Greeting: "Bos días, Mauro 👋" and subtitle "4 propiedades activas · 2 alertas esta semana".
KPI row: Propiedades 4, Dispositivos conectados 3/4, Alertas activas 2, Aforro estimado 180€/mes.
Properties grid cards:
- Apartamento Centro — Airbnb — 🟢 Normal — 0.3 kWh/h
- Apartamento Praia — Airbnb — 🔴 ANÓMALO — 2.1 kWh/h — button "Ver alerta"
- Villa Montaña — Airbnb — 🟢 Normal — 0.1 kWh/h
- Casa Rural Río — Rural — 🟡 Sen sinal — -- kWh/h
Large chart card: "Consumo últimas 24h" with green area line and red spike for anomaly.
Right column: "Alerta crítica" card explaining "Apart. Praia leva 2h con consumo 7x superior" with actions "Enviar mensaxe" and "Marcar resolto".
Bottom: Devices table with Shelly_EM_01, Shelly_EM_02, Shelly_EM_03 and connection statuses.

Make it complete, crisp, responsive, realistic, no lorem ipsum.`;
function callStitch(name,args){return new Promise((resolve,reject)=>{const body=JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:args}});const req=https.request({hostname:'stitch.googleapis.com',port:443,path:'/mcp',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body),'X-Goog-Api-Key':API_KEY}},res=>{let data='';res.on('data',c=>data+=c);res.on('end',()=>{try{resolve(JSON.parse(data))}catch(e){reject(new Error(data))}})});req.on('error',reject);req.write(body);req.end()})}
async function main(){console.log('Generating dashboard in project',PROJECT_ID);const res=await callStitch('generate_screen_from_text',{project_id:PROJECT_ID,prompt,device_type:'DESKTOP'});fs.writeFileSync('stitch-mvp-v4-dashboard-response.json',JSON.stringify(res,null,2));console.log(JSON.stringify(res,null,2).slice(0,1000));}
main().catch(e=>{console.error(e);process.exit(1)});
