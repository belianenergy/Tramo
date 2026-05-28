import https from 'https';
import fs from 'fs';

const API_KEY = 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';
const PROJECT_ID = '9100679721232803019';

function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params });
    const req = https.request({
      hostname: 'stitch.googleapis.com', port: 443, path: '/mcp', method: 'POST', timeout: 180000,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'X-Goog-Api-Key': API_KEY }
    }, res => { let data=''; res.on('data', c => data += c); res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error('Bad JSON '+data.slice(0,500))); } }); });
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.on('error', reject); req.write(body); req.end();
  });
}
async function tool(name,args){
  for(let i=0;i<3;i++){
    try{
      const r=await call('tools/call',{name,arguments:args});
      if(r.result?.isError||r.error) throw new Error(r.result?.content?.map(c=>c.text).join('\n')||r.error?.message||'unknown');
      return r;
    }catch(e){ if(i===2) throw e; console.log(`Retry ${i+1}: ${e.message}`); await new Promise(r=>setTimeout(r,8000)); }
  }
}
const base = `EnergyOS brand. Spanish text. Light mode only (#FAFAFA background, white cards, #E5E5E5 borders). Primary emerald #10B981. Premium B2B SaaS like Stripe/Linear, not generic startup. Fixed left sidebar: EnergyOS logo, Panel, Fincas, Apartamentos, CUPS/Datadis, Tarifas/Asesor IA, OMIE/Arbitraje, Hardware Pilot, Configuración. Use Inter/Plus Jakarta Sans feel and monospace-looking numbers.`;
const pages=[
{key:'tarifas-advisor', prompt:`${base}\nCreate page "Tarifas y Asesor IA" active nav. Include current tariff vs recommended tariff cards, savings highlighted, full tariff breakdown with taxes/regulatory costs: potencia, energía, costes fijos, impuesto eléctrico, IVA, alquiler contador, total. Include AI explanation card, confidence score, CTA "Generar recomendación", and comparison table with 4 tariffs.`},
{key:'omie-arbitraje', prompt:`${base}\nCreate page "OMIE y Arbitraje de Baterías" active nav. Include hourly OMIE price chart in €/MWh, battery capacity selector 2.4/5/10/20 kWh, charge/discharge window cards, simulated daily/monthly/yearly savings, payback years, brands Pylontech/BYD/Huawei/Victron, and note "Simulador en MVP. Piloto de hardware como Fase 2." Use subtle violet accent #7B1FA2.`},
{key:'hardware-shelly', prompt:`${base}\nCreate page "Piloto de Hardware / Shelly" active nav. Include Shelly EM and Shelly Pro EM cards, non-intrusive clamp measurement explanation, installation steps Auditar → Instalar → Conectar → Optimizar, pilot package cards Starter/Professional/Enterprise, lead form with name/company/properties/email/message, and roadmap note "Fase 2 del roadmap EnergyOS".`},
{key:'configuracion', prompt:`${base}\nCreate page "Configuración de Organización" active nav. Include vertical tabs Perfil, Usuarios, Conexiones, Plan de facturación, Reglas de alertas. Show organization profile form, users table, connection cards Datadis/OMIE/Shelly, billing usage metrics, and alert rules with thresholds and toggles.`}
];
async function main(){
 const outputs=[];
 for(const p of pages){
   if(fs.existsSync(`stitch-${p.key}.json`)){ console.log(`Skip existing ${p.key}`); continue; }
   console.log(`Generating ${p.key}...`);
   const r=await tool('generate_screen_from_text',{projectId:PROJECT_ID,prompt:p.prompt,deviceType:'DESKTOP'});
   fs.writeFileSync(`stitch-${p.key}.json`, JSON.stringify(r,null,2));
   outputs.push(p.key);
   console.log(`Saved stitch-${p.key}.json`);
   await new Promise(r=>setTimeout(r,3000));
 }
 fs.writeFileSync('stitch-remaining-summary.json',JSON.stringify({projectId:PROJECT_ID,generated:outputs,completedAt:new Date().toISOString()},null,2));
 console.log('Done remaining pages');
}
main().catch(e=>{console.error(e.stack||e.message);process.exit(1);});
