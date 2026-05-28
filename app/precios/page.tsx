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
      <ArrowRight className="absolute h-4 w-4 translate-x-0 scale-100 opacity-100 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-2 group-hover:scale-0 group-hover:opacity-0" />
      <ArrowRight className="absolute h-4 w-4 -translate-x-2 scale-0 opacity-0 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
    </span>
  );
}

function ScaleBarBtn({ href, variant = 'solid', className = '', children }: { href: string; variant?: 'solid' | 'outline'; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={`group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 font-display text-sm font-semibold leading-none tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-300 active:translate-y-px ${className}`}
      style={{ background: variant === 'solid' ? cssVar('--color-ink') : 'transparent', color: variant === 'solid' ? cssVar('--color-surface') : cssVar('--color-ink'), border: variant === 'solid' ? '1px solid transparent' : `1px solid ${cssVar('--color-ink')}` }}>
      <span className="pointer-events-none absolute inset-x-0 -inset-y-4 flex items-center justify-center">
        {BAR_DELAYS.map((delay, i) => (<span key={i} className="h-full flex-[0_0_3px] origin-bottom scale-y-0 rounded-sm transition-transform duration-300 group-hover:scale-y-100"
          style={{ background: variant === 'solid' ? cssVar('--color-accent') : cssVar('--color-border-strong'), transitionDelay: `${delay}ms` }} />))}
      </span>
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
    </a>
  );
}

function TextCta({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} className="group inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.01em] text-[var(--color-accent)]"><span>{children}</span><ArrowSwap /></a>;
}

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { name: 'Starter', range: [10, 24], priceMin: 150, priceMax: 250, savingPer: 1200, cta: 'Diagnosticar mi cartera' },
  { name: 'Professional', range: [25, 49], priceMin: 300, priceMax: 500, savingPer: 3000, cta: 'Diagnosticar mi cartera', highlight: true },
  { name: 'Enterprise', range: [50, 99], priceMin: 500, priceMax: 750, savingPer: 6000, cta: 'Diagnosticar mi cartera' },
  { name: 'Scale', range: [100, Infinity], priceMin: 750, priceMax: 1250, savingPer: 12000, cta: 'Hablar con ventas' },
];

const faqs = [
  ['¿Hay permanencia?', 'No. Todos los planes son mensuales sin compromiso de permanencia.'],
  ['¿Qué incluye el piloto gratuito?', 'Diagnóstico completo de tu cartera con datos reales, sin configuración técnica y sin necesidad de tarjeta.'],
  ['¿Los sensores son obligatorios?', 'No. El diagnóstico inicial funciona sin hardware. Los sensores Shelly son opcionales para control en tiempo real.'],
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
  const ratio = (apts - tier.range[0]) / ((tier.range[1] === Infinity ? 200 : tier.range[1]) - tier.range[0]);
  const monthlyPrice = Math.round((tier.priceMin + ratio * (tier.priceMax - tier.priceMin)) / 5) * 5;

  const baseSaving = Math.round(apts * 60);
  const sensorSaving = withSensors ? Math.round(apts * 80) : 0;
  const batterySaving = withBattery ? Math.round(apts * 35) : 0;
  const totalSaving = baseSaving + sensorSaving + batterySaving;

  const sensorCost = withSensors ? apts * 300 : 0;
  const batteryCost = withBattery ? 5500 : 0;
  const totalUpfront = sensorCost + batteryCost;
  const roiMonths = totalSaving > 0 ? Math.round((totalUpfront / (totalSaving / 12)) * 10) / 10 : 0;

  const savingRef = useRef<HTMLSpanElement>(null);
  useCountUp(savingRef, totalSaving);

  return (
    <>
      <style>{`
        @keyframes rv{from{opacity:0;translate:0 28px}to{opacity:1;translate:0 0}}
        .rv{animation:rv .7s cubic-bezier(0.36,0,0.114,0.92) both}
        @media(prefers-reduced-motion:reduce){.rv{animation:none!important;opacity:1!important}}
      `}</style>

      <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
        {/* Hero */}
        <section className="px-5 pb-20 pt-24 text-center md:pb-28 md:pt-32">
          <div className="mx-auto max-w-4xl">
            <p className="rv mb-4 inline-block rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-ink)]">
              Precios transparentes
            </p>
            <h1 className="rv mx-auto max-w-4xl font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              Calcula tu ahorro antes de decidir.
            </h1>
            <p className="rv mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
              Todos los planes incluyen piloto gratuito, sin permanencia ni tarjeta. El ahorro estimado supera el coste en todos los tramos.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="rv rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Calculadora de ahorro</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">Ajusta los parámetros de tu cartera para ver el ahorro estimado anual.</p>

              <div className="mt-8 space-y-6">
                {/* Slider */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Nº de apartamentos</label>
                    <span className="font-mono text-2xl font-semibold text-[var(--color-ink)]">{apts}</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={200}
                    value={apts}
                    onChange={e => setApts(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-surface-alt)] accent-[var(--color-accent)]"
                  />
                  <div className="mt-1 flex justify-between font-mono text-xs text-[var(--color-muted)]">
                    <span>5</span><span>200</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setWithSensors(!withSensors)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${withSensors ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]' : 'border-[var(--color-border)] bg-[var(--color-surface)]'}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${withSensors ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-surface-alt)]'}`}>
                      <PlugZap className={`h-5 w-5 ${withSensors ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`} />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-[var(--color-ink)]">Sensores Shelly</p>
                      <p className="text-xs text-[var(--color-muted)]">+300 €/apt · +80 €/año ahorro</p>
                    </div>
                    <span className={`ml-auto font-mono text-sm font-semibold ${withSensors ? 'text-[var(--color-accent-ink)]' : 'text-[var(--color-muted)]'}`}>{withSensors ? 'ON' : 'OFF'}</span>
                  </button>
                  <button
                    onClick={() => setWithBattery(!withBattery)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${withBattery ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]' : 'border-[var(--color-border)] bg-[var(--color-surface)]'}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${withBattery ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-surface-alt)]'}`}>
                      <BatteryCharging className={`h-5 w-5 ${withBattery ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`} />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-[var(--color-ink)]">Batería Huawei Luna</p>
                      <p className="text-xs text-[var(--color-muted)]">5.500 € · 350-700 €/año ahorro</p>
                    </div>
                    <span className={`ml-auto font-mono text-sm font-semibold ${withBattery ? 'text-[var(--color-accent-ink)]' : 'text-[var(--color-muted)]'}`}>{withBattery ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                {/* Results */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-[var(--color-surface)] p-4 text-center border border-[var(--color-border)]">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Plan</p>
                    <p className="mt-2 font-display text-xl font-semibold text-[var(--color-ink)]">{tier.name}</p>
                    <p className="mt-2 font-mono text-sm text-[var(--color-muted)]">{monthlyPrice} €/mes</p>
                  </div>
                  <div className="rounded-xl bg-[var(--color-ink)] p-4 text-center">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-soft)]">Ahorro anual</p>
                    <p className="mt-2 font-mono text-3xl font-semibold text-[var(--color-accent)]">
                      <span ref={savingRef}>{totalSaving.toLocaleString('es-ES')}</span>
                      <span className="text-lg"> €</span>
                    </p>
                  </div>
                  <div className="rounded-xl bg-[var(--color-surface)] p-4 text-center border border-[var(--color-border)]">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Inversión inicial</p>
                    <p className="mt-2 font-mono text-xl font-semibold text-[var(--color-ink)]">{totalUpfront > 0 ? `${totalUpfront.toLocaleString('es-ES')} €` : '0 €'}</p>
                    {roiMonths > 0 && <p className="mt-1 text-xs text-[var(--color-muted)]">ROI: {roiMonths} meses</p>}
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
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
                Planes para cada tamaño de cartera.
              </h2>
            </div>
            <div className="rv grid gap-4 md:grid-cols-4">
              {tiers.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-2xl border p-6 ${plan.highlight ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]' : 'border-[var(--color-border)] bg-[var(--color-surface)]'}`}
                >
                  <p className="font-display text-lg font-semibold text-[var(--color-ink)]">{plan.name}</p>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
                    {plan.range[1] === Infinity ? `${plan.range[0]}+` : `${plan.range[0]}-${plan.range[1]}`} apartamentos
                  </p>
                  <p className="mt-5 font-mono text-sm text-[var(--color-muted)]">Desde</p>
                  <p className="font-mono text-2xl font-semibold text-[var(--color-ink)]">{plan.priceMin}-{plan.priceMax} €/mes</p>
                  <div className="mt-4 rounded-xl bg-[var(--color-accent-soft)] p-3">
                    <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-ink)]">Ahorro estimado</p>
                    <p className="mt-1 text-center font-mono text-xl font-semibold text-[var(--color-accent-ink)]">{plan.savingPer.toLocaleString('es-ES')} €/año</p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#calculadora"
                      className={`inline-flex h-10 w-full items-center justify-center rounded-lg font-display text-sm font-semibold tracking-[0.01em] transition-colors ${plan.highlight ? 'bg-[var(--color-ink)] text-[var(--color-accent)]' : 'border border-[var(--color-ink)] text-[var(--color-ink)]'}`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {['Piloto gratuito', 'Sin tarjeta', 'Sin permanencia', 'Dashboard completo', 'Informes por propietario', 'Alertas y reglas'].map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[var(--color-muted)]"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-accent)]" />{f}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <h2 className="rv mb-10 text-center font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
              Preguntas frecuentes
            </h2>
            <dl className="rv space-y-6">
              {faqs.map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                  <dt className="font-display text-lg font-semibold text-[var(--color-ink)]">{q}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[var(--color-ink)] px-5 py-24 text-center text-[var(--color-surface)] md:py-32">
          <div className="mx-auto max-w-3xl">
            <h2 className="rv font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.02]">¿Listo para calcular tu ahorro real?</h2>
            <p className="rv mt-5 text-base leading-relaxed text-[var(--color-data-muted)]">Solicita un diagnóstico gratuito de tu cartera. Sin compromiso, sin tarjeta.</p>
            <div className="rv mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="mailto:hola@tramo.energy" className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--color-accent)] px-8 font-display text-sm font-semibold tracking-[0.01em] text-[var(--color-ink)]">Solicitar diagnóstico <ArrowRight className="h-4 w-4" /></a>
              <a href="/#dashboard" className="inline-flex h-12 items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.2)] px-8 font-display text-sm font-semibold tracking-[0.01em] text-[var(--color-surface)]">Ver dashboard demo <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="/" className="font-display text-lg font-semibold text-[var(--color-ink)]">Tramo</a>
            <div className="flex gap-6 text-xs text-[var(--color-muted)]">
              <a href="/" className="hover:text-[var(--color-ink)]">Landing</a>
              <a href="/#precios" className="hover:text-[var(--color-ink)]">Precios</a>
              <a href="mailto:hola@tramo.energy" className="hover:text-[var(--color-ink)]">Contacto</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
