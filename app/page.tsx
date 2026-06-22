'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight, CheckCircle2, FileText, Gauge, Menu, X, Zap,
  Activity, TrendingDown, Clock, BatteryCharging,
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Disciplined accent scale: primary + one warm operational warning ── */
const accents = {
  amber:  'var(--color-status-warning)',
  blue:   'var(--color-primary)',
  violet: 'var(--color-primary-hover)',
  rose:   'var(--color-status-danger)',
  teal:   'var(--color-primary)',
  orange: 'var(--color-status-warning)',
};

/* ── Helpers ── */

function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable) return;
      if (event.key.toLowerCase() === 'g') setVisible((current) => !current);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div className="tramo-grid-overlay" data-active={visible ? 'true' : 'false'} aria-hidden="true" />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="fixed bottom-3 right-3 z-[9999] hidden min-h-11 min-w-11 rounded-[8px] border border-[var(--color-border)] bg-white/80 px-3 font-mono text-[14px] font-semibold text-[var(--color-gray)] opacity-25 backdrop-blur transition-colors hover:text-[var(--color-primary)] focus:opacity-100 active:opacity-100 md:bottom-24 md:left-4 md:right-auto md:inline-flex md:bg-white/90 md:opacity-100 items-center justify-center"
        aria-pressed={visible}
        aria-label="Mostrar u ocultar retícula de 12 columnas y baseline"
      >
        G
      </button>
    </>
  );
}

function Section({ children, className = '', id, refProp, style }: {
  children: ReactNode; className?: string; id?: string;
  refProp?: React.Ref<HTMLElement>; style?: React.CSSProperties;
}) {
  return (
    <section ref={refProp} id={id} data-gsap-section className={`relative px-[var(--grid-gutter)] py-10 md:py-20 ${className}`} style={style}>
      <div className="relative mx-auto tramo-grid" style={{ maxWidth: 'var(--page-max)' }}>{children}</div>
    </section>
  );
}

function SectionHeading({ children, className = '', eyebrow }: {
  children: ReactNode; className?: string; eyebrow?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.12em] mb-3 text-[var(--color-primary)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-light leading-[1.12] text-[var(--color-dark)]"
        style={{ letterSpacing: '-0.025em', textWrap: 'balance', minWidth: 0, overflowWrap: 'anywhere' }}>
        {children}
      </h2>
    </div>
  );
}

function CtaButton({ href, children, variant = 'primary', className = '' }: {
  href: string; children: ReactNode; variant?: 'primary' | 'ghost'; className?: string;
}) {
  const base = variant === 'primary'
    ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]'
    : 'border border-[var(--color-border)] bg-white/70 text-[var(--color-dark)] hover:border-[var(--color-primary)] hover:bg-white hover:text-[var(--color-primary)]';
  return (
    <a href={href}
      className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-[8px] font-display text-[15px] font-medium transition-all duration-200 active:translate-y-px ${base} ${className}`}>
      <span>{children}</span>
      {variant === 'primary' && <ArrowRight className="h-4 w-4" />}
    </a>
  );
}

/* ── Nav ── */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="sticky top-0 z-50 h-[64px] flex items-center px-[var(--grid-gutter)] bg-[var(--color-bg)] border-b border-[var(--color-border)]"
        aria-label="Navegación principal">
        <div className="mx-auto flex w-full items-center justify-between" style={{ maxWidth: 'var(--page-max)' }}>
          <a href="/" className="font-display text-[20px] font-medium text-[var(--color-primary)]">Tramo</a>
          <div className="hidden items-center gap-6 lg:flex lg:gap-6">
            {[
              ['Cómo funciona', '#como-funciona'],
              ['Problema', '#producto'],
              ['Hardware', '#hardware'],
              ['Precios', '#precios'],
              ['FAQ', '#faq'],
            ].map(([label, href]) => (
              <a key={href} href={href}
                className="inline-flex min-h-[44px] items-center text-[14px] font-medium text-[var(--color-gray)] hover:text-[var(--color-primary)] transition-colors duration-200">
                {label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <a href="/app/dashboard"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] px-4 text-[14px] font-medium border border-[var(--color-border)] text-[var(--color-dark)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-200">
              Demo
            </a>
            <a href="#diagnostico"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] px-6 text-[14px] font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] transition-colors duration-200">
              Diagnosticar
            </a>
          </div>
          <button type="button" onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--color-border)] lg:hidden"
            aria-label="Abrir menú">
            <Menu className="h-5 w-5 text-[var(--color-dark)]" />
          </button>
        </div>
      </nav>
      <div className={`fixed inset-0 z-50 bg-[var(--color-bg)] transition-all duration-300 ${
        open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="flex h-[64px] items-center justify-between px-6 border-b border-[var(--color-border)]">
          <a href="/" className="font-display text-[20px] font-medium text-[var(--color-primary)]">Tramo</a>
          <button type="button" onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[8px]" aria-label="Cerrar">
            <X className="h-5 w-5 text-[var(--color-dark)]" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 pt-4">
          {[
            ['Cómo funciona', '#como-funciona'],
            ['Problema', '#producto'],
            ['Hardware', '#hardware'],
            ['Precios', '#precios'],
            ['FAQ', '#faq'],
            ['Dashboard demo', '/app/dashboard'],
          ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                className="rounded-[16px] px-4 py-3 font-display text-[18px] font-light text-[var(--color-dark)] hover:bg-[var(--color-primary-subtle)] transition-colors duration-200">
                {label}
              </a>
            ))}
        </nav>
      </div>
    </>
  );
}

/* ── Hero ── */

function LandingGSAP() {
  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-gsap-section]').forEach((section) => {
        const targets = section.querySelectorAll('.gsap-reveal, h1, h2, h3, .stat-card, .pricing-card, details, form, [data-gsap-item]');
        gsap.from(targets, {
          y: 26,
          opacity: 0.88,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-gsap-section]').forEach((section) => {
        gsap.from(section, {
          y: 18,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 88%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}

const heroAppliances = [
  { key: 'clima', label: 'Clima', icon: Gauge, value: 42, cost: '+118 €', x: 32, y: 21, color: 'var(--color-primary)', hover: accents.blue, note: 'A/C activo 6h tras checkout' },
  { key: 'tv', label: 'TV', icon: Activity, value: 19, cost: '+36 €', x: 31, y: 47, color: accents.teal, hover: accents.rose, note: 'Standby alto en salón' },
  { key: 'cocina', label: 'Cocina', icon: Zap, value: 33, cost: '+82 €', x: 53, y: 45, color: accents.amber, hover: accents.orange, note: 'Pico en P1 fuera de reserva' },
  { key: 'nevera', label: 'Nevera', icon: BatteryCharging, value: 51, cost: '+154 €', x: 64, y: 41, color: 'var(--color-primary)', hover: accents.violet, note: 'Compresor con ciclo anómalo' },
  { key: 'acs', label: 'ACS', icon: Zap, value: 46, cost: '+126 €', x: 82, y: 28, color: accents.teal, hover: accents.blue, note: 'Termo calentando sin huésped' },
  { key: 'lavadora', label: 'Lavadora', icon: Zap, value: 27, cost: '+58 €', x: 83, y: 64, color: accents.amber, hover: accents.orange, note: 'Uso repetido en tarifa punta' },
];

function PlatformHeroVisual() {
  const [active, setActive] = useState(3);
  const ref = useRef<HTMLDivElement>(null);
  const selected = heroAppliances[active];

  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-scene]', { y: 14, scale: 0.985, duration: 0.75 });
      tl.from('[data-consumption-symbol]', { y: 12, scale: 0.8, stagger: 0.06, duration: 0.45 }, '-=0.35');
      tl.from('[data-platform-overlay]', { y: 14, duration: 0.5 }, '-=0.25');
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const loopSteps = [
    ['01', 'Reserva', 'Checkout A-14 confirmado'],
    ['02', 'Datadis', `${selected.value} kWh sin estancia`],
    ['03', 'Regla', `Acción: ${selected.label.toLowerCase()}`],
    ['04', 'Informe', 'Explicación para propietario'],
  ];

  return (
    <div ref={ref} className="relative mx-auto w-full min-w-0" style={{ maxWidth: 'min(700px, calc(100vw - 32px))' }}>
      <div data-hero-scene className="min-w-0 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-dark)] p-3 shadow-[0_26px_80px_-42px_rgba(15,23,42,0.85)] md:rounded-[28px] md:p-4">
        <div className="flex min-w-0 items-center justify-between gap-3 border-b border-white/14 pb-3 text-white">
          <div className="min-w-0">
            <p className="max-w-[24ch] font-mono text-[14px] font-semibold uppercase tracking-[0.06em] text-white/70">Demo operativa · cartera real</p>
            <p className="mt-1 max-w-[24ch] font-display text-[19px] font-light leading-tight text-white md:text-[24px]">Apto A-14 · checkout terminado</p>
          </div>
          <div className="hidden shrink-0 rounded-full bg-white px-3 py-2 font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--color-dark)] sm:inline-flex">
            11:42 · P1
          </div>
        </div>

        <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative min-h-[220px] overflow-hidden rounded-[18px] border border-white/12 bg-white sm:min-h-[260px] md:min-h-[340px] md:rounded-[22px]">
            <Image
              src="/images/hero-apartment-energy.webp"
              alt="Apartamento turístico con puntos de consumo detectados por Tramo"
              width={1449}
              height={1086}
              sizes="(min-width: 1024px) 360px, 100vw"
              priority
              className="h-full w-full object-cover"
              style={{ opacity: 0.82 }}
            />
            <div className="absolute left-3 top-3 max-w-[calc(100%-24px)] rounded-[12px] bg-white px-3 py-2 shadow-[0_16px_34px_-24px_rgba(15,23,42,0.75)]">
              <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray)]">Consumo fuera</p>
              <p className="mt-1 font-display text-[24px] font-light leading-none text-[var(--color-dark)] tabular-nums">51 kWh</p>
            </div>

            {heroAppliances.map((item, i) => {
              const Icon = item.icon;
              const isActive = i === active;
              const color = isActive ? item.hover : 'var(--color-dark)';
              return (
                <button
                  key={item.key}
                  type="button"
                  data-consumption-symbol
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  aria-label={`${item.label}: ${item.note}`}
                >
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-dark)]/10 bg-white text-[var(--color-dark)] shadow-[0_16px_30px_-20px_rgba(15,23,42,0.85)] transition-transform duration-200 group-hover:scale-105 md:h-11 md:w-11"
                    style={{ color, boxShadow: isActive ? `0 0 0 5px rgba(15,123,90,0.18), 0 18px 38px -22px rgba(15,23,42,0.9)` : undefined }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                </button>
              );
            })}
          </div>

          <div data-platform-overlay className="min-w-0 rounded-[18px] bg-white p-4 text-[var(--color-dark)] md:rounded-[22px] md:p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="min-w-0">
                <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.10em] text-[var(--color-gray)]">Decisión Tramo</p>
                <h2 className="mt-2 font-display text-[26px] font-light leading-[1.05] text-[var(--color-dark)] md:text-[34px]">
                  Automatizar {selected.label.toLowerCase()}
                </h2>
              </div>
              <span className="w-fit rounded-full px-3 py-2 font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-white" style={{ background: selected.hover }}>
                Prioridad alta
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-3">
                <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray)]">Impacto</p>
                <p className="mt-2 font-display text-[28px] font-light leading-none tabular-nums" style={{ color: selected.hover }}>{selected.cost}</p>
              </div>
              <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-3">
                <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray)]">Energía</p>
                <p className="mt-2 font-display text-[28px] font-light leading-none text-[var(--color-dark)] tabular-nums">{selected.value} kWh</p>
              </div>
            </div>

            <p className="mt-4 text-[15px] font-medium leading-relaxed text-[var(--color-gray)]">
              {selected.note}. Se cruza la curva Datadis con reservas y se propone la regla antes de instalar hardware.
            </p>

            <div className="mt-4 rounded-[14px] border border-[var(--color-border)] p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray)]">Loop operativo</p>
                <p className="font-mono text-[14px] font-semibold text-[var(--color-dark)]">4 pasos</p>
              </div>
              <div className="mt-3 grid gap-2">
                {loopSteps.map(([step, title, detail]) => (
                  <div key={step} className="grid min-w-0 grid-cols-[28px_minmax(56px,68px)_minmax(0,1fr)] items-center gap-2 rounded-[10px] bg-[var(--color-bg-muted)] px-3 py-2">
                    <p className="font-mono text-[14px] font-semibold text-[var(--color-gray)]">{step}</p>
                    <p className="font-display text-[15px] font-medium leading-tight text-[var(--color-dark)]">{title}</p>
                    <p className="min-w-0 text-[14px] leading-tight text-[var(--color-gray)]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
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
      tl.fromTo('[data-anim="hero-up"]', { y: 28 },
        { y: 0, stagger: 0.07, duration: 0.7 });
      tl.fromTo('[data-anim="hero-img"]', { x: 20, scale: 0.97 },
        { x: 0, scale: 1, duration: 0.8 }, '-=0.3');
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="hero" data-gsap-section className="relative overflow-hidden px-[var(--grid-gutter)] pt-6 pb-6 md:pt-10 md:pb-10 bg-[var(--color-bg)]">
      <div className="relative mx-auto max-w-full overflow-x-clip tramo-grid" style={{ maxWidth: 'var(--page-max)' }}>
        <div className="col-span-full grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:pr-6">
            <h1 data-anim="hero-up"
              className="font-display text-[clamp(2.1rem,5vw,3.8rem)] font-light leading-[1.06] text-[var(--color-dark)]"
              style={{ letterSpacing: '-0.025em', textWrap: 'balance', minWidth: 0, maxWidth: '100%', overflowWrap: 'anywhere' }}>
              Convierte la energía de tu cartera turística en margen operativo.
            </h1>
            <p data-anim="hero-up" className="mt-6 max-w-md text-[15px] sm:text-[17px] leading-relaxed text-[var(--color-gray)]">
              Cruza reservas con CUPS y Datadis para detectar consumo fuera de estancia, activar reglas y preparar informes por propietario.
            </p>
            <div data-anim="hero-up" className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton href="#diagnostico">Diagnosticar mi cartera</CtaButton>
              <CtaButton href="/app/dashboard" variant="ghost">Ver demo</CtaButton>
            </div>
          </div>
          <div data-anim="hero-img" className="relative flex min-w-0 items-center justify-center lg:col-span-6">
            <PlatformHeroVisual />
          </div>
        </div>

        {/* Stats row — demo examples, labelled */}
        <div className="col-span-full mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 md:mt-8">
          {[
            { value: 'Consumo fantasma', label: 'Detecta qué apartamento sigue gastando cuando no hay reserva.', bg: '#fef3c7', color: accents.amber, icon: TrendingDown },
            { value: 'Ahorro priorizado', label: 'Ordena cada acción por impacto estimado antes de tocar nada.', bg: '#dbeafe', color: accents.blue, icon: Clock },
            { value: 'Informe claro', label: 'Explica cada coste por apartamento, reserva y propietario.', bg: '#dcfce7', color: 'var(--color-primary)', icon: BatteryCharging },
          ].map((stat, i) => { const Icon = stat.icon; return (
            <div key={i}
              className="stat-card flex items-center gap-4 rounded-[16px] p-4 md:gap-4 md:p-6"
              style={{ background: stat.bg }}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white">
                <Icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <div className="min-w-0">
                <p className="font-display text-[clamp(1.4rem,2.5vw,1.8rem)] font-light leading-none tabular-nums text-[var(--color-dark)]">{stat.value}</p>
                <p className="mt-1 text-[14px] leading-snug text-[var(--color-gray)]">{stat.label}</p>
                <p className="mt-2 inline-flex rounded-full bg-white/85 px-3 py-1 font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray)]">En el diagnóstico inicial</p>
              </div>
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works (tinted background) ── */

interface HowStep {
  step: string; title: string; body: string; metric: string; tag: string;
  color: string; chipBg: string;
}

const howSteps: HowStep[] = [
  { step: '01', title: 'Conecta tu cartera', body: 'CUPS, PMS y reservas en modo solo lectura.', metric: '24 h', tag: 'Sin instalación', color: 'var(--color-primary)', chipBg: 'var(--color-primary-subtle)' },
  { step: '02', title: 'Detectamos margen perdido', body: 'Cruzamos consumo, ocupación y periodos tarifarios.', metric: '14 días', tag: 'Curva real', color: accents.amber, chipBg: '#fef3c7' },
  { step: '03', title: 'Apruebas acciones', body: 'Recibes prioridad económica e informe por propietario.', metric: '€/mes', tag: 'Decisión diaria', color: accents.blue, chipBg: '#dbeafe' },
];

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.how-step', { y: 34, rotateX: -8 },
        { y: 0, rotateX: 0, stagger: 0.13, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
      gsap.fromTo('.how-rail-fill', { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power2.out', transformOrigin: 'left center',
          scrollTrigger: { trigger: ref.current, start: 'top 76%' } });
      gsap.to('.how-orbit', { rotate: 360, duration: 16, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="como-funciona" data-gsap-section className="relative overflow-hidden px-6 py-14 md:py-24 md:pb-28" style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, #ecfdf5 38%, #eff6ff 72%, var(--color-bg) 100%)', scrollMarginTop: '80px' }}>
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--color-primary-subtle)] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-80 w-80 rounded-full bg-[#dbeafe] blur-3xl" />
      <div className="mx-auto" style={{ maxWidth: 'var(--page-max)' }}>
        <div className="gsap-reveal mx-auto mb-12 max-w-2xl rounded-[24px] bg-white/55 px-4 py-6 text-center backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-0">
          <SectionHeading className="text-center" eyebrow="Cómo funciona">
            Del contador a la decisión, sin perderte en facturas.
          </SectionHeading>
          <p className="mt-4 text-[17px] font-medium leading-relaxed text-[var(--color-dark)] md:font-normal md:text-[var(--color-gray)]">
            Tres capas conectadas: lectura, análisis y acción. El cliente ve qué hacer, cuánto impacta y cómo explicarlo.
          </p>
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-4 lg:grid-cols-3">
            {howSteps.map((s, i) => (
              <div key={s.step} className="how-step group relative rounded-[22px] border border-white/70 bg-white/58 p-4 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/72 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="relative flex h-[94px] w-[94px] shrink-0 items-center justify-center md:h-[108px] md:w-[108px]">
                    <svg className="how-orbit absolute inset-0 h-full w-full" viewBox="0 0 120 120" aria-hidden="true">
                      <circle cx="60" cy="60" r="43" fill="none" stroke={s.color} strokeWidth="1.4" strokeDasharray="7 9" opacity="0.44" />
                      <circle cx="60" cy="17" r="4.8" fill={s.color} />
                    </svg>
                    <p className="relative z-10 font-display text-[38px] font-light leading-none tracking-[-0.06em] tabular-nums md:text-[44px]" style={{ color: s.color }}>{s.step}</p>
                  </div>
                  <div className="min-w-0 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full px-3 py-1 font-mono text-[14px] font-semibold uppercase tracking-[0.1em]" style={{ background: s.chipBg, color: s.color }}>{s.tag}</span>
                      <span className="font-mono text-[14px] font-semibold" style={{ color: s.color }}>{s.metric}</span>
                    </div>
                    <h3 className="mt-3 font-display text-[18px] font-medium leading-snug text-[var(--color-dark)]">{s.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-gray)]">{s.body}</p>
                  </div>
                </div>
                <div className="mt-4 h-px overflow-hidden rounded-full bg-white/80">
                  <span className="how-rail-fill block h-full w-full rounded-full" style={{ background: `linear-gradient(90deg, ${s.color}, rgba(15,23,42,0.08))` }} />
                </div>
                {i < howSteps.length - 1 && (
                  <div className="hidden md:grid absolute -right-4 top-1/2 z-10 h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 backdrop-blur" style={{ color: s.color }}>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Problem & Decision cards with visual variety ── */

const problems = [
  { icon: Zap, title: 'Checkout terminado, consumo sigue', body: 'ACS, climatización o standby encendidos tras la salida. El coste se mezcla en la factura mensual.', bg: 'var(--color-status-warning-soft)', iconBg: '#ffedd5', color: accents.orange },
  { icon: Gauge, title: 'Misma potencia todo el año', body: 'La potencia contratada no se ajusta a ocupación real. Pagas de más en meses tranquilos.', bg: '#fef3c7', iconBg: '#fde68a', color: accents.amber },
  { icon: FileText, title: 'Propietarios sin explicación', body: 'La factura agregada no distingue apartamento, reserva ni acción tomada.', bg: '#ede9fe', iconBg: '#ddd6fe', color: accents.violet },
  { icon: Activity, title: 'Alertas sin prioridad económica', body: 'Tramo ordena por lo que cuesta dinero: estancia, limpieza, standby y anomalía real.', bg: '#ffe4e6', iconBg: '#fecdd3', color: accents.rose },
];

const decisions = [
  { icon: CheckCircle2, title: 'Consumo fuera de estancia', body: 'Detecta energía activa post-checkout y estima el coste mensual.', tags: ['Reserva', 'CUPS'], bg: '#dbeafe', iconBg: '#bfdbfe', color: accents.blue },
  { icon: Gauge, title: 'Potencia revisable', body: 'Compara picos reales contra contrato y propone cambios con ahorro estimado.', tags: ['P1/P2/P3', 'Contrato'], bg: '#ccfbf1', iconBg: '#99f6e4', color: accents.teal },
  { icon: FileText, title: 'Informe por propietario', body: 'Convierte cada acción en explicación mensual: consumo, coste y evidencia.', tags: ['Propietario', 'PDF'], bg: '#ede9fe', iconBg: '#ddd6fe', color: accents.violet },
];

function ProblemsDecisions() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-card', { y: 36 },
        { y: 0, stagger: 0.06, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' } });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <Section refProp={ref} id="producto" style={{ scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-2xl text-center mb-12">
        <SectionHeading className="text-center" eyebrow="El problema">
          No es la factura. Es no saber qué apartamento o reserva dispara el coste.
        </SectionHeading>
        <p className="mt-4 text-[17px] text-[var(--color-gray)]">
          Tramo cruza CUPS, reservas y tarifa para convertir facturas opacas en decisiones diarias.
        </p>
      </div>

      {/* Problem cards — 4 col */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {problems.map((item) => { const Icon = item.icon; return (
          <div key={item.title}
            className="reveal-card rounded-[14px] p-6 border-0 hover:scale-[1.01] transition-all duration-200"
            style={{ background: item.bg }}>
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: item.iconBg }}>
              <Icon className="h-4 w-4" style={{ color: item.color }} />
            </div>
            <h3 className="font-display text-[15px] font-medium text-[var(--color-dark)]">{item.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-gray)]">{item.body}</p>
          </div>
        ); })}
      </div>

      {/* Transition wave */}
      <div className="relative h-8 mt-8 mb-4 flex items-center justify-center">
        <div className="w-12 h-px" style={{ background: 'var(--color-primary)' }} />
        <div className="mx-3 h-2 w-2 rotate-45" style={{ borderRight: '2px solid var(--color-primary)', borderBottom: '2px solid var(--color-primary)' }} />
        <div className="w-12 h-px" style={{ background: 'var(--color-primary)' }} />
      </div>

      <h3 className="text-center font-display text-[1.5rem] font-light text-[var(--color-dark)] mb-8">
        Así lo resolvemos
      </h3>

      {/* Decision cards — 3 col */}
      <div className="grid gap-4 lg:grid-cols-3">
        {decisions.map((m) => { const Icon = m.icon; return (
          <div key={m.title}
            className="reveal-card rounded-[14px] p-6 border-0 hover:scale-[1.01] transition-all duration-200"
            style={{ background: m.bg }}>
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: m.iconBg }}>
              <Icon className="h-4 w-4" style={{ color: m.color }} />
            </div>
            <h3 className="font-display text-[15px] font-medium text-[var(--color-dark)]">{m.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-gray)]">{m.body}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {m.tags.map(t => (
                <span key={t} className="rounded-[6px] px-2 py-1 font-mono text-[14px] font-medium" style={{ background: m.iconBg, color: m.color }}>{t}</span>
              ))}
            </div>
          </div>
        ); })}
      </div>
    </Section>
  );
}

/* ── Pricing ── */

const pricingTiers = [
  { name: 'Starter', price: '15', aptos: '5-15', monthly: '75-225 €/mes', features: ['Monitorización', 'Informes mensuales', 'Atribución por reserva'] },
  { name: 'Pro', price: '12', aptos: '16-50', monthly: '192-600 €/mes', features: ['Todo Starter', 'Potencia revisable', 'Informes propietarios'] },
  { name: 'Business', price: '10', aptos: '20-80', monthly: '200-800 €/mes', features: ['Todo Pro', 'Multi-PMS', 'Gestor dedicado'], recommended: true },
  { name: 'Scale', price: '7,50', aptos: '100+', monthly: 'desde 750 €/mes', features: ['Todo Business', 'SLA', 'Onboarding dedicado'] },
];

function Pricing() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card', { y: 24 },
        { y: 0, stagger: 0.06, duration: 0.55, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' } });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <Section refProp={ref} id="precios" className="bg-[var(--color-bg)] pb-8 md:pb-12" style={{ scrollMarginTop: '80px' }}>
      <div className="relative z-10 mx-auto mb-8 max-w-2xl rounded-[24px] bg-white/46 px-4 py-6 text-center backdrop-blur-sm md:mb-10 md:bg-white/18 md:p-0 md:shadow-none md:backdrop-blur-0">
        <SectionHeading className="text-center">
          Diagnóstico primero. Plan después.
        </SectionHeading>
        <p className="mt-4 text-[17px] text-[var(--color-gray)]">
          Tarifa por apartamento, sin permanencia. El piloto inicial es gratuito.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {pricingTiers.map((tier) => (
          <div key={tier.name}
            className={`pricing-card relative flex flex-col rounded-[14px] p-6 bg-white transition-all duration-300 hover:scale-[1.02] ${
              tier.recommended ? 'border-2 border-[var(--color-primary)] hover:shadow-[0_0_32px_-4px_rgba(15,123,90,0.25)]' : 'border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md'
            }`}>
            {tier.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[6px] px-3 py-1 font-mono text-[14px] font-semibold uppercase tracking-[0.1em] bg-[var(--color-primary)] text-white">
                Recomendado
              </div>
            )}
            <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gray-light)]">{tier.name}</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="whitespace-nowrap font-display text-[2rem] font-light text-[var(--color-dark)] tabular-nums">{tier.price}</span>
              <span className="font-mono text-[14px] text-[var(--color-gray-light)]">€/apt/mes</span>
            </div>
            <p className="mt-1 text-[14px] text-[var(--color-gray-light)]"><span className="whitespace-nowrap">{tier.aptos} aptos</span> · <span className="whitespace-nowrap tabular-nums">{tier.monthly}</span></p>
            <p className="mt-1 text-[14px] text-[var(--color-gray-light)]">Piloto gratuito</p>
            <hr className="my-4 border-[var(--color-border)]" />
            <ul className="flex-1 space-y-2">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-[14px] text-[var(--color-gray)]">
                  <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#diagnostico"
              className={`mt-6 inline-flex min-h-[42px] w-full items-center justify-center rounded-[8px] px-3 text-[14px] font-medium transition-colors duration-200 ${
                tier.recommended
                  ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
                  : 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
              }`}>
              Empezar
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
    <Section id="faq" className="pt-8 md:pt-12" style={{ scrollMarginTop: '80px' }}>
      <div className="mx-auto" style={{ maxWidth: '36rem' }}>
        <SectionHeading className="text-center">Respuestas directas.</SectionHeading>
        <div className="mt-10 space-y-2">
          {faqs.map((faq) => (
            <details key={faq.q} name="tramo-faq"
              className="group rounded-[12px] overflow-hidden border border-[var(--color-border)] bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left hover:bg-[var(--color-primary-subtle)] transition-colors duration-200">
                <span className="font-display text-[15px] font-medium text-[var(--color-dark)]">{faq.q}</span>
                <span aria-hidden="true" className="text-lg text-[var(--color-gray-light)] transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-4 text-[14px] leading-relaxed text-[var(--color-gray)]">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Diagnostic / Lead Capture ── */

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
      `Hola, quiero solicitar un diagnóstico Tramo.

Nombre: ${data.name || ''}
Email: ${data.email || ''}
Gestora: ${data.company || ''}
Apartamentos: ${data.apartments || ''}`,
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
        ? 'La conexión tardó demasiado. Puedes enviarlo por email con los datos ya preparados.'
        : 'No se pudo enviar automáticamente. Puedes enviarlo por email con los datos ya preparados.');
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <section id="diagnostico" data-gsap-section className="relative px-6 py-12 md:py-20 bg-[var(--color-primary)] text-white" style={{ scrollMarginTop: '80px' }}>
      <div className="relative mx-auto" style={{ maxWidth: '36rem' }}>
        <div className="text-center">
          <SectionHeading className="text-center" eyebrow="Diagnóstico gratuito">
            <span style={{ color: 'white' }}>Descubre cuánto margen pierde tu cartera.</span>
          </SectionHeading>
          <p className="mt-4 text-[17px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
            14 días. Solo lectura. Sin compromiso.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Nombre</span>
              <input name="name" required autoComplete="name" placeholder="Nombre" aria-label="Nombre"
                className="w-full min-h-[48px] rounded-[8px] px-4 text-[15px] bg-white/[0.18] border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white/70 transition-colors" />
            </label>
            <label className="block">
              <span className="sr-only">Email profesional</span>
              <input name="email" type="email" required autoComplete="email" placeholder="Email profesional" aria-label="Email profesional"
                className="w-full min-h-[48px] rounded-[8px] px-4 text-[15px] bg-white/[0.18] border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white/70 transition-colors" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Nombre de la gestora</span>
              <input name="company" autoComplete="organization" placeholder="Nombre de la gestora" aria-label="Nombre de la gestora"
                className="w-full min-h-[48px] rounded-[8px] px-4 text-[15px] bg-white/[0.18] border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white/70 transition-colors" />
            </label>
            <label className="block">
              <span className="sr-only">Número de apartamentos</span>
              <input name="apartments" type="number" min="1" inputMode="numeric" placeholder="Nº de apartamentos" aria-label="Número de apartamentos"
                className="w-full min-h-[48px] rounded-[8px] px-4 text-[15px] bg-white/[0.18] border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white/70 transition-colors" />
            </label>
          </div>
          <div aria-live="polite" role="status" className="min-h-[3lh]">
            {status === 'sent' && <p className="rounded-[8px] p-3 text-[14px] font-medium bg-white/10">✅ Solicitud recibida. Te respondemos con una propuesta de diagnóstico.</p>}
            {status === 'error' && (
              <div className="rounded-[8px] p-3 text-[14px] font-medium bg-white/10">
                <p>❌ {errorMessage || 'No se pudo enviar automáticamente.'}</p>
                <a href={fallbackHref} className="mt-2 inline-flex underline decoration-white/50 underline-offset-4 hover:decoration-white">
                  Abrir email preparado
                </a>
              </div>
            )}
          </div>
          <button type="submit" disabled={status === 'sending'}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] px-6 font-display text-[15px] font-medium bg-white text-[var(--color-primary)] hover:bg-white/90 active:bg-white/80 disabled:opacity-60 transition-all duration-200">
            {status === 'sending' ? 'Enviando...' : 'Solicitar diagnóstico'}
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-center text-[14px]" style={{ color: 'rgba(255,255,255,0.82)' }}>
            Sin compromiso. Tus datos solo se usan para preparar el diagnóstico.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ── Hardware (enhanced: prices, GSAP sensor/storage flow) ── */

function HardwareSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [, setBatteryCharged] = useState(false);

  const chargeBattery = () => {
    setBatteryCharged(true);
    gsap.to('.hw-battery-fill', { attr: { y: 410, height: 210 }, opacity: 0.9, duration: 0.95, ease: 'power3.out' });
    gsap.to('.hw-battery-liquid', { attr: { y: 294, height: 204 }, opacity: 0.96, duration: 0.95, ease: 'power3.out' });
    gsap.to('.hw-battery-percent', { textContent: 86, snap: { textContent: 1 }, duration: 0.9, ease: 'power3.out' });
    gsap.to('.hw-battery-glow', { opacity: 0.28, scale: 1.02, duration: 0.55, transformOrigin: 'center center', ease: 'power2.out' });
    gsap.to('.hw-energy-flow', { opacity: 0.74, strokeWidth: 5.2, duration: 0.25, ease: 'power2.out' });
    gsap.to('.hw-flow-pulse', { opacity: 0.92, duration: 0.25, ease: 'power2.out' });
  };

  const dischargeBattery = () => {
    setBatteryCharged(false);
    gsap.to('.hw-battery-fill', { attr: { y: 570, height: 50 }, opacity: 0.78, duration: 0.7, ease: 'power3.out' });
    gsap.to('.hw-battery-liquid', { attr: { y: 440, height: 58 }, opacity: 0.92, duration: 0.7, ease: 'power3.out' });
    gsap.to('.hw-battery-percent', { textContent: 22, snap: { textContent: 1 }, duration: 0.65, ease: 'power3.out' });
    gsap.to('.hw-battery-glow', { opacity: 0.12, scale: 1, duration: 0.45, transformOrigin: 'center center', ease: 'power2.out' });
    gsap.to('.hw-energy-flow', { opacity: 0.56, strokeWidth: 4.4, duration: 0.25, ease: 'power2.out' });
    gsap.to('.hw-flow-pulse', { opacity: 0.62, duration: 0.25, ease: 'power2.out' });
  };

  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' }, defaults: { ease: 'power2.out' } });
      gsap.set('.hw-battery-fill', { attr: { y: 570, height: 50 }, opacity: 0.78 });
      gsap.set('.hw-battery-liquid', { attr: { y: 440, height: 58 }, opacity: 0.92 });
      gsap.set('.hw-battery-percent', { textContent: 22 });
      gsap.set('.hw-battery-glow', { opacity: 0.12, transformOrigin: 'center center' });
      tl.fromTo('.hw-visual', { y: 22, scale: 0.985, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.75 })
        .fromTo('.hw-card', { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.45 }, '-=0.35')
        .fromTo('.hw-energy-flow', { strokeDashoffset: 90, opacity: 0 }, { strokeDashoffset: 0, opacity: 0.56, duration: 0.9, stagger: 0.1 }, '-=0.4')
        .fromTo('.hw-flow-pulse', { opacity: 0, scale: 0.7 }, { opacity: 0.62, scale: 1, duration: 0.45, stagger: 0.08 }, '-=0.65');
      gsap.to('.hw-energy-flow', { strokeDashoffset: -90, duration: 1.45, repeat: -1, ease: 'none' });
      gsap.to('.hw-flow-pulse', { x: 42, opacity: 0.18, duration: 1.15, repeat: -1, stagger: 0.22, ease: 'sine.inOut' });
      gsap.to('.hw-battery-fill', { attr: { y: 490, height: 130 }, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hw-battery-liquid', { attr: { y: 378, height: 120 }, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hw-battery-glow', { opacity: 0.24, scale: 1.035, duration: 1.8, repeat: -1, yoyo: true, transformOrigin: 'center center', ease: 'sine.inOut' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <Section id="hardware" className="relative -mt-16 overflow-hidden bg-[linear-gradient(180deg,var(--color-bg)_0%,#f2efff_10%,#e8fbf2_28%,#dcfce7_46%,#ecfeff_70%,#dbeafe_92%,var(--color-bg)_100%)] !pt-20 !pb-20 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-36 before:bg-[linear-gradient(180deg,rgba(250,250,250,0.96)_0%,rgba(242,239,255,0.72)_38%,rgba(209,250,229,0)_100%)] md:-mt-20 md:!pt-28 md:!pb-16" style={{ scrollMarginTop: '80px' }}>
      <div className="mx-auto mb-6 max-w-2xl rounded-[24px] bg-white/38 px-4 py-6 text-center backdrop-blur-sm md:mb-10 md:bg-transparent md:p-0 md:backdrop-blur-0">
        <SectionHeading className="text-center">
          Sensores y baterías solo donde el diagnóstico las justifica.
        </SectionHeading>
        <p className="mt-4 text-[17px] text-[var(--color-gray)]">
          Tramo no empieza vendiendo hardware. Primero mide el margen perdido, estima el payback y solo recomienda sensores o batería cuando hay margen accionable.
        </p>
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl">
        {/* Sensor → Rule → Ahorro flow */}
        <div className="mb-8 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white p-4 backdrop-blur-sm md:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">Flujo técnico · demo</p>
              <h3 className="mt-3 font-display text-[clamp(1.35rem,3vw,2.15rem)] font-light leading-tight text-[var(--color-dark)]" style={{ letterSpacing: '-0.03em' }}>
                Medir primero. Automatizar después. Financiar hardware solo si el margen lo pide.
              </h3>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {[
                  ['Sensor de cuadro', 'ACS · clima · standby', accents.teal],
                  ['Regla Tramo', 'horario + reserva + tarifa', accents.amber],
                  ['Informe', 'ahorro y payback estimado', 'var(--color-primary)'],
                ].map(([title, body, color]) => (
                  <div key={title} className="hw-card rounded-[16px] bg-white/86 p-4 ring-1 ring-white/70 backdrop-blur">
                    <span className="block h-2 w-10 rounded-full" style={{ background: color }} />
                    <p className="mt-3 text-[14px] font-medium text-[var(--color-dark)]">{title}</p>
                    <p className="mt-1 text-[14px] leading-snug text-[var(--color-gray)]">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="hw-visual group relative overflow-hidden rounded-[22px] border border-white/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.84)_0%,rgba(236,253,245,0.78)_52%,rgba(219,234,254,0.74)_100%)] outline-none ring-1 ring-[#0f7b5a]/10 backdrop-blur-sm"
              role="button"
              tabIndex={0}
              aria-label="Animación de flujo energético: pasa el ratón para cargar la batería"
              onMouseEnter={chargeBattery}
              onMouseLeave={dischargeBattery}
              onClick={chargeBattery}
              onTouchStart={chargeBattery}
              onFocus={chargeBattery}
              onBlur={dischargeBattery}
            >
              <svg className="block aspect-[4/3] w-full" viewBox="0 0 1200 900" aria-hidden="true">
                <defs>
                  <linearGradient id="arcadiaPanel" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f8fafc" />
                    <stop offset="0.48" stopColor="#ecfdf5" />
                    <stop offset="1" stopColor="#dbeafe" />
                  </linearGradient>
                  <linearGradient id="arcadiaBattery" x1="0" y1="640" x2="0" y2="315" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="var(--color-primary-hover)" stopOpacity="0.90" />
                    <stop offset="0.45" stopColor="var(--color-primary)" stopOpacity="0.86" />
                    <stop offset="1" stopColor="#38bdf8" stopOpacity="0.84" />
                  </linearGradient>
                  <linearGradient id="arcadiaFlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#0f7b5a" stopOpacity="0" />
                    <stop offset="0.52" stopColor="#0f7b5a" stopOpacity="0.72" />
                    <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="softPanelShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#0f172a" floodOpacity="0.10" />
                  </filter>
                  <clipPath id="batteryClip">
                    <rect x="892" y="270" width="156" height="228" rx="32" />
                  </clipPath>
                </defs>

                <rect x="58" y="72" width="1084" height="756" rx="42" fill="url(#arcadiaPanel)" stroke="rgba(15,123,90,0.12)" strokeWidth="2" />
                <path d="M112 690 C310 615 458 732 654 646 C816 592 902 628 1068 542" fill="none" stroke="#0f7b5a" strokeOpacity="0.08" strokeWidth="80" strokeLinecap="round" />

                {/* sensor module */}
                <g className="hw-card" filter="url(#softPanelShadow)">
                  <rect x="115" y="204" width="230" height="460" rx="40" fill="rgba(255,255,255,0.84)" stroke="rgba(15,123,90,0.30)" strokeWidth="2" />
                  <g transform="translate(140 266)">
                    <rect x="0" y="4" width="108" height="104" rx="28" fill="#d1fae5" stroke="#0f7b5a" strokeOpacity="0.38" strokeWidth="2" />
                    <path d="M26 62 C26 36 44 22 64 22 C84 22 98 38 98 62" fill="none" stroke="#0f7b5a" strokeWidth="4" strokeLinecap="round" />
                    <path d="M20 62 H48 M66 62 H100" stroke="#0f7b5a" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="58" cy="62" r="11" fill="#0f7b5a" fillOpacity="0.18" stroke="#0f7b5a" strokeOpacity="0.58" strokeWidth="2" />
                    <path d="M58 62 L75 42" stroke="#0f7b5a" strokeWidth="3" strokeLinecap="round" />
                    <path d="M126 36 h54 M126 70 h68 M126 104 h48" stroke="#0f7b5a" strokeOpacity="0.20" strokeWidth="13" strokeLinecap="round" />
                    <path d="M118 140 C134 122 154 154 176 132" fill="none" stroke="#0f7b5a" strokeOpacity="0.36" strokeWidth="4" strokeLinecap="round" />
                  </g>
                  <text x="154" y="604" fill="var(--color-dark)" fontSize="28" fontWeight="600">Sensores</text>
                  <text x="154" y="638" fill="#374151" fontSize="20">ACS · clima · standby</text>
                </g>

                {/* rule/chart module */}
                <g className="hw-card" filter="url(#softPanelShadow)">
                  <rect x="485" y="204" width="230" height="460" rx="40" fill="rgba(255,255,255,0.84)" stroke="rgba(245,158,11,0.34)" strokeWidth="2" />
                  <g transform="translate(512 252)">
                    <rect x="0" y="0" width="176" height="228" rx="26" fill="var(--color-status-warning-soft)" stroke="var(--color-status-warning)" strokeOpacity="0.30" strokeWidth="2" />
                    <line x1="28" y1="184" x2="150" y2="184" stroke="var(--color-status-warning)" strokeOpacity="0.28" strokeWidth="2" />
                    <line x1="28" y1="34" x2="28" y2="184" stroke="var(--color-status-warning)" strokeOpacity="0.22" strokeWidth="2" />
                    <rect x="40" y="136" width="18" height="48" rx="5" fill="var(--color-status-warning)" fillOpacity="0.42" />
                    <rect x="68" y="96" width="18" height="88" rx="5" fill="var(--color-status-warning)" fillOpacity="0.60" />
                    <rect x="96" y="150" width="18" height="34" rx="5" fill="var(--color-status-warning)" fillOpacity="0.36" />
                    <rect x="124" y="68" width="18" height="116" rx="5" fill="var(--color-status-warning)" fillOpacity="0.74" />
                    <path d="M36 122 C54 74 74 108 92 86 C116 58 132 54 150 40" fill="none" stroke="var(--color-status-warning)" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="36" cy="122" r="4" fill="var(--color-status-warning)" />
                    <circle cx="92" cy="86" r="4" fill="var(--color-status-warning)" />
                    <circle cx="150" cy="40" r="5" fill="var(--color-status-warning)" />
                  </g>
                  <text x="523" y="604" fill="var(--color-dark)" fontSize="28" fontWeight="600">Regla Tramo</text>
                  <text x="523" y="638" fill="#374151" fontSize="20">gráfico + tarifa</text>
                </g>

                {/* battery module */}
                <g className="hw-card" filter="url(#softPanelShadow)">
                  <rect x="855" y="204" width="230" height="460" rx="40" fill="rgba(239,246,255,0.94)" stroke="rgba(37,99,235,0.38)" strokeWidth="2" />
                  <rect x="938" y="244" width="64" height="32" rx="10" fill="var(--color-primary)" fillOpacity="0.22" />
                  <rect x="890" y="266" width="160" height="236" rx="28" fill="rgba(255,255,255,0.44)" stroke="rgba(37,99,235,0.38)" strokeWidth="4" />
                  <g clipPath="url(#batteryClip)">
                    <rect className="hw-battery-liquid" x="892" y="440" width="156" height="58" rx="18" fill="url(#arcadiaBattery)" />
                    <line x1="914" x2="1026" y1="340" y2="340" stroke="rgba(37,99,235,0.14)" strokeWidth="2" />
                    <line x1="914" x2="1026" y1="420" y2="420" stroke="rgba(37,99,235,0.14)" strokeWidth="2" />
                  </g>
                  <path d="M944 390 L984 298 L970 374 H1014 L952 484 L974 406 H944 Z" fill="rgba(37,99,235,0.42)" />
                  <text x="918" y="604" fill="var(--color-dark)" fontSize="28" fontWeight="600">Batería</text>
                  <text x="918" y="638" fill="#374151" fontSize="20">solo si compensa</text>
                </g>

                {/* flows */}
                <path className="hw-energy-flow" d="M345 430 C398 392 432 392 485 430" fill="none" stroke="url(#arcadiaFlow)" strokeWidth="9" strokeLinecap="round" strokeDasharray="20 16" />
                <path className="hw-energy-flow" d="M715 430 C768 392 802 392 855 430" fill="none" stroke="url(#arcadiaFlow)" strokeWidth="9" strokeLinecap="round" strokeDasharray="20 16" />
                <circle className="hw-flow-pulse" cx="415" cy="412" r="10" fill="#0f7b5a" fillOpacity="0.50" />
                <circle className="hw-flow-pulse" cx="785" cy="412" r="10" fill="var(--color-primary)" fillOpacity="0.48" />

                <text x="94" y="132" fill="#0f7b5a" fontSize="19" fontWeight="700" letterSpacing="3">FLUJO TÉCNICO · DEMO</text>
                <text x="94" y="172" fill="#1A1A2E" fontSize="34" fontWeight="300">medición → regla → batería opcional</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col items-start justify-between gap-4 rounded-[18px] border border-white/70 bg-white/58 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">Decisión con datos</p>
            <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-gray)]">Si el diagnóstico no encuentra margen accionable, no recomendamos hardware.</p>
          </div>
          <a href="#diagnostico" className="inline-flex min-h-[42px] items-center justify-center rounded-[10px] bg-[var(--color-primary)] px-4 text-[14px] font-medium text-white hover:bg-[var(--color-primary-hover)]">
            Calcular margen
          </a>
        </div>

        {/* Hardware cards */}
        <div className="grid gap-4 pb-48 lg:grid-cols-2 lg:pb-0">
          <div className="hw-card rounded-[18px] border border-white/20 bg-[var(--color-primary)] p-6 sm:p-6 text-white">
            <h3 className="font-display text-[18px] sm:text-[19px] font-medium text-white">Sensores opcionales</h3>
            <p className="mt-2 text-[14px] sm:text-[14px] leading-relaxed text-white/78">Medición por circuito para ACS, climatización y standby. Visibilidad completa del consumo fantasma.</p>
            <p className="mt-4 inline-flex rounded-full bg-white/16 px-3 py-1.5 font-mono text-[14px] sm:text-[14px] font-semibold text-white">desde ~300 €/apto instalado</p>
            <p className="mt-3 text-[14px] leading-relaxed text-white/62">Retorno estimado solo si el diagnóstico detecta consumo accionable. Sin ROI garantizado.</p>
          </div>
          <div className="hw-card rounded-[18px] border border-white/20 bg-[var(--color-primary-hover)] p-6 sm:p-6 text-white">
            <h3 className="font-display text-[18px] sm:text-[19px] font-medium text-white">Batería opcional</h3>
            <p className="mt-2 text-[14px] sm:text-[14px] leading-relaxed text-white/78">Almacenamiento para arbitraje OMIE: carga en valle (P3), descarga en punta (P1). Solo simulación.</p>
            <p className="mt-4 inline-flex rounded-full bg-white/16 px-3 py-1.5 font-mono text-[14px] sm:text-[14px] font-semibold text-white">~5.500 € / 10 kWh</p>
            <p className="mt-3 text-[14px] leading-relaxed text-white/62">Simulación con curva real de carga. Payback orientativo: 4-7 años según ocupación y tarifa.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Footer (dark green, integrated with form) ── */

function Footer() {
  const links = [
    ['Cómo funciona', '#como-funciona'],
    ['Problema', '#producto'],
    ['Hardware', '#hardware'],
    ['Precios', '#precios'],
    ['FAQ', '#faq'],
  ];
  return (
    <footer data-gsap-section className="px-6 py-12 bg-[var(--color-primary-hover)] text-white">
      <div className="mx-auto" style={{ maxWidth: 'var(--page-max)' }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.76)' }}>
              Tramo · Energy margin operations
            </p>
            <p className="mt-4 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-light leading-[1.08] max-w-[18ch]"
              style={{ letterSpacing: '-0.025em', textWrap: 'balance', minWidth: 0 }}>
              Energía controlada. Cartera más rentable.
            </p>
          </div>
          <p className="text-[14px] leading-relaxed lg:text-right" style={{ color: 'rgba(255,255,255,0.82)' }}>
            Diagnóstico, decisiones e informes para gestores de apartamentos turísticos en España.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15">
          <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
            Tramo es una herramienta de diagnóstico y recomendación. Las cifras de ahorro son estimaciones basadas en datos de consumo y tarifas reales durante el piloto. El ahorro efectivo depende de la ocupación, tarifa contratada y capacidad de actuación del gestor. No se garantizan resultados específicos. Los precios son orientativos antes de impuestos y pueden variar según el tamaño de cartera y necesidades de integración.
          </p>
          <p className="mt-3 text-[14px]" style={{ color: 'rgba(255,255,255,0.82)' }}>
            Los sensores y baterías son capacidades opcionales recomendadas solo cuando el diagnóstico previo lo justifica. Las cifras de coste de hardware (~300 €/apto para sensores, ~5.500 € para batería de 10 kWh) son referencias de mercado sujetas a disponibilidad y configuración.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 pt-6 border-t border-white/15 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Enlaces secundarios" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map(([label, href]) => (
              <a key={href} href={href}
                className="inline-flex min-h-[44px] items-center text-[14px] hover:opacity-80 transition-opacity duration-200">{label}</a>
            ))}
          </nav>
          <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.82)' }}>
            © {new Date().getFullYear()} Tramo
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Mobile fixed CTA ── */

function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.18);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}>
      <div className="pointer-events-none absolute -top-8 inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
      <div className="relative px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-2">
        <a href="#diagnostico"
          className="flex w-full items-center justify-center gap-2 min-h-[52px] rounded-[12px] border border-[var(--color-primary-hover)] font-display text-[15px] font-medium bg-[var(--color-primary)] text-white pointer-events-auto">
          Diagnosticar mi cartera <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

/* ── Page ── */

export default function Page() {
  return (
    <>
      <GridOverlay />
      <main id="main-content" className="bg-[var(--color-bg)] text-[var(--color-dark)] pb-40 md:pb-0">
      <Nav />
      <Hero />
      <HowItWorks />
      <ProblemsDecisions />
      <HardwareSection />
      <DiagnosticForm />
      <Pricing />
      <FAQ />
      <Footer />
        <MobileCTA />
      </main>
    </>
  );
}
