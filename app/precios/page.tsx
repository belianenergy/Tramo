'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BatteryCharging, CheckCircle2, PlugZap } from 'lucide-react';
const BAR_DELAYS = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 160, 170, 190, 200, 220];

function cssVar(n: string) { return `var(${n})`; }

function ArrowSwap() {
  return (
    <span className="relative inline-flex h-3 w-4 items-center justify-center" aria-hidden="true">
      <ArrowRight className="absolute h-4 w-4 translate-x-0 scale-100 opacity-100 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-2 group-hover:scale-0 group-hover:opacity-100" />
      <ArrowRight className="absolute h-4 w-4 -translate-x-2 scale-0 opacity-0 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
    </span>
  );
}

function ScaleBarBtn({ href, variant = 'solid', className = '', children }: { href: string; variant?: 'solid' | 'outline'; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={`group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 font-display text-sm font-semibold leading-none tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-300 active:translate-y-px ${className}`}
      style={{ background: variant === 'solid' ? cssVar('--color-bark') : 'transparent', color: variant === 'solid' ? cssVar('--color-sheet-white') : cssVar('--color-bark'), border: variant === 'solid' ? '1px solid transparent' : `1px solid ${cssVar('--color-bark')}` }}>
      <span className="pointer-events-none absolute inset-x-0 -inset-y-4 flex items-center justify-center">
        {BAR_DELAYS.map((delay, i) => (<span key={i} className="h-full flex-[0_0_3px] origin-bottom scale-y-0 rounded-sm transition-transform duration-300 group-hover:scale-y-100"
          style={{ background: variant === 'solid' ? cssVar('--color-mint-pulse') : cssVar('--color-sage-mist'), transitionDelay: `${delay}ms` }} />))}
      </span>
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
    </a>
  );
}

function TextCta({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} className="group inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.01em] text-[var(--color-canopy)]"><span>{children}</span><ArrowSwap /></a>;
}

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { name: 'Starter', range: [5, 15], pricePerApartment: 15, savingPer: null as number | null, cta: 'Diagnosticar' },
  { name: 'Pro', range: [16, 50], pricePerApartment: 12, savingPer: null as number | null, cta: 'Diagnosticar', highlight: true },
  { name: 'Business', range: [51, 99], pricePerApartment: 10, savingPer: null as number | null, cta: 'Diagnosticar' },
  { name: 'Scale', range: [100, Infinity], pricePerApartment: 7.5, savingPer: null as number | null, cta: 'Ventas' },
];

const faqs = [
  ['¿Hay permanencia?', 'No. Todos los planes son mensuales sin compromiso de permanencia.'],
  ['¿Qué incluye el piloto gratuito?', 'Diagnóstico completo de tu cartera con datos reales, sin configuración técnica y sin necesidad de tarjeta.'],
  ['¿Los sensores son obligatorios?', 'No. El diagnóstico inicial funciona sin hardware. Los sensores opcionales permiten medición y control en tiempo real.'],
  ['¿Cómo se calcula el ahorro?', 'Basado en datos reales de consumo, tarifas y patrones de reserva. La estimación es prudente y se revisa en el piloto.'],
];

function useCountUp(ref: React.RefObject<HTMLElement | null>, target: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = `${target.toLocaleString('es-ES')}`;
    const num = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(num, {
        v: target,
        duration: 1.5,
        ease: 'power1.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => { el.textContent = `${Math.round(num.v).toLocaleString('es-ES')}`; },
        onComplete: () => { el.textContent = `${target.toLocaleString('es-ES')}`; },
      });
    });
    return () => ctx.revert();
  }, [ref, target]);
}

export default function PreciosPage() {
  const [apts, setApts] = useState(25);
  const [withSensors, setWithSensors] = useState(false);
  const [withBattery, setWithBattery] = useState(false);

  const tier = tiers.find(t => apts >= t.range[0] && apts <= (t.range[1] === Infinity ? 99999 : t.range[1])) ?? tiers[0];
  const monthlyPrice = Math.round((apts * tier.pricePerApartment) / 5) * 5;

  // Savings estimation based on real parameters, using conservative industry averages
  const baseSavingPerAptYear = 120; // monitoring + power adjustment: ~10€/mo per apartment
  const sensorSavingPerAptYear = withSensors ? 80 : 0; // Optional sensors: reduced standby
  const batterySavingPerYear = withBattery ? 500 : 0; // Optional battery: OMIE arbitrage scenario midpoint, not guaranteed
  const totalSaving = (baseSavingPerAptYear + sensorSavingPerAptYear) * apts + batterySavingPerYear;

  const sensorCost = withSensors ? apts * 300 : 0;
  const batteryCost = withBattery ? 5500 : 0;
  const totalUpfront = sensorCost + batteryCost;
  const roiMonths = totalSaving > 0 && totalUpfront > 0 ? Math.ceil(totalUpfront / (totalSaving / 12)) : null;

  const savingRef = useRef<HTMLSpanElement>(null);
  useCountUp(savingRef, totalSaving ?? 0);

  return (
    <>
      <style>{`
        @keyframes rv{from{opacity:0;translate:0 28px}to{opacity:1;translate:0 0}}
        .rv{animation:rv .7s cubic-bezier(0.36,0,0.114,0.92) both}
        @media(prefers-reduced-motion:reduce){.rv{animation:none!important;opacity:1!important}}
      `}</style>

      <main className="min-h-screen" style={{ background: 'var(--color-cream-paper)', color: 'var(--color-bark)' }}>
        {/* Hero */}
        <section className="px-5 pb-12 pt-18 md:pb-16 md:pt-24">
          <div className="mx-auto max-w-4xl">
            <div className="rv mb-8 h-[3px] w-full rounded-full" style={{ background: 'var(--color-canopy)' }} />
            <p className="rv mb-4 inline-block rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em]" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)', color: 'var(--color-muted-slate)' }}>
              Precios transparentes
            </p>
            <h1 className="rv max-w-4xl [text-wrap:balance] font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-light leading-[1.06] tracking-[-0.02em]" style={{ color: 'var(--color-ink)' }}>
              Diagnóstico primero. Plan por apartamento después.
            </h1>
            <p className="rv mt-5 max-w-2xl text-[17px] leading-relaxed" style={{ color: 'var(--color-slate)' }}>
              Estimamos el margen energético perdido cruzando consumo, reservas y tarifa. Después proponemos un plan por apartamento con piloto gratuito, sin permanencia ni tarjeta.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section id="calculadora" className="border-y px-5 py-10 md:py-14" style={{ borderColor: 'var(--color-sage-mist)', background: 'var(--color-cream-paper)', scrollMarginTop: '80px' }}>
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div className="rv">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-muted-slate)' }}>Escenario</p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3vw,2.7rem)] font-light leading-[1.06]" style={{ color: 'var(--color-ink)' }}>
                Calculadora de ahorro prudente.
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>
                No vende un ROI garantizado. Ordena el piloto: coste actual, hardware opcional y plan mensual por apartamento.
              </p>
            </div>
            <div className="rv rounded-[16px] p-5 md:p-6" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-medium" style={{ color: 'var(--color-ink)' }}>Calculadora</h2>
                  <p className="mt-1 text-sm" style={{ color: 'var(--color-slate)' }}>Ajusta los parámetros de tu cartera.</p>
                </div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>Piloto gratuito</p>
              </div>

              <div className="mt-6 space-y-5">
                {/* Slider */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-muted-slate)' }}>Nº de apartamentos</label>
                    <span className="font-mono text-2xl font-semibold" style={{ color: 'var(--color-ink)' }}>{apts}</span>
                  </div>
                  <input
                    type="range"
                    suppressHydrationWarning
                    min={5}
                    max={200}
                    value={apts}
                    onChange={e => setApts(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-[var(--color-canopy)]"
                    style={{ background: 'var(--color-cream-paper)' }}
                  />
                  <div className="mt-1 flex justify-between font-mono text-xs" style={{ color: 'var(--color-muted-slate)' }}>
                    <span>5</span><span>200</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setWithSensors(!withSensors)}
                    className={`flex min-w-0 items-center gap-3 rounded-[8px] border p-3 text-left transition-[border-color,background-color] duration-200 ${withSensors ? 'border-[var(--color-canopy)] bg-[color-mix(in oklch, var(--color-canopy) 6%, transparent)]' : 'border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)]'}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${withSensors ? 'bg-[var(--color-canopy)]' : 'bg-[var(--color-cream-paper)]'}`}>
                      <PlugZap className={`h-5 w-5 ${withSensors ? 'text-[var(--color-sheet-white)]' : 'text-[var(--color-muted-slate)]'}`} />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>Sensores opcionales</p>
                      <p className="text-xs" style={{ color: 'var(--color-slate)' }}>+300 €/apt · escenario +80 €/año</p>
                    </div>
                    <span className={`ml-auto font-mono text-sm font-semibold ${withSensors ? 'text-[var(--color-canopy)]' : 'text-[var(--color-muted-slate)]'}`}>{withSensors ? 'ON' : 'OFF'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithBattery(!withBattery)}
                    className={`flex min-w-0 items-center gap-3 rounded-[8px] border p-3 text-left transition-[border-color,background-color] duration-200 ${withBattery ? 'border-[var(--color-canopy)] bg-[color-mix(in oklch, var(--color-canopy) 6%, transparent)]' : 'border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)]'}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${withBattery ? 'bg-[var(--color-canopy)]' : 'bg-[var(--color-cream-paper)]'}`}>
                      <BatteryCharging className={`h-5 w-5 ${withBattery ? 'text-[var(--color-sheet-white)]' : 'text-[var(--color-muted-slate)]'}`} />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>Batería opcional</p>
                      <p className="text-xs" style={{ color: 'var(--color-slate)' }}>5.500 € · escenario 350-700 €/año</p>
                    </div>
                    <span className={`ml-auto font-mono text-sm font-semibold ${withBattery ? 'text-[var(--color-canopy)]' : 'text-[var(--color-muted-slate)]'}`}>{withBattery ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                {/* Results */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[8px] p-4 text-center" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-muted-slate)' }}>Plan</p>
                    <p className="mt-2 font-display text-xl font-semibold" style={{ color: 'var(--color-ink)' }}>{tier.name}</p>
                    <p className="mt-2 font-mono text-sm" style={{ color: 'var(--color-slate)' }}>{tier.pricePerApartment.toLocaleString('es-ES')} €/apto/mes</p>
                    <p className="mt-1 text-xs" style={{ color: 'var(--color-slate)' }}>{monthlyPrice} €/mes estimados</p>
                  </div>
                  <div className="rounded-[8px] p-4 text-center" style={{ background: 'var(--color-bark)' }}>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-mint-pulse)' }}>Ahorro anual</p>
                    <p className="mt-2 font-mono text-3xl font-semibold" style={{ color: 'var(--color-mint-pulse)' }}>
                      <span ref={savingRef}>{totalSaving !== null ? totalSaving.toLocaleString('es-ES') : '—'}</span>
                      <span className="text-lg"> €</span>
                    </p>
                  </div>
                  <div className="rounded-[8px] p-4 text-center" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-muted-slate)' }}>Inversión inicial</p>
                    <p className="mt-2 font-mono text-xl font-semibold" style={{ color: 'var(--color-ink)' }}>{totalUpfront > 0 ? `${totalUpfront.toLocaleString('es-ES')} €` : '0 €'}</p>
                    {roiMonths !== null && roiMonths > 0 && <p className="mt-1 text-xs" style={{ color: 'var(--color-slate)' }}>Retorno orientativo hardware: {roiMonths} meses</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl rv">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05]" style={{ color: 'var(--color-ink)' }}>
                Planes para cada tamaño de cartera turística.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-slate)' }}>
                Los importes públicos son puntos de partida. La propuesta final se calcula con ocupación, factura, potencia y capacidad real de actuación.
              </p>
            </div>
            <div className="rv grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {tiers.map((plan) => (
                <article
                  key={plan.name}
                  className={`flex min-w-0 flex-col rounded-[16px] border p-5 ${plan.highlight ? 'border-[var(--color-bark)] bg-[var(--color-cream-paper)]' : 'border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)]'}`}
                >
                  <p className="font-display text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>{plan.name}</p>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-muted-slate)' }}>
                    {plan.range[1] === Infinity ? `${plan.range[0]}+` : `${plan.range[0]}-${plan.range[1]}`} apartamentos
                  </p>
                  <p className="mt-5 font-mono text-sm" style={{ color: 'var(--color-slate)' }}>Desde</p>
                  <div className="mt-2 flex min-w-0 items-baseline gap-2">
                    <span className="font-mono text-4xl font-semibold leading-none" style={{ color: 'var(--color-ink)' }}>
                      {plan.pricePerApartment.toLocaleString('es-ES')}
                    </span>
                    <span className="min-w-0 font-mono text-[10px] font-semibold leading-tight" style={{ color: 'var(--color-slate)' }}>
                      €/apt/mes
                    </span>
                  </div>
                  <div className="mt-5 rounded-[8px] p-3" style={{ background: 'var(--color-cream-paper)' }}>
                    <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>Ahorro estimado</p>
                    <p className="mt-1 text-center font-mono text-xl font-semibold" style={{ color: 'var(--color-ink)' }}>{plan.savingPer !== null ? plan.savingPer.toLocaleString('es-ES') + ' €/año' : '— pendiente de piloto'}</p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#calculadora"
                      className={`inline-flex min-h-10 w-full items-center justify-center whitespace-nowrap rounded-[8px] px-3 text-center font-display text-sm font-semibold tracking-[0.01em] transition-colors ${plan.highlight ? 'bg-[var(--color-bark)] text-[var(--color-sheet-white)]' : 'border border-[var(--color-bark)] text-[var(--color-bark)]'}`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {['Piloto gratuito', 'Sin tarjeta', 'Sin permanencia', 'Dashboard completo', 'Informes por propietario', 'Alertas y reglas'].map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-slate)' }}><CheckCircle2 className="h-3.5 w-3.5" style={{ color: 'var(--color-canopy)' }} />{f}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Method */}
        <section className="border-y px-5 py-20" style={{ borderColor: 'var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--color-muted-slate)' }}>Método</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.08]" style={{ color: 'var(--color-ink)' }}>
                Cómo defendemos el ahorro.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Consumo horario', 'Curva CUPS y, si existe, medición por circuito.'],
                ['Reserva y ocupación', 'Separación entre estancia, limpieza, vacío y standby.'],
                ['Tarifa y potencia', 'P1/P2/P3, término fijo y picos reales.'],
                ['Acción aprobable', 'Ahorro, riesgo, responsable y estado de revisión.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[16px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
                  <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-24 md:py-32" style={{ borderTop: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 className="rv mb-10 text-center font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05]" style={{ color: 'var(--color-ink)' }}>
              Preguntas frecuentes
            </h2>
            <dl className="rv space-y-6">
              {faqs.map(([q, a]) => (
                <div key={q} className="rounded-[16px] p-6" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
                  <dt className="font-display text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>{q}</dt>
                  <dd className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-5 py-24 text-center md:py-32" style={{ background: 'var(--color-bark)', color: 'var(--color-sheet-white)' }}>
          <div className="mx-auto max-w-3xl">
            <h2 className="rv font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.02]">¿Listo para calcular tu ahorro real?</h2>
            <p className="rv mt-5 text-base leading-relaxed" style={{ color: 'var(--color-muted-slate)' }}>Solicita un diagnóstico gratuito de tu cartera. Sin compromiso, sin tarjeta ni promesas de ahorro garantizado.</p>
            <div className="rv mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="mailto:hola@tramo.energy" className="inline-flex h-12 items-center gap-2 rounded-[8px] px-8 font-display text-sm font-semibold tracking-[0.01em]" style={{ background: 'var(--color-cream-paper)', color: 'var(--color-bark)' }}>Solicitar diagnóstico <ArrowRight className="h-4 w-4" /></a>
              <a href="/app/dashboard" className="inline-flex h-12 items-center gap-2 rounded-[8px] border px-8 font-display text-sm font-semibold tracking-[0.01em]" style={{ borderColor: 'var(--color-canopy-border)', color: 'var(--color-sheet-white)' }}>Ver dashboard demo <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-5 py-12" style={{ borderTop: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="/" className="font-display text-lg font-semibold" style={{ color: 'var(--color-bark)' }}>Tramo</a>
            <div className="flex gap-6 text-xs" style={{ color: 'var(--color-muted-slate)' }}>
              <a href="/" className="hover:text-[var(--color-bark)]">Landing</a>
              <a href="/#precios" className="hover:text-[var(--color-bark)]">Precios</a>
              <a href="mailto:hola@tramo.energy" className="hover:text-[var(--color-bark)]">Contacto</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
