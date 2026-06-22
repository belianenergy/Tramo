'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight, CheckCircle2, Menu, X, Zap, Gauge,
  Activity, TrendingDown, Clock, BatteryCharging,
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Vignelli palette ── */
const green = '#0F7B5A';
const ink = '#1A1A2E';
const muted = '#6B7280';
const dim = '#9CA3AF';
const borderColor = '#E5E7EB';
const bg = '#FAFAFA';
const white = '#FFFFFF';

/* ── Reusable atoms ── */

function Section({ children, className = '', id, style: sectionStyle }: {
  children: ReactNode; className?: string; id?: string; style?: React.CSSProperties;
}) {
  return (
    <section id={id} className={`relative px-5 py-16 md:py-24 ${className}`}>
      <div className="relative mx-auto" style={{ maxWidth: '1200px', ...sectionStyle }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: green }}>{children}</p>;
}

function Head({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[0.92] tracking-[-0.06em] ${className}`}
      style={{ color: ink }}>{children}</h2>
  );
}

function Rule() {
  return <div className="h-px w-full" style={{ background: `${ink}16` }} />;
}

function CTA({ href, children, primary = true }: {
  href: string; children: ReactNode; primary?: boolean;
}) {
  return (
    <a href={href}
      className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-[6px] text-[15px] font-medium transition-all duration-200 active:translate-y-px ${
        primary
          ? 'text-white hover:bg-[#0C6348]'
          : 'bg-white/70 border hover:bg-white'
      }`}
      style={primary
        ? { background: green }
        : { borderColor, color: ink }}
    >
      {children}
      {primary && <ArrowRight className="h-4 w-4" />}
    </a>
  );
}

/* ── GSAP animations ── */
function ScrollReveal() {
  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.from(el, {
          y: 22, opacity: 0.88, duration: 0.65, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal-section]').forEach(el => {
        gsap.from(el, {
          y: 14, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}

/* ── Nav (Vignelli-style) ── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Sistema', '#sistema'],
    ['Decisión', '#decision'],
    ['Hardware', '#hardware'],
    ['Precios', '#precios'],
    ['FAQ', '#faq'],
  ];
  return (
    <>
      <nav className="sticky top-0 z-50 h-16 flex items-center px-5 bg-[#FAFAFA]/92 backdrop-blur-sm border-b" style={{ borderColor: `${ink}16` }}>
        <div className="mx-auto flex w-full items-center justify-between" style={{ maxWidth: '1200px' }}>
          <a href="/" className="font-display text-[20px] font-medium tracking-[-0.04em]" style={{ color: green }}>Tramo</a>
          <div className="hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href}
                className="font-mono text-[11px] uppercase tracking-[0.15em] transition-colors"
                style={{ color: muted }}
                onMouseEnter={e => e.currentTarget.style.color = green}
                onMouseLeave={e => e.currentTarget.style.color = muted}>
                {label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <a href="/app/dashboard" className="inline-flex min-h-[40px] items-center justify-center rounded-[6px] px-4 text-[13px] font-medium border" style={{ borderColor, color: ink }}>Demo</a>
            <a href="#diagnostico" className="inline-flex min-h-[40px] items-center justify-center rounded-[6px] px-5 text-[13px] font-medium text-white" style={{ background: green }}>Diagnosticar</a>
          </div>
          <button type="button" onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border md:hidden" style={{ borderColor }}
            aria-label="Abrir menú">
            <Menu className="h-5 w-5" style={{ color: ink }} />
          </button>
        </div>
      </nav>
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        style={{ background: bg }}>
        <div className="flex h-16 items-center justify-between px-6 border-b" style={{ borderColor: `${ink}16` }}>
          <a href="/" className="font-display text-[20px] font-medium tracking-[-0.04em]" style={{ color: green }}>Tramo</a>
          <button type="button" onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center" aria-label="Cerrar">
            <X className="h-5 w-5" style={{ color: ink }} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 pt-4">
          {[...links, ['Dashboard demo', '/app/dashboard']].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="rounded-[8px] px-4 py-3 font-display text-[18px] font-light" style={{ color: ink }}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

/* ── Hero (current landing's interactive visual, Vignelli styling) ── */
const heroAppliances = [
  { key: 'clima', label: 'Clima', icon: Gauge, value: 42, cost: '+118 €', x: 32, y: 21, note: 'A/C activo 6h tras checkout' },
  { key: 'tv', label: 'TV', icon: Activity, value: 19, cost: '+36 €', x: 31, y: 47, note: 'Standby alto en salón' },
  { key: 'cocina', label: 'Cocina', icon: Zap, value: 33, cost: '+82 €', x: 53, y: 45, note: 'Pico en P1 fuera de reserva' },
  { key: 'nevera', label: 'Nevera', icon: BatteryCharging, value: 51, cost: '+154 €', x: 64, y: 41, note: 'Compresor con ciclo anómalo' },
  { key: 'acs', label: 'ACS', icon: Zap, value: 46, cost: '+126 €', x: 82, y: 28, note: 'Termo calentando sin huésped' },
  { key: 'lavadora', label: 'Lavadora', icon: Zap, value: 27, cost: '+58 €', x: 83, y: 64, note: 'Uso repetido en tarifa punta' },
];

function HeroVisual() {
  const [active, setActive] = useState(3);
  const ref = useRef<HTMLDivElement>(null);
  const selected = heroAppliances[active];

  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-scene]', { scale: 0.985, opacity: 0.92, duration: 0.9 });
      tl.from('[data-consumption-symbol]', { y: 16, scale: 0.72, opacity: 0, stagger: 0.07, duration: 0.55 }, '-=0.45');
      tl.from('[data-platform-overlay]', { y: 18, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.35');
      tl.from('.hero-mini-bar', { scaleY: 0, transformOrigin: 'bottom', stagger: 0.05, duration: 0.45 }, '-=0.4');
      gsap.to('[data-consumption-symbol]', {
        y: -5, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.16, from: 'random' },
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <div ref={ref} className="relative w-full max-w-[660px] pt-4 pb-16 sm:pt-10 sm:pb-20">
      <div className="absolute -inset-6 -z-10 rounded-[42px]"
        style={{ background: 'radial-gradient(circle at 70% 18%, rgba(15,123,90,0.12), transparent 34%), radial-gradient(circle at 18% 78%, rgba(15,123,90,0.10), transparent 36%)', filter: 'blur(2rem)' }} />
      <div data-hero-scene className="relative rounded-[32px]">
        <div className="relative overflow-hidden rounded-[32px]">
          <img src="/images/hero-apartment-energy.png" alt="Apartamento turístico con dispositivos conectados a Tramo"
            className="block aspect-[4/3] w-full object-cover" style={{ mixBlendMode: 'multiply' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 44%, rgba(255,255,255,0.28) 100%)' }} />
        </div>
        {heroAppliances.map((item, i) => {
          const Icon = item.icon;
          return (
            <button key={item.key} type="button" data-consumption-symbol
              onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
              className="group absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ left: `${item.x}%`, top: `${item.y}%`, '--tw-ring-color': green } as React.CSSProperties}
              aria-label={`${item.label}: ${item.note}`}>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/75 bg-white/76 shadow-md backdrop-blur-md transition-all duration-300 group-hover:scale-110 sm:h-10 sm:w-10 md:h-12 md:w-12"
                style={{ color: green, boxShadow: i === active ? `0 0 0 6px ${green}22` : undefined }}>
                <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.2} />
              </span>
            </button>
          );
        })}
        <div data-platform-overlay className="absolute -bottom-[76px] left-4 z-20 w-[34%] min-w-[132px] rounded-[12px] border border-white/75 bg-white/78 p-2 shadow-md backdrop-blur-xl sm:-bottom-[82px] sm:left-5 sm:w-[28%] sm:min-w-[148px] sm:bg-white/82 sm:p-3">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: muted }}>Tramo live</p>
              <p className="mt-1 font-display text-[18px] font-light leading-none tabular-nums md:text-[24px]" style={{ color: ink }}>{selected.cost}</p>
            </div>
            <span className="hidden rounded-full px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white sm:inline-flex sm:text-[9px]" style={{ background: green }}>{selected.label}</span>
          </div>
          <p className="mt-1 hidden text-[11px] font-medium leading-snug md:block md:text-[12px]" style={{ color: muted }}>{selected.note}</p>
          <div className="mt-2 flex h-9 items-end gap-1 sm:mt-3 sm:h-12 sm:gap-1.5" aria-hidden="true">
            {heroAppliances.map((bar, i) => (
              <button key={bar.key} type="button"
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                className="hero-platform-bar flex flex-1 items-end rounded-t-[8px] outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2"
                style={{ '--tw-ring-color': green } as React.CSSProperties}
                aria-label={`${bar.label}: ${bar.value} kWh`}>
                <span className="hero-mini-bar block w-full rounded-t-[8px] rounded-b-[3px] transition-colors duration-300"
                  style={{ height: `${Math.min(36, Math.max(10, bar.value * 0.68))}px`, background: i === active ? green : `${green}52` }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-up]', { y: 28, stagger: 0.07, duration: 0.7 });
      tl.from('[data-hero-img]', { x: 20, scale: 0.97, duration: 0.8 }, '-=0.3');
      tl.to('[data-hero-img]', { x: 0, scale: 1, duration: 0.8 }, '-=0.8');
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative overflow-hidden px-5 pt-6 pb-6 md:pt-10 md:pb-10" style={{ background: bg }}>
      <div className="relative mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <Rule />
            <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: green }}>
              Energy margin operations
            </p>
            <h1 data-hero-up className="mt-4 font-display text-[clamp(2.4rem,5vw,4.8rem)] font-light leading-[0.92] tracking-[-0.05em]"
              style={{ color: ink }}>
              Convierte la energía de tu cartera en margen operativo.
            </h1>
            <p data-hero-up className="mt-5 max-w-md text-[16px] leading-relaxed md:text-[18px]"
              style={{ color: muted }}>
              Cruza reservas con CUPS y Datadis para detectar consumo fuera de estancia,
              activar reglas y preparar informes por propietario.
            </p>
            <div data-hero-up className="mt-7 flex flex-wrap items-center gap-3">
              <CTA href="#diagnostico">Diagnosticar mi cartera</CTA>
              <CTA href="/app/dashboard" primary={false}>Ver demo</CTA>
            </div>
          </div>
          <div data-hero-img className="relative flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3 md:mt-8">
          {[
            { value: 'Consumo fantasma', label: 'Detecta qué apartamento sigue gastando cuando no hay reserva.', icon: TrendingDown },
            { value: 'Ahorro priorizado', label: 'Ordena cada acción por impacto estimado antes de tocar nada.', icon: Clock },
            { value: 'Informe claro', label: 'Explica cada coste por apartamento, reserva y propietario.', icon: BatteryCharging },
          ].map((stat, i) => { const Icon = stat.icon; return (
            <div key={i} data-reveal className="flex items-center gap-3 rounded-[8px] p-4 md:gap-4 md:p-5"
              style={{ background: bg, border: `1px solid ${borderColor}` }}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-white border" style={{ borderColor: `${green}20` }}>
                <Icon className="h-5 w-5" style={{ color: green }} />
              </div>
              <div className="min-w-0">
                <p className="font-display text-[clamp(1.4rem,2.5vw,1.8rem)] font-light leading-none tabular-nums" style={{ color: ink }}>{stat.value}</p>
                <p className="mt-1 text-[12px] leading-snug" style={{ color: muted }}>{stat.label}</p>
              </div>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}

/* ── Sistema (Vignelli process grid) ── */
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

function Sistema() {
  return (
    <Section id="sistema" className="border-t border-b" style={{ borderColor: `${ink}10`, background: white }}>
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Eyebrow>Sistema</Eyebrow>
          <Head className="mt-5 max-w-[9ch]">Da lectura á acción.</Head>
          <div className="mt-8 space-y-6" data-reveal>
            {kpis.map(([val, text]) => (
              <div key={val} className="flex items-baseline gap-4">
                <span className="font-display text-[34px] font-light tracking-[-0.055em] tabular-nums" style={{ color: green }}>{val}</span>
                <span className="text-[13px] leading-relaxed" style={{ color: muted }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t" style={{ borderColor: ink }}>
          {processRows.map(([num, title, meta, body]) => (
            <div key={num} className="grid gap-4 border-b py-6 md:grid-cols-[70px_1fr_1.2fr] md:items-baseline"
              style={{ borderColor: `${ink}16` }}>
              <p className="font-mono text-[12px] font-semibold" style={{ color: green }}>{num}</p>
              <div>
                <h3 className="font-display text-[26px] font-light leading-none tracking-[-0.045em]" style={{ color: ink }}>{title}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: dim }}>{meta}</p>
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: muted }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Decisión (Vignelli grid) ── */
const decisions = [
  ['Standby', 'Detectar consumo permanente fóra de reserva.', 'Baixo custo, intervención inmediata.'],
  ['Clima', 'Axustar horarios segundo entrada, saída e temperatura.', 'Control operativo sen molestar ao hóspede.'],
  ['Tarifa', 'Cruzar consumo con períodos 2.0TD/3.0TD.', 'Cambio contractual cando hai evidencia.'],
  ['Batería', 'Simular arbitraxe OMIE con curva real.', 'Só como escenario premium, nunca como promesa.'],
];

function Decision() {
  return (
    <Section id="decision">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <Rule />
          <Eyebrow className="mt-6">Decisión con datos</Eyebrow>
          <Head className="mt-5 max-w-[10ch]">Menos interface. Máis criterio.</Head>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed" style={{ color: muted }}>
            Tramo non che mostra máis números: dime que facer, canto aforra e por que.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[6px] border md:grid-cols-2"
          style={{ borderColor: `${ink}18`, background: `${ink}12` }}>
          {decisions.map(([title, body, foot]) => (
            <div key={title} className="p-6" style={{ background: white }}>
              <p className="font-display text-[28px] font-light tracking-[-0.05em]" style={{ color: ink }}>{title}</p>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: muted }}>{body}</p>
              <p className="mt-8 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.13em]"
                style={{ borderColor: `${ink}12`, color: green }}>{foot}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Hardware (Vignelli SVG flow + cards) ── */
function Hardware() {
  return (
    <Section id="hardware" className="border-y" style={{ borderColor: `${ink}10`, background: white }}>
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <Eyebrow>Hardware opcional</Eyebrow>
          <Head className="mt-5 max-w-[10ch]">Medir antes de instalar.</Head>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed" style={{ color: muted }}>
            Sensores e baterías son capacidades de Tramo, non o punto de partida.
            O software decide onde compensa engadilos.
          </p>
          <div className="mt-8 space-y-4" data-reveal>
            <div className="rounded-[6px] border p-5" style={{ borderColor: `${green}30` }}>
              <Eyebrow>Sensor</Eyebrow>
              <p className="mt-4 font-display text-[32px] font-light tracking-[-0.055em] tabular-nums" style={{ color: ink }}>
                ~300 € / apto instalado
              </p>
              <p className="mt-3 text-[13px] leading-relaxed" style={{ color: muted }}>
                Só cando a medición por circuito cambia a decisión.
              </p>
            </div>
            <div className="rounded-[6px] border p-5" style={{ borderColor: `${green}30` }}>
              <Eyebrow>Batería</Eyebrow>
              <p className="mt-4 font-display text-[32px] font-light tracking-[-0.055em] tabular-nums" style={{ color: ink }}>
                ~5.500 € / 10 kWh
              </p>
              <p className="mt-3 text-[13px] leading-relaxed" style={{ color: muted }}>
                Só con simulación prudente de arbitraxe e payback estimado de 4-7 anos.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-[6px] border p-5" style={{ borderColor: `${ink}18`, background: bg }}>
            <svg className="block aspect-[16/7] w-full" viewBox="0 0 1120 490" aria-hidden="true">
              <defs>
                <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill={green} />
                </marker>
              </defs>
              <rect x="24" y="24" width="1072" height="442" rx="8" fill={bg} stroke={ink} strokeOpacity="0.16" />
              {[110, 245, 380].map(y => (
                <line key={y} x1="80" y1={y} x2="1040" y2={y} stroke={ink} strokeOpacity="0.14" />
              ))}
              {[210, 500, 790].map(x => (
                <line key={x} x1={x} y1="68" x2={x} y2="422" stroke={ink} strokeOpacity="0.10" />
              ))}
              <path d="M210 245 H910" fill="none" stroke={green} strokeWidth="4" strokeLinecap="round" strokeDasharray="18 14" markerEnd="url(#arr)" />
              <path d="M790 245 C824 178 866 150 930 146" fill="none" stroke={green} strokeWidth="3" strokeLinecap="round" strokeDasharray="12 10" markerEnd="url(#arr)" />
              <path d="M790 245 C824 308 866 338 930 346" fill="none" stroke={green} strokeWidth="3" strokeLinecap="round" strokeDasharray="12 10" markerEnd="url(#arr)" />
              {[
                [210, 245, '01', 'MEDICIÓN'],
                [500, 245, '02', 'REGLA'],
                [790, 245, '03', 'DECISIÓN'],
                [958, 146, 'S', 'SENSOR'],
                [958, 346, 'B', 'BATERÍA'],
              ].map(([cx, cy, code, label]) => (
                <g key={`${code}-${label}`}>
                  <circle cx={cx} cy={cy} r="46" fill="white" stroke={ink} strokeOpacity="0.24" strokeWidth="2" />
                  <circle cx={cx} cy={cy} r="30" fill={(code as string) === 'S' || (code as string) === 'B' ? green : bg}
                    stroke={green} strokeWidth="2" />
                  <text x={cx as number} y={(cy as number) + 6} textAnchor="middle"
                    fill={(code as string) === 'S' || (code as string) === 'B' ? 'white' : green}
                    fontSize="18" fontWeight="700" fontFamily="JetBrains Mono, monospace">{code}</text>
                  <text x={cx as number} y={(cy as number) + 82} textAnchor="middle"
                    fill={ink} fontSize="15" fontWeight="700" letterSpacing="2">{label}</text>
                </g>
              ))}
              <text x="82" y="82" fill={green} fontSize="15" fontWeight="700" letterSpacing="3">CRITERIO OPERATIVO</text>
              <text x="82" y="432" fill={muted} fontSize="18">Se non hai marxe accionable, o fluxo remata sen hardware.</text>
            </svg>
          </div>
          <div data-reveal className="mt-5 rounded-[6px] border p-4" style={{ borderColor: `${green}30`, background: `${green}08` }}>
            <p className="flex items-center gap-2 text-[14px] leading-relaxed" style={{ color: muted }}>
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: green }} />
              Se o diagnóstico non encontra marxe, non recomendamos hardware. Simulación, non promesa.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Pricing (Vignelli clean) ── */
const plans = [
  ['Diagnóstico', 'desde 4 €/apto/mes', 'Para medir consumo, detectar perdas e priorizar accións.'],
  ['Operación', 'desde 9 €/apto/mes', 'Para alertas, regras, informes e seguimento por carteira.'],
  ['Portfolio', 'a medida', 'Para integradores, comunidades e carteiras con hardware opcional.'],
];

function Pricing() {
  return (
    <Section id="precios">
      <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>Precios</Eyebrow>
          <Head className="mt-5">Simple de auditar.</Head>
        </div>
        <p className="max-w-2xl text-[17px] leading-relaxed lg:pt-10" style={{ color: muted }}>
          Plans pensados para validar primeiro, operar despois e só escalar cando hai carteira suficiente.
          Piloto gratuito sen permanencia.
        </p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-[6px] border md:grid-cols-3"
        style={{ borderColor: `${ink}18`, background: `${ink}12` }}>
        {plans.map(([name, price, text]) => (
          <div key={name} className="p-6" style={{ background: white }}>
            <p className="font-display text-[28px] font-light tracking-[-0.05em]" style={{ color: ink }}>{name}</p>
            <p className="mt-7 font-mono text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: green }}>{price}</p>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: muted }}>{text}</p>
            <a href="#diagnostico"
              className="mt-5 inline-flex min-h-[40px] w-full items-center justify-center rounded-[6px] text-[13px] font-medium transition-colors border"
              style={{ borderColor: green, color: green }}>
              Solicitar diagnóstico
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── FAQ ── */
const faqs = [
  { q: '¿Qué necesito para empezar?', a: 'Acceso de solo lectura a tu contador (Datadis) y una integración con tu PMS. El diagnóstico inicial es gratuito.' },
  { q: '¿Funciona con mi gestoría actual?', a: 'Sí. Tramo se integra con cualquier PMS del mercado y con los contadores digitales de Datadis.' },
  { q: '¿Cuánto se tarda en ver resultados?', a: 'Los primeros patrones aparecen en 14 días con suficiente curva de consumo y reservas.' },
  { q: '¿Hay permanencia?', a: 'Facturación mensual sin permanencia. El primer mes es gratuito durante el piloto.' },
];

function FAQ() {
  return (
    <Section id="faq">
      <div className="mx-auto" style={{ maxWidth: '36rem' }}>
        <Head className="text-center">Respuestas directas.</Head>
        <div className="mt-10 space-y-2">
          {faqs.map((faq) => (
            <details key={faq.q} name="tramo-faq-h"
              className="group rounded-[6px] overflow-hidden border" style={{ borderColor, background: white }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
                style={{ color: ink }}
                onMouseEnter={e => { e.currentTarget.style.background = `${green}08`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                <span className="font-display text-[15px] font-medium">{faq.q}</span>
                <span className="text-lg transition-transform duration-200 group-open:rotate-45" style={{ color: dim }}>+</span>
              </summary>
              <div className="px-5 pb-4 text-[14px] leading-relaxed" style={{ color: muted }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Diagnostic form ── */
function DiagnosticForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fallbackHref, setFallbackHref] = useState('mailto:hola@tramo.energy?subject=Diagnóstico%20Tramo');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent('Diagnóstico Tramo');
    const body = encodeURIComponent(
      `Hola, quiero solicitar un diagnóstico Tramo.\n\nNombre: ${data.name || ''}\nEmail: ${data.email || ''}\nGestora: ${data.company || ''}\nApartamentos: ${data.apartments || ''}`,
    );
    setFallbackHref(`mailto:hola@tramo.energy?subject=${subject}&body=${body}`);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Lead API ${res.status}`);
      setStatus('sent');
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof DOMException && error.name === 'AbortError'
        ? 'La conexión tardó demasiado. Puedes enviarlo por email.'
        : 'No se pudo enviar automáticamente.');
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <section id="diagnostico" className="px-5 py-16 md:py-24" style={{ scrollMarginTop: '80px', background: green }}>
      <div className="relative mx-auto text-white" style={{ maxWidth: '36rem' }}>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Diagnóstico gratuito
        </p>
        <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[0.92] tracking-[-0.06em]">
          Diagnosticar antes de decidir.
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
          14 días. Solo lectura. Sin compromiso.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required placeholder="Nombre"
              className="w-full min-h-[48px] rounded-[6px] px-4 text-[15px] border bg-white/18 text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
            <input name="email" type="email" required placeholder="Email profesional"
              className="w-full min-h-[48px] rounded-[6px] px-4 text-[15px] border bg-white/18 text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="company" placeholder="Nombre de la gestora"
              className="w-full min-h-[48px] rounded-[6px] px-4 text-[15px] border bg-white/18 text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
            <input name="apartments" type="number" placeholder="Nº de apartamentos"
              className="w-full min-h-[48px] rounded-[6px] px-4 text-[15px] border bg-white/18 text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
          </div>
          <div aria-live="polite" role="status" className="min-h-[3lh]">
            {status === 'sent' && (
              <p className="rounded-[6px] p-3 text-[14px] font-medium" style={{ background: 'rgba(255,255,255,0.10)' }}>
                ✅ Solicitud recibida. Te respondemos con una propuesta de diagnóstico.
              </p>
            )}
            {status === 'error' && (
              <div className="rounded-[6px] p-3 text-[14px] font-medium" style={{ background: 'rgba(255,255,255,0.10)' }}>
                <p>❌ {errorMessage || 'No se pudo enviar.'}</p>
                <a href={fallbackHref} className="mt-2 inline-flex underline underline-offset-4 hover:opacity-80">
                  Abrir email preparado
                </a>
              </div>
            )}
          </div>
          <button type="submit" disabled={status === 'sending'}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[6px] px-6 text-[15px] font-medium bg-white disabled:opacity-60 transition-all duration-200"
            style={{ color: green }}>
            {status === 'sending' ? 'Enviando...' : 'Solicitar diagnóstico'}
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-center text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Sin compromiso. Tus datos solo se usan para preparar el diagnóstico.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const links = [
    ['Sistema', '#sistema'],
    ['Decisión', '#decision'],
    ['Hardware', '#hardware'],
    ['Precios', '#precios'],
    ['FAQ', '#faq'],
  ];
  return (
    <footer className="px-5 py-12" style={{ background: '#0A5E45', color: 'white' }}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Tramo · Energy margin operations
            </p>
            <p className="mt-4 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-light leading-[1.08] max-w-[18ch]"
              style={{ letterSpacing: '-0.03em' }}>
              Energía controlada. Cartera más rentable.
            </p>
          </div>
          <p className="text-[14px] leading-relaxed lg:text-right" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Diagnóstico, decisiones e informes para gestores de apartamentos turísticos en España.
          </p>
        </div>
        <div className="mt-10 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Tramo es una herramienta de diagnóstico y recomendación. Las cifras de ahorro son estimaciones
            basadas en datos de consumo y tarifas reales durante el piloto. No se garantizan resultados específicos.
            Los precios son orientativos antes de impuestos. Los sensores y baterías son capacidades opcionales
            recomendadas solo cuando el diagnóstico previo lo justifica.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-4 pt-6 border-t md:flex-row md:items-center md:justify-between"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map(([label, href]) => (
              <a key={href} href={href}
                className="text-[13px] hover:opacity-70 transition-opacity">{label}</a>
            ))}
          </nav>
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} Tramo
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Mobile CTA ── */
function MobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}>
      <div className="pointer-events-none absolute -top-8 inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
      <div className="relative px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-2">
        <a href="#diagnostico"
          className="flex w-full items-center justify-center gap-2 min-h-[48px] rounded-[8px] font-display text-[15px] font-medium text-white shadow-lg pointer-events-auto"
          style={{ background: green }}>
          Diagnosticar mi cartera <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function HibridoPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ background: bg, color: ink }}>
      <ScrollReveal />
      <Nav />
      <Hero />
      <Sistema />
      <Decision />
      <Hardware />
      <Pricing />
      <FAQ />
      <DiagnosticForm />
      <Footer />
      <MobileCTA />
    </main>
  );
}
