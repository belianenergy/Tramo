import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';
const PROJECT_ID = process.env.STITCH_PROJECT_ID || '12456492063083112200';

const prompt = `Create a polished DESKTOP landing page for EnergyOS, a hardware-first energy monitoring service for Airbnb / alquiler turístico owners in Spain/Galicia.

LANGUAGE: Galician/Spanish mix, mostly Galician.
STYLE: Light mode, premium B2B SaaS, clean like Stripe/Linear, not dark, not glassmorphism.
COLORS: background #FAFAFA, cards #FFFFFF, borders #E5E5E5, primary emerald #10B981, warning amber #F59E0B, error #EF4444, text #1A1A1A.
FONTS: Inter for text, JetBrains Mono for numbers.

PAGE STRUCTURE:
1) Top nav: ⚡ EnergyOS logo, links: Como funciona, Prezos, Demo, button "Solicitar demo".
2) Hero: big headline: "¿Sabes canto gastan os teus apartamentos cando non hai ninguén?" Subtitle: "Instálamos un Shelly EM que mide o consumo en tempo real. Se algo queda acendido, recíbes unha alerta no móbil." Primary CTA "Solicitar demo gratuíta" secondary "Ver dashboard". Right side: product mockup card showing 4 properties and one red anomaly.
3) Three benefit cards:
- 📱 Control desde calquera sitio — todos os apartamentos nunha pantalla.
- 🔔 Alertas de consumo anómalo — detecta aire acondicionado ou calefacción esquecida.
- ⚡ Instalación simple — 15 minutos, sen obras, pinzas amperimétricas.
4) How it works section with 3 steps: 1 Instalar dispositivo, 2 Ver datos en tempo real, 3 Recibir alertas Telegram.
5) Testimonial card: "Gardei 180€ no primeiro mes..." — María, propietaria de 4 apartamentos en Galicia, five stars.
6) Lead form card: fields Nome, Email, Nº propiedades dropdown, Localidade, button "Solicitar demo". Trust text: "Sen compromiso. Non instalamos nada sen autorización."
7) Footer simple.

Make it visually complete, responsive, realistic, with real cards, shadows, spacing, and no lorem ipsum.`;

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ jsonrpc:'2.0', id:1, method:'tools/call', params:{ name:toolName, arguments:args }});
    const req = https.request({ hostname:'stitch.googleapis.com', port:443, path:'/mcp', method:'POST', headers:{ 'Content-Type':'application/json', 'Content-Length':Buffer.byteLength(body), 'X-Goog-Api-Key':API_KEY }}, res => {
      let data=''; res.on('data', c => data+=c); res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e){ reject(new Error(data)); } });
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

async function main(){
  console.log('Generating landing in project', PROJECT_ID);
  const screen = await callStitch('generate_screen_from_text', { project_id: PROJECT_ID, prompt, device_type:'DESKTOP' });
  fs.writeFileSync('stitch-mvp-v4-landing-response.json', JSON.stringify(screen,null,2));
  console.log(JSON.stringify(screen,null,2).slice(0,1000));
  let screenId;
  const txt = screen.result?.content?.[0]?.text;
  if (txt) { try { const p=JSON.parse(txt); screenId=(p.name||p.id||'').split('/').pop(); } catch{} }
  screenId ||= screen.result?.screen?.id || screen.result?.screenId;
  if (!screenId) { console.error('No screen id'); process.exit(1); }
  console.log('Screen', screenId);
  const got = await callStitch('get_screen', { project_id: PROJECT_ID, screen_id: screenId });
  fs.writeFileSync('stitch-mvp-v4-landing-get.json', JSON.stringify(got,null,2));
  const html = got.result?.screen?.html || got.result?.content?.find?.(x=>x.type==='text')?.text;
  if (html && html.includes('<')) fs.writeFileSync('stitch-mvp-v4-landing.html', html);
  console.log('Done');
}
main().catch(e=>{ console.error(e); process.exit(1); });
