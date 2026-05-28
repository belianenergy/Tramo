import https from "https";

const AK = process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";

const PROMPT = `Desktop landing page (1440px) in Spanish. Brand: Tramo - energy operations for Spanish tourist property managers.

VISUAL REFERENCE: Premium editorial energy-infrastructure aesthetic like Sourceful Energy. Cream/paper background (#fcf9f8), ink black text (#1c1b1b), ONE signal orange accent (#e6813a) used sparingly. Fine SVG line charts, technical diagrams, real data panels, generous white space, short punchy headlines. NOT generic SaaS. NOT dark mode. NOT AI gradients or phone mockups.

LOGO: Inline SVG monoline segmented bracket with 3 connected horizontal intervals, one orange dot on the middle segment, small tick marks at boundaries. Pure monoline stroke, energy infrastructure diagram mark.

SECTIONS:
1. Hero: H1 "Controla la energia de tu cartera turistica" + subcopy about crossing consumption/reservations/CUPS/Datadis + 2 CTAs + right-side realistic product dashboard panel showing KPIs, VGO-014 alert, P1/P2 bars, small sparkline
2. 3 pain cards: consumo fuera de reserva, tarifa mal ajustada, propietarios sin informe
3. System flow: PMS/Reservas -> Sensores -> CUPS/Datadis -> Tarifas -> Tramo -> Alertas -> Informes
4. 4 modules grid (Pirsch-style clean metric cards): Consumo, Tarifas, Reglas, Informes
5. Battery section: SVG battery illustration that fills and changes color to orange on hover, OMIE price data, "Carga 0.06 EUR/kWh, Descarga 0.18 EUR/kWh"
6. Lead form: fields for nombre, empresa, email, alojamientos, ciudad, dolor principal
7. Trust and footer

RULES: Spanish throughout. No English labels. Every number has units (kWh, EUR, kW). Professional B2B energy operations tone.`;

async function call(name, args) {
  const body = JSON.stringify({jsonrpc:"2.0",id:1,method:"tools/call",params:{name,arguments:args}});
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname:"stitch.googleapis.com",port:443,path:"/mcp",method:"POST",
      headers:{"Content-Type":"application/json","Content-Length":Buffer.byteLength(body),"X-Goog-Api-Key":AK}
    }, res => { let d=""; res.on("data",c=>d+=c); res.on("end",()=>resolve(JSON.parse(d))); });
    req.on("error",reject); req.write(body); req.end();
  });
}

(async () => {
  const p = await call("create_project", {title:"Tramo Desktop"});
  const pid = p.result.structuredContent.name.replace("projects/","");
  console.log("Project:", pid);
  
  const g = await call("generate_screen_from_text", {projectId:pid, prompt:PROMPT});
  const txt = g.result?.content?.[0]?.text || "";
  const m = txt.match(/"name":\s*"([^"]+)"/);
  const sid = m ? m[1] : "NOT_FOUND";
  console.log("Screen:", sid);
  console.log("URL: https://stitch.withgoogle.com/projects/" + pid);
})();
