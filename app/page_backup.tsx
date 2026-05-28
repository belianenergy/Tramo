'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Menu, X } from 'lucide-react';

/* ══════════════════════════════════════════
   Logo — monoline bracket + Mercury Blue dot
   ══════════════════════════════════════════ */
function Logo({ className }: { className?: string }) {
  return (
    <svg className={cn('h-8 w-auto', className)} viewBox="0 0 80 48" fill="none" role="img" aria-label="Tramo">
      <path d="M10 13 H26 M32 13 H48 M54 13 H70 M10 35 H26 M32 35 H48 M54 35 H70 M10 13 V35 M40 13 V35 M70 13 V35"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M26 9 V17 M32 31 V39 M48 9 V17 M54 31 V39"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="54" cy="13" r="4.5" fill="#5266eb" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   Energy Grid SVG — abstract topology
   ══════════════════════════════════════════ */
function EnergyGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20,40,60,80,100,120,140,160,180,200,220,240,260,280,300].map(y => (
        <line key={'h'+y} x1="0" y1={y} x2="600" y2={y} stroke="white" strokeOpacity="0.025" strokeWidth="1" />
      ))}
      {[0,40,80,120,160,200,240,280,320,360,400,440,480,520,560,600].map(x => (
        <line key={'v'+x} x1={x} y1="0" x2={x} y2="320" stroke="white" strokeOpacity="0.025" strokeWidth="1" />
      ))}
      {[[80,60],[200,100],[350,50],[500,120],[120,200],[280,180],[440,220],[560,180],[80,280],[250,270],[400,300]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
      ))}
      <path d="M80 60 L200 100 L350 50 L500 120" stroke="url(#eg)" strokeWidth="1.5" />
      <path d="M120 200 L280 180 L440 220 L560 180" stroke="url(#eg)" strokeWidth="1.5" />
      <path d="M80 280 L250 270 L400 300" stroke="url(#eg)" strokeWidth="1.5" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   Animated Bar Chart — light up on view
   ══════════════════════════════════════════ */
function BarChart({ data, className }: { data: number[]; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <div ref={ref} className={cn('flex items-end gap-[2px] h-16', className)}>
      {data.map((h, i) => (
        <motion.div key={i}
          initial={{ height: 0 }}
          animate={inView ? { height: `${h}%` } : { height: 0 }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
          className={cn('flex-1 min-w-[6px] rounded-t-[1px]', h > 65 ? 'bg-[#5266eb]' : 'bg-[#e5e4e7]')}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   Animated Counter
   ══════════════════════════════════════════ */
function Counter({ value, suffix = '', className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20 });
  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  return (
    <span ref={ref} className={cn('font-mono tabular-nums', className)}>
      <motion.span>{spring}</motion.span>{suffix}
    </span>
  );
}

/* ══════════════════════════════════════════
   System Flow Diagram SVG
   ══════════════════════════════════════════ */
function SystemFlowSVG() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const nodes = ['PMS', 'Sensores', 'CUPS', 'Tarifas', 'Tramo'];
  const subs = ['Reservas, limpiezas', 'Consumo, clima', 'Lecturas, facturas', 'P1/P2, €/kWh', 'Alertas, informes'];
  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-3 sm:gap-0 py-8">
      {nodes.map((label, i) => (
        <motion.div key={label} className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.12, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.04, borderColor: 'rgba(82,102,235,0.5)' }}
            className="w-20 h-20 rounded-lg border border-[#d8d4d4] bg-white flex flex-col items-center justify-center transition-colors cursor-default"
          >
            <span className="text-xs font-bold text-[#181011] tracking-tight">{label}</span>
            <span className="text-[9px] text-[#aaaaaa] mt-0.5 text-center px-1 leading-tight">{subs[i]}</span>
          </motion.div>
          {i < 4 && (
            <motion.span className="text-[#5266eb] text-base font-mono mx-1 sm:mx-2"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.2 }}
            >→</motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */
const properties = [
  { name: 'Villa Marosa', cups: 'ES0031400007812241LR', city: 'Málaga', lectura: '17/05 23:10', fuera: 221, coste: 58.30, s: 'Alta' },
  { name: 'Casa Rural O Pino', cups: 'ES0021000001234567AB', city: 'A Coruña', lectura: '18/05 09:15', fuera: 184, coste: 42.70, s: 'Revisar' },
  { name: 'Apartamentos Riazor', cups: 'ES0021000004459120QF', city: 'A Coruña', lectura: '18/05 08:40', fuera: 96, coste: 21.90, s: 'Controlado' },
  { name: 'Casa Lestrove', cups: 'ES0021000009921367XP', city: 'Pontevedra', lectura: '18/05 07:55', fuera: 72, coste: 18.40, s: 'OK' },
  { name: 'Ático Compostela', cups: 'ES0021000003348765MN', city: 'Santiago', lectura: '18/05 08:20', fuera: 43, coste: 11.20, s: 'OK' },
  { name: 'Loft Rianxo', cups: 'ES0021000006671249HK', city: 'Rianxo', lectura: '17/05 22:45', fuera: 118, coste: 31.50, s: 'Revisar' },
  { name: 'Dúplex Ferrol', cups: 'ES0021000008814203DW', city: 'Ferrol', lectura: '18/05 06:10', fuera: 35, coste: 9.80, s: 'OK' },
  { name: 'Estudio Coruña', cups: 'ES0021000005539081BV', city: 'A Coruña', lectura: '18/05 09:00', fuera: 29, coste: 7.60, s: 'OK' },
];

const caps = [
  { n: 'Detección fuera de estancia', d: 'Cruza reservas PMS con lecturas de sensor para detectar consumo sin huésped ni limpieza programada.', sig: 'PMS + sensor', r: '184 kWh', u: 'detectados' },
  { n: 'Atribución por reserva', d: 'Cada kWh asignado a la estancia que lo generó. Trazabilidad completa desde check-in hasta check-out.', sig: 'PMS + CUPS', r: '32', u: 'propiedades' },
  { n: 'Recomendación de potencia', d: 'Cruce de P1/P2, potencia contratada y hábitos reales para priorizar cambios con evidencia.', sig: 'CUPS + tarifa', r: '180 €/año', u: 'por CUPS' },
  { n: 'Cola de acciones', d: 'Señales convertidas en tareas para limpieza o mantenimiento, priorizadas por el próximo check-in.', sig: 'Alertas + PMS', r: '18', u: 'reglas activas' },
  { n: 'Informe por propietario', d: 'Resumen mensual con consumo atribuido, incidencias, acciones realizadas y estimaciones por CUPS.', sig: 'Todos los datos', r: '412 kWh', u: 'informados' },
];

/* ══════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════ */
export default function LandingPage() {
  const [mo, setMo] = useState(false);
  const [f, setF] = useState({ name:'',email:'',company:'',units:'',payer:'',datadis:'',pain:'',message:'' });
  const [snd, setSnd] = useState(false);
  const [ok, setOk] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setSnd(true);
    try { await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)}); setOk(true); }
    catch {} setSnd(false);
  }

  return (
    <div className="min-h-screen bg-[#f3f1ed] text-[#181011]" style={{fontFamily:"Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"}}>
      <a href="#contenido" className="absolute -top-24 left-3 bg-[#181011] text-[#f3f1ed] px-4 py-2 z-[200] font-bold rounded focus:top-3">Saltar al contenido</a>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f3f1ed]/90 backdrop-blur border-b border-[#d8d4d4]">
        <div className="max-w-[1200px] mx-auto px-6 flex h-14 items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-tight"><Logo/> Tramo</Link>
          <nav className="hidden md:flex items-center gap-6 ml-auto text-sm font-semibold text-[#181011]">
            <Link href="#sistema" className="hover:opacity-70 transition-opacity">Sistema</Link>
            <Link href="#datos" className="hover:opacity-70 transition-opacity">Datos</Link>
            <Link href="#capacidades" className="hover:opacity-70 transition-opacity">Capacidades</Link>
            <Link href="#contacto" className="hover:opacity-70 transition-opacity">Piloto</Link>
          </nav>
          <div className="flex items-center gap-3 ml-auto md:ml-0">
            <Link href="/app/dashboard" className="hidden sm:inline-flex items-center bg-transparent text-[#181011] border border-[#181011] rounded-[100px] px-5 py-2 text-sm font-semibold hover:bg-[rgba(24,16,17,0.05)] transition-colors">Ver demo</Link>
            <Link href="#contacto" className="inline-flex items-center gap-2 bg-[#5266eb] text-white rounded-[100px] px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity">Evaluar cartera <ArrowRight className="w-4 h-4"/></Link>
            <button className="md:hidden p-1" onClick={()=>setMo(!mo)}>{mo?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}</button>
          </div>
        </div>
        {mo&&(<nav className="md:hidden border-t border-[#d8d4d4] px-6 py-3 flex flex-col gap-2 bg-[#f3f1ed]"><Link href="#sistema" className="text-sm py-1" onClick={()=>setMo(false)}>Sistema</Link><Link href="#datos" className="text-sm py-1" onClick={()=>setMo(false)}>Datos</Link><Link href="#capacidades" className="text-sm py-1" onClick={()=>setMo(false)}>Capacidades</Link><Link href="#contacto" className="text-sm py-1" onClick={()=>setMo(false)}>Piloto</Link></nav>)}
      </header>

      <main id="contenido">

        {/* ═══ HERO · Deep Plum + Grid ═══ */}
        <section className="relative bg-[#302023] text-white overflow-hidden">
          <EnergyGrid className="absolute inset-0 w-full h-full pointer-events-none"/>
          <div className="relative max-w-[1200px] mx-auto px-6 py-28 sm:py-36 flex flex-col items-center text-center">
            <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}}
              className="text-xs font-bold uppercase tracking-[0.1em] text-white/40 mb-6">España · Gestores de apartamentos turísticos</motion.p>
            <motion.h1 initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}}
              className="text-[48px] leading-[1.1] tracking-[-0.96px] font-normal max-w-3xl">Convierte la energía de tu cartera turística en margen operativo.</motion.h1>
            <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.5}}
              className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">Tramo cruza reservas, sensores, CUPS y tarifas para atribuir cada kWh, detectar consumo fuera de estancia y generar informes por propietario.</motion.p>
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.5,duration:0.5}}
              className="flex flex-wrap justify-center gap-4 mt-10">
              <Link href="#contacto" className="inline-flex items-center gap-2 bg-[#5266eb] text-white rounded-[100px] px-8 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity">Solicitar evaluación <ArrowRight className="w-5 h-5"/></Link>
              <Link href="/app/dashboard" className="inline-flex items-center gap-2 bg-transparent text-white border border-white/25 rounded-[100px] px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors">Ver panel demo</Link>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7,duration:0.5}}
              className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-12 text-xs font-mono text-white/35">
              <span>10–50+ unidades</span><span className="hidden sm:inline">·</span><span>PMS + sensores + Datadis</span><span className="hidden sm:inline">·</span><span>Informes por CUPS</span>
            </motion.div>
          </div>
        </section>

        {/* ═══ DASHBOARD PREVIEW ═══ */}
        <section className="max-w-[1200px] mx-auto px-6 -mt-10 relative z-10">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:0.6}}
            className="bg-white rounded-lg border border-[#d8d4d4] overflow-hidden"
            style={{boxShadow:'0 0 0 1px rgba(17,26,74,0.05),0 1px 2px 0 rgba(0,0,0,0.08)'}}>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#fafafa] border-b border-[#d8d4d4]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"/><span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"/><span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"/>
              <span className="ml-3 font-mono text-[11px] text-[#aaaaaa]">app.tramo.energy/dashboard · Galicia y Costa Norte</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[{l:'Fuera de estancia',v:501,suf:' kWh',sub:'+12% vs periodo anterior',a:true},{l:'Coste estimado',v:122.90,suf:' EUR',sub:'Tarifa activa por CUPS'},{l:'Alertas abiertas',v:3,suf:'',sub:'2 confort · 1 telemetría',a:true},{l:'Dispositivos',v:27,suf:'/29',sub:'93% operativos'}].map((k,i)=>(
                  <motion.div key={k.l} initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08,duration:0.4}}
                    className="bg-[#fafafa] rounded p-3 border border-[#f0f0f0]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#aaaaaa] mb-1">{k.l}</div>
                    <div className={cn('font-mono text-xl font-bold',k.a&&'text-[#5266eb]')}><Counter value={k.v} suffix={k.suf}/></div>
                    <div className="text-[11px] text-[#aaaaaa] mt-1">{k.sub}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#181011]">Consumo fuera de estancia por día</span>
                  <span className="flex text-[11px] font-mono text-[#aaaaaa] gap-3"><span className="text-[#181011]">7D</span><span>30D</span><span>90D</span></span>
                </div>
                <BarChart data={[38,46,31,76,42,28,36,68,44,33,52,39]}/>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm"><thead><tr className="border-b border-[#d8d4d4] text-[11px] font-bold uppercase tracking-[0.06em] text-[#aaaaaa]"><td className="py-2 pr-4">Propiedad</td><td className="py-2 pr-4">Lectura</td><td className="py-2 pr-4 text-right">Entre reservas</td><td className="py-2 pr-4 text-right">Coste</td><td className="py-2">Estado</td></tr></thead>
                <tbody>{properties.slice(0,5).map(p=>(<tr key={p.cups} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors"><td className="py-2.5 pr-4"><span className="font-semibold">{p.name}</span><br/><span className="font-mono text-[10px] text-[#aaaaaa]">{p.cups}</span></td><td className="py-2.5 pr-4 font-mono text-xs">{p.lectura}</td><td className={cn('py-2.5 pr-4 text-right font-mono text-xs',p.fuera>100&&'text-[#5266eb] font-bold')}>{p.fuera} kWh</td><td className="py-2.5 pr-4 text-right font-mono text-xs">{p.coste.toFixed(2)} EUR</td><td className="py-2.5"><span className={cn('inline-flex text-[10px] font-bold px-2 py-0.5 rounded border',p.s==='Alta'?'bg-red-50 text-red-700 border-red-200':p.s==='Revisar'?'bg-amber-50 text-amber-700 border-amber-200':p.s==='Controlado'?'bg-slate-100 text-slate-600 border-slate-200':'bg-emerald-50 text-emerald-700 border-emerald-200')}>{p.s}</span></td></tr>))}</tbody></table>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ SYSTEM FLOW ═══ */}
        <section id="sistema" className="max-w-[1200px] mx-auto px-6 py-24 sm:py-32">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:0.5}} className="max-w-xl mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#aaaaaa] mb-4">Arquitectura del sistema</p>
            <h2 className="text-[40px] leading-[1.1] tracking-[-0.8px] font-semibold text-[#181011]">De señales dispersas a una cola de acciones priorizada.</h2>
            <p className="mt-4 text-[#aaaaaa] leading-relaxed">Tramo no sustituye el PMS ni las rutinas del equipo local. Ordena señales, atribuye consumo y genera evidencia para decidir rápido y explicar después.</p>
          </motion.div>
          <SystemFlowSVG/>
          <motion.div initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.8,duration:0.5}}
            className="mt-12 bg-[rgba(24,16,17,0.03)] rounded p-6 font-mono text-xs leading-relaxed text-[#555] max-w-lg">
            <span className="text-[#5266eb]">$</span> tramo connect --pms ical/api<br/>
            <span className="text-[#5266eb]">$</span> tramo connect --metering mqtt/w1<br/>
            <span className="text-[#5266eb]">$</span> tramo connect --grid datadis<br/>
            <span className="text-[#5266eb]">$</span> tramo connect --tariff omie<br/>
            <span className="text-[#aaaaaa]">▸ Motor de reglas activo · 32 propiedades · 18 CUPS · 29 sensores</span>
          </motion.div>
        </section>

        {/* ═══ CAPABILITIES LIST ═══ */}
        <section id="capacidades" className="bg-white py-24 sm:py-32 border-y border-[#d8d4d4]">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:0.5}} className="max-w-xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#aaaaaa] mb-4">Capacidades</p>
              <h2 className="text-[40px] leading-[1.1] tracking-[-0.8px] font-semibold text-[#181011]">Producto para gestión turística.</h2>
              <p className="mt-4 text-[#aaaaaa] leading-relaxed">Cada capacidad responde a una pregunta operativa concreta: antes, durante o después de la estancia.</p>
            </motion.div>
            <div>{caps.map((c,i)=>(
              <motion.div key={c.n} initial={{opacity:0,x:-8}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08,duration:0.4}}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[#d8d4d4] last:border-b-0 gap-2">
                <div className="flex-1"><h3 className="text-lg font-semibold text-[#181011] tracking-[-0.01em]">{c.n}</h3><p className="text-sm text-[#aaaaaa] mt-0.5 max-w-lg">{c.d}</p></div>
                <div className="flex items-center gap-6 text-sm flex-shrink-0"><span className="text-[#aaaaaa] font-mono text-xs">{c.sig}</span><span className="font-mono text-sm font-bold text-[#5266eb]">{c.r} <span className="text-[10px] font-normal text-[#aaaaaa]">{c.u}</span></span></div>
              </motion.div>
            ))}</div>
          </div>
        </section>

        {/* ═══ PROOF TERMINAL · Deep Plum ═══ */}
        <section className="bg-[#302023] text-white py-24 sm:py-32">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:0.5}} className="max-w-xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/40 mb-4">Evidencia operativa</p>
              <h2 className="text-[40px] leading-[1.1] tracking-[-0.8px] font-semibold text-white">El sistema en producción.</h2>
              <p className="mt-4 text-white/50 leading-relaxed">Caso simulado sobre cartera real. 32 alojamientos en Galicia y Costa Norte. Mayo 2026.</p>
            </motion.div>
            <motion.div initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.3,duration:0.5}}
              className="bg-[rgba(255,255,255,0.06)] rounded-lg p-8 font-mono text-sm leading-loose max-w-xl">
              <span className="text-white/20">══════════════════════════</span><br/>
              <span className="text-white/40">CUPS</span>        <span className="text-[#5266eb]">ES0031400007812241LR</span><br/>
              <span className="text-white/40">Periodo</span>     01/05/2026 – 18/05/2026<br/>
              <span className="text-white/20">──────────────────────────</span><br/>
              <span className="text-white/40">Consumo total</span>        <span className="text-white">412 kWh</span><br/>
              <span className="text-white/40">Fuera de estancia</span>    <span className="text-[#5266eb]">221 kWh</span>  <span className="text-white/20"># 17/05 19:20 split sin reserva</span><br/>
              <span className="text-white/40">Coste estimado</span>        <span className="text-white">58,30 EUR</span>  <span className="text-white/20"># P1 0,142 + P2 0,118 €/kWh</span><br/>
              <span className="text-white/40">Potencia contratada</span>   <span className="text-white">5,75 kW</span>  <span className="text-white/20"># P1 5,75 / P2 5,75</span><br/>
              <span className="text-white/40">Potencia recomendada</span>  <span className="text-emerald-400">3,45 kW</span>  <span className="text-white/20"># ahorro est. 180 €/año</span><br/>
              <span className="text-white/20">──────────────────────────</span><br/>
              <span className="text-white/40">Acción</span>                Revisar split + programar desconexión post-checkout<br/>
              <span className="text-white/20">══════════════════════════</span>
            </motion.div>
          </div>
        </section>

        {/* ═══ PILOT FORM ═══ */}
        <section id="contacto" className="max-w-[1200px] mx-auto px-6 py-24 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:0.5}}>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#aaaaaa] mb-4">Piloto cualificado</p>
              <h2 className="text-[40px] leading-[1.1] tracking-[-0.8px] font-semibold text-[#181011]">Cuéntanos cómo gestionas la energía de tu cartera.</h2>
              <p className="mt-4 text-[#aaaaaa] leading-relaxed">Con esos datos podemos evaluar el encaje, las señales disponibles y la primera oportunidad de mejora operativa. Sin compromiso. Sin promesas de ahorro garantizado.</p>
              <div className="mt-8 bg-[rgba(24,16,17,0.03)] rounded p-5 font-mono text-xs leading-relaxed text-[#555]">
                <span className="text-[#5266eb]">▸</span> Número de alojamientos<br/>
                <span className="text-[#5266eb]">▸</span> Quién paga la factura<br/>
                <span className="text-[#5266eb]">▸</span> Acceso a Datadis<br/>
                <span className="text-[#5266eb]">▸</span> Sistemas: PMS, sensores<br/>
                <span className="text-[#5266eb]">▸</span> Principal dolor operativo<br/>
                <span className="text-[#aaaaaa]"># No hace falta adjuntar facturas.</span>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{delay:0.1,duration:0.5}}
              className="bg-white rounded-lg border border-[#d8d4d4] p-8" style={{boxShadow:'0 0 0 1px rgba(17,26,74,0.05),0 1px 2px 0 rgba(0,0,0,0.06)'}}>
              {ok ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#5266eb] font-bold text-xl">✓</div>
                  <h3 className="text-xl font-semibold text-[#181011] tracking-[-0.01em]">Solicitud recibida</h3>
                  <p className="text-sm text-[#aaaaaa] mt-2">Analizaremos tu caso y te responderemos en 2–3 días laborables.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <h3 className="text-lg font-semibold text-[#181011] tracking-[-0.01em] mb-2">Solicitud de evaluación</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-[#181011] mb-1.5" htmlFor="n">Nombre</label><input id="n" required value={f.name} onChange={e=>setF({...f,name:e.target.value})} className="w-full border border-[#d8d4d4] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#5266eb] focus:ring-1 focus:ring-[#5266eb] transition-colors" placeholder=""/></div>
                    <div><label className="block text-sm font-medium text-[#181011] mb-1.5" htmlFor="e">Email profesional</label><input id="e" type="email" required value={f.email} onChange={e=>setF({...f,email:e.target.value})} className="w-full border border-[#d8d4d4] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#5266eb] focus:ring-1 focus:ring-[#5266eb] transition-colors"/></div>
                  </div>
                  <div><label className="block text-sm font-medium text-[#181011] mb-1.5" htmlFor="c">Empresa gestora</label><input id="c" required value={f.company} onChange={e=>setF({...f,company:e.target.value})} className="w-full border border-[#d8d4d4] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#5266eb] focus:ring-1 focus:ring-[#5266eb] transition-colors"/></div>
                  <div><label className="block text-sm font-medium text-[#181011] mb-1.5" htmlFor="u">Unidades gestionadas</label><select id="u" required value={f.units} onChange={e=>setF({...f,units:e.target.value})} className="w-full border border-[#d8d4d4] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#5266eb] focus:ring-1 focus:ring-[#5266eb] transition-colors"><option value="">Selecciona rango</option><option>5–10 alojamientos</option><option>10–20 alojamientos</option><option>21–50 alojamientos</option><option>51+ alojamientos</option></select></div>
                  <div><label className="block text-sm font-medium text-[#181011] mb-1.5" htmlFor="p">Quién paga la factura</label><select id="p" required value={f.payer} onChange={e=>setF({...f,payer:e.target.value})} className="w-full border border-[#d8d4d4] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#5266eb] focus:ring-1 focus:ring-[#5266eb] transition-colors"><option value="">Selecciona</option><option>La gestora</option><option>El propietario</option><option>Mixto por vivienda</option></select></div>
                  <div><label className="block text-sm font-medium text-[#181011] mb-1.5" htmlFor="dd">Acceso a Datadis</label><select id="dd" required value={f.datadis} onChange={e=>setF({...f,datadis:e.target.value})} className="w-full border border-[#d8d4d4] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#5266eb] focus:ring-1 focus:ring-[#5266eb] transition-colors"><option value="">Selecciona</option><option>Sí, con fichero de CUPS</option><option>Sí, manual por CUPS</option><option>No</option><option>No lo sé</option></select></div>
                  <div><label className="block text-sm font-medium text-[#181011] mb-1.5" htmlFor="pn">Principal dolor operativo</label><select id="pn" required value={f.pain} onChange={e=>setF({...f,pain:e.target.value})} className="w-full border border-[#d8d4d4] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#5266eb] focus:ring-1 focus:ring-[#5266eb] transition-colors"><option value="">Selecciona</option><option>Consumo sin huésped</option><option>Facturas inexplicables a propietarios</option><option>Tarifas y potencia desactualizadas</option><option>Falta de visibilidad entre reservas</option><option>Todo lo anterior</option></select></div>
                  <div><label className="block text-sm font-medium text-[#181011] mb-1.5" htmlFor="m">Contexto adicional</label><textarea id="m" minLength={20} placeholder="Ej. 24 apartamentos en Málaga, propietarios distintos, incidencias de climatización en verano. PMS: Lodgify." value={f.message} onChange={e=>setF({...f,message:e.target.value})} className="w-full border border-[#d8d4d4] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#5266eb] focus:ring-1 focus:ring-[#5266eb] transition-colors min-h-[80px] resize-y"/><p className="text-[11px] text-[#aaaaaa] mt-1">Cuanta más información, más precisa será la evaluación de encaje.</p></div>
                  <button type="submit" disabled={snd} className="w-full bg-[#5266eb] text-white rounded-[100px] py-3 text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">{snd?'Enviando…':'Enviar solicitud'}</button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[#d8d4d4] py-12 bg-[#f3f1ed]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#aaaaaa]">
          <div className="flex items-center gap-2">
            <Logo className="h-5 w-auto"/><span className="font-bold text-[#181011] tracking-tight">Tramo</span>
            <span className="hidden sm:inline text-xs">— consumo atribuido por reserva y propietario</span>
          </div>
          <span className="text-xs">Sistema de control energético para gestores de apartamentos turísticos en España.</span>
          <Link href="/app/dashboard" className="text-xs font-semibold text-[#181011] hover:opacity-70 transition-opacity">Panel demo</Link>
        </div>
      </footer>
    </div>
  );
}
