import Link from 'next/link';

const green = '#0f7b5a';
const ink = '#111827';
const muted = '#4b5563';

const nav = [
  ['Sistema', '#sistema'],
  ['Decisión', '#decision'],
  ['Hardware', '#hardware'],
  ['Precios', '#precios'],
];

const processRows = [
  ['01', 'Captura', 'CUPS · Datadis · ocupación', 'A lectura parte do consumo real e do calendario operativo da carteira.'],
  ['02', 'Diagnóstico', 'picos · standby · tarifa', 'Separa gasto inevitable de marxe accionable por apartamento.'],
  ['03', 'Decisión', 'regra · alerta · automatización', 'Cada recomendación ten causa, impacto estimado e nivel de confianza.'],
  ['04', 'Informe', 'xestor · propietario · equipo', 'O resultado é explicable: que facer, cando facelo e por que compensa.'],
];

const kpis = [
  ['8–18%', 'marxe enerxética recuperable en carteiras con ocupación variable'],
  ['24 h', 'tempo para localizar os primeiros patróns accionables'],
  ['0 hardware', 'recomendado se o diagnóstico non xustifica payback'],
];

const decisions = [
  ['Standby', 'Detectar consumo permanente fóra de reserva.', 'Baixo custo, intervención inmediata.'],
  ['Clima', 'Axustar horarios segundo entrada, saída e temperatura.', 'Control operativo sen molestar ao hóspede.'],
  ['Tarifa', 'Cruzar consumo con períodos 2.0TD/3.0TD.', 'Cambio contractual cando hai evidencia.'],
  ['Batería', 'Simular arbitraxe OMIE con curva real.', 'Só como escenario premium, nunca como promesa.'],
];

const plans = [
  ['Diagnóstico', 'desde 4 €/apto/mes', 'Para medir consumo, detectar perdas e priorizar accións.'],
  ['Operación', 'desde 9 €/apto/mes', 'Para alertas, regras, informes e seguimento por carteira.'],
  ['Portfolio', 'a medida', 'Para integradores, comunidades e carteiras con hardware opcional.'],
];

function Rule() {
  return <div className="h-px w-full bg-[#111827]/16" />;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f7b5a]">{children}</p>;
}

export default function VignelliPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111827]">
      <header className="sticky top-0 z-40 border-b border-[#111827]/10 bg-[#fafafa]/92 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="font-display text-[20px] font-medium tracking-[-0.04em]">Tramo</Link>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map(([label, href]) => <a key={href} href={href} className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#4b5563] hover:text-[#0f7b5a]">{label}</a>)}
          </nav>
          <a href="#diagnostico" className="rounded-[6px] bg-[#0f7b5a] px-4 py-2 text-[13px] font-medium text-white">Pedir diagnóstico</a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-10 md:gap-10 md:pb-24 md:pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Rule />
          <div className="mt-6 flex items-center justify-between gap-6">
            <Label>Energy margin operations</Label>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6b7280]">España · turístico</p>
          </div>
          <h1 className="mt-7 max-w-[11ch] font-display text-[clamp(3.25rem,10vw,9.8rem)] font-light leading-[0.9] tracking-[-0.065em] md:leading-[0.83] md:tracking-[-0.075em]">
            Enerxía baixo control.
          </h1>
        </div>
        <div className="flex flex-col justify-end">
          <p className="max-w-xl text-[19px] leading-[1.45] text-[#374151] md:text-[24px]">
            Diagnóstico, decisións e informes para xestores de apartamentos turísticos que queren recuperar marxe sen comprar hardware por defecto.
          </p>
          <a href="#diagnostico" className="mt-6 inline-flex w-fit rounded-[6px] bg-[#0f7b5a] px-5 py-3 text-[14px] font-medium text-white md:hidden">Ver marxe recuperable</a>
          <div className="mt-7 grid border-y border-[#111827]/18 md:mt-10 md:grid-cols-3">
            {kpis.map(([value, text]) => (
              <div key={value} className="border-b border-[#111827]/12 py-4 md:border-b-0 md:border-r md:last:border-r-0 md:border-[#111827]/12 md:px-5 md:py-5 first:md:pl-0">
                <p className="font-display text-[38px] font-light tracking-[-0.055em]">{value}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#4b5563]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sistema" className="border-y border-[#111827]/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Label>Sistema</Label>
            <h2 className="mt-5 max-w-[9ch] font-display text-[clamp(2.3rem,5vw,5.6rem)] font-light leading-[0.9] tracking-[-0.06em]">Da lectura á acción.</h2>
          </div>
          <div className="border-t border-[#111827]">
            {processRows.map(([num, title, meta, body]) => (
              <div key={num} className="grid gap-4 border-b border-[#111827]/16 py-6 md:grid-cols-[70px_1fr_1.2fr] md:items-baseline">
                <p className="font-mono text-[12px] font-semibold text-[#0f7b5a]">{num}</p>
                <div>
                  <h3 className="font-display text-[28px] font-light leading-none tracking-[-0.045em]">{title}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6b7280]">{meta}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-[#4b5563]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="decision" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <Rule />
            <Label>Decisión con datos</Label>
            <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(2.4rem,5.5vw,6.3rem)] font-light leading-[0.88] tracking-[-0.065em]">Menos interface. Máis criterio.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[6px] border border-[#111827]/18 bg-[#111827]/12 md:grid-cols-2">
            {decisions.map(([title, body, foot]) => (
              <div key={title} className="bg-white p-6">
                <p className="font-display text-[30px] font-light tracking-[-0.05em]">{title}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#4b5563]">{body}</p>
                <p className="mt-8 border-t border-[#111827]/12 pt-4 font-mono text-[10px] uppercase tracking-[0.13em] text-[#0f7b5a]">{foot}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hardware" className="border-y border-[#111827]/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Label>Hardware opcional</Label>
            <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(2.4rem,5.5vw,6rem)] font-light leading-[0.9] tracking-[-0.065em]">Medir antes de instalar.</h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#4b5563]">Sensores e baterías son capacidades de Tramo, non o punto de partida. O software decide onde compensa engadilos.</p>
          </div>
          <div>
            <div className="rounded-[6px] border border-[#111827]/18 bg-[#fafafa] p-5">
              <svg className="block aspect-[16/7] w-full" viewBox="0 0 1120 490" aria-hidden="true">
                <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={green} /></marker></defs>
                <rect x="24" y="24" width="1072" height="442" rx="8" fill="#fafafa" stroke={ink} strokeOpacity="0.16" />
                {[110,245,380].map(y => <line key={y} x1="80" y1={y} x2="1040" y2={y} stroke={ink} strokeOpacity="0.14" />)}
                {[210,500,790].map(x => <line key={x} x1={x} y1="68" x2={x} y2="422" stroke={ink} strokeOpacity="0.10" />)}
                <path d="M210 245 H910" fill="none" stroke={green} strokeWidth="4" strokeLinecap="round" strokeDasharray="18 14" markerEnd="url(#arrow)" />
                <path d="M790 245 C824 178 866 150 930 146" fill="none" stroke={green} strokeWidth="3" strokeLinecap="round" strokeDasharray="12 10" markerEnd="url(#arrow)" />
                <path d="M790 245 C824 308 866 338 930 346" fill="none" stroke={green} strokeWidth="3" strokeLinecap="round" strokeDasharray="12 10" markerEnd="url(#arrow)" />
                {[[210,245,'01','MEDICIÓN'],[500,245,'02','REGLA'],[790,245,'03','DECISIÓN'],[958,146,'S','SENSOR'],[958,346,'B','BATERÍA']].map(([cx,cy,code,label]) => (
                  <g key={`${code}-${label}`}>
                    <circle cx={cx} cy={cy} r="46" fill="white" stroke={ink} strokeOpacity="0.24" strokeWidth="2" />
                    <circle cx={cx} cy={cy} r="30" fill={(code === 'S' || code === 'B') ? green : '#fafafa'} stroke={green} strokeWidth="2" />
                    <text x={cx} y={(cy as number)+6} textAnchor="middle" fill={(code === 'S' || code === 'B') ? 'white' : green} fontSize="18" fontWeight="700" fontFamily="monospace">{code}</text>
                    <text x={cx} y={(cy as number)+82} textAnchor="middle" fill={ink} fontSize="15" fontWeight="700" letterSpacing="2">{label}</text>
                  </g>
                ))}
                <text x="82" y="82" fill={green} fontSize="15" fontWeight="700" letterSpacing="3">CRITERIO OPERATIVO</text>
                <text x="82" y="432" fill={muted} fontSize="18">Se non hai marxe accionable, o fluxo remata sen hardware.</text>
              </svg>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[6px] border border-[#111827]/18 bg-white p-5"><Label>Sensor</Label><p className="mt-4 font-display text-[34px] font-light tracking-[-0.055em]">~300 €/apto</p><p className="mt-3 text-[13px] leading-relaxed text-[#4b5563]">Só cando a medición por circuito cambia a decisión.</p></div>
              <div className="rounded-[6px] border border-[#111827]/18 bg-white p-5"><Label>Batería</Label><p className="mt-4 font-display text-[34px] font-light tracking-[-0.055em]">~5.500 €</p><p className="mt-3 text-[13px] leading-relaxed text-[#4b5563]">Só con simulación prudente de arbitraxe e payback.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="precios" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div><Label>Precios</Label><h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,5.6rem)] font-light leading-[0.9] tracking-[-0.06em]">Simple de auditar.</h2></div>
          <p className="max-w-2xl text-[18px] leading-relaxed text-[#4b5563] lg:pt-10">Plans pensados para validar primeiro, operar despois e só escalar cando hai carteira suficiente.</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[6px] border border-[#111827]/18 bg-[#111827]/12 md:grid-cols-3">
          {plans.map(([name, price, text]) => (
            <div key={name} className="bg-white p-6">
              <p className="font-display text-[30px] font-light tracking-[-0.05em]">{name}</p>
              <p className="mt-7 font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0f7b5a]">{price}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-[#4b5563]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="diagnostico" className="border-t border-[#111827]/10 bg-[#0f7b5a] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">Proba Vignelli</p>
            <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(2.8rem,6vw,7rem)] font-light leading-[0.86] tracking-[-0.07em]">Diagnosticar antes de decidir.</h2>
          </div>
          <div className="rounded-[6px] border border-white/20 bg-white/8 p-5">
            <p className="text-[16px] leading-relaxed text-white/78">Esta ruta é unha proba visual separada. A landing actual segue dispoñible en `/`.</p>
            <Link href="/" className="mt-6 inline-flex rounded-[6px] bg-white px-5 py-3 text-[14px] font-medium text-[#0f7b5a]">Volver á versión actual</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
