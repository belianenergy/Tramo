/* Hallmark · redesign · pre-emit critique: P5 H5 E5 S4 R5 V4 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  BellRing,
  Building2,
  CalendarClock,
  CheckCircle2,
  Database,
  FileText,
  Gauge,
  LockKeyhole,
  Menu,
  PlugZap,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import SystemFlowScroll from './components/SystemFlowScroll';
import HeroInteractiveDemo from './components/HeroInteractiveDemo';
import { BatteryArbitrageSVG, SmartHomeSVG } from './components/TramoIllustrations';

gsap.registerPlugin(ScrollTrigger);

const BAR_DELAYS = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 160, 170, 190, 200, 220];

const navItems = [
  ['Problema', '#problema'],
  ['Sistema', '#sistema'],
  ['Módulos', '#modulos'],
  ['Dashboard', '#dashboard'],
  ['Diagnóstico', '#diagnostico'],
] as const;

const painCards = [
  {
    number: '01',
    title: 'La factura llega tarde',
    body: 'El consumo fuera de estancia se descubre semanas después, cuando ya no hay margen operativo para actuar.',
    data: '4,2 kWh fuera de reserva',
  },
  {
    number: '02',
    title: 'Potencia y tarifa heredadas',
    body: 'Cada CUPS arrastra una potencia y una tarifa que rara vez se revisan con los picos reales de la propiedad.',
    data: 'P2 4,6 kW → 3,3 kW',
  },
  {
    number: '03',
    title: 'Propietarios sin explicación',
    body: 'El propietario ve coste. La gestora necesita evidencias, acciones y contexto para defender cada liquidación.',
    data: 'Informe abril listo',
  },
];

const coreModules = [
  {
    id: 'fuera',
    label: 'Fuera de reserva',
    title: 'Detecta kWh que no pertenecen a ninguna estancia',
    description:
      'Tramo cruza reservas, ventanas de limpieza y lecturas disponibles para separar estancia, operativo e incidencia.',
    bullets: ['Checkout y check-in como límites reales', 'Alertas por consumo constante sin reserva', 'Evidencia preparada para la cola operativa'],
    stat: '4,2 kWh',
    statLabel: 'detectados tras checkout',
  },
  {
    id: 'tarifa',
    label: 'Tarifa y potencia',
    title: 'Revisa P1/P2 con datos reales de cada CUPS',
    description:
      'La potencia contratada deja de ser una decisión heredada: se compara con picos, facturas y periodos tarifarios.',
    bullets: ['CUPS y factura vinculados a cada propiedad', 'Recomendaciones prudentes por periodo', 'Historial para justificar cambios'],
    stat: '3,3 kW',
    statLabel: 'P2 recomendada',
  },
  {
    id: 'reglas',
    label: 'Reglas por reserva',
    title: 'Convierte señales en acciones alrededor de la estancia',
    description:
      'Las incidencias se traducen en reglas operativas para termo, AC, climatización, modo ahorro y avisos al equipo.',
    bullets: ['Regla post-checkout 45 min', 'Pre-check-in con confort limitado', 'Escalado si el consumo persiste'],
    stat: '18',
    statLabel: 'reglas activas',
  },
  {
    id: 'informes',
    label: 'Informes propietarios',
    title: 'Transforma evidencia técnica en explicación defendible',
    description:
      'Cada propietario recibe un resumen mensual claro: consumo atribuido, incidencias, acciones y estimaciones prudentes.',
    bullets: ['kWh por estancia y fuera de reserva', 'Acciones ejecutadas por la gestora', 'Resumen listo para liquidación'],
    stat: '412 kWh',
    statLabel: 'informados en abril',
  },
];

const actionRows = [
  ['VGO-014', 'Fuera de reserva', 'checkout 11:00 · consumo 13:10-16:40', 'Revisar termo/AC'],
  ['COR-007', 'Tarifa/Potencia', 'P2 actual 4,6 kW · pico real 2,8 kW', 'Preparar cambio P2'],
  ['SJO-021', 'Reglas', 'termo activo tras salida 10:30', 'Aplicar post-checkout'],
  ['BCN-055', 'Informe', '17 kWh fuera reserva · Costa Rentals', 'Validar informe'],
];

const properties = [
  ['VGO-014', 'Vigo Centro', 'Vacío', '4,2 kWh', 'Alerta'],
  ['COR-007', 'A Coruña Marina', 'Ocupado', '386 kWh', 'P1/P2'],
  ['SJO-021', 'Sanxenxo Playa', 'Limpieza', '33 kWh', 'Regla'],
  ['MDR-003', 'Madrid Letras', 'Ocupado', '512 kWh', 'Correcto'],
];

function cssVar(name: string) {
  return `var(${name})`;
}

function ScaleBarBtn({
  href,
  variant = 'solid',
  className = '',
  children,
}: {
  href: string;
  variant?: 'solid' | 'outline' | 'darkOutline';
  className?: string;
  children: ReactNode;
}) {
  const solid = variant === 'solid';
  const darkOutline = variant === 'darkOutline';

  return (
    <a
      href={href}
      className={`group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 font-display text-sm font-semibold leading-none tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-300 active:translate-y-px ${className}`}
      style={{
        background: solid ? cssVar('--color-ink') : 'transparent',
        color: solid || darkOutline ? cssVar('--color-surface') : cssVar('--color-ink'),
        border: solid ? '1px solid transparent' : `1px solid ${darkOutline ? 'rgba(255,255,255,0.28)' : cssVar('--color-ink')}`,
      }}
    >
      <span className="pointer-events-none absolute inset-x-0 -inset-y-4 flex items-center justify-center">
        {BAR_DELAYS.map((delay, index) => (
          <span
            key={index}
            className="h-full flex-[0_0_3px] origin-bottom scale-y-0 rounded-sm transition-transform duration-300 group-hover:scale-y-100"
            style={{
              background: solid ? cssVar('--color-accent') : cssVar('--color-border-strong'),
              transitionDelay: `${delay}ms`,
            }}
          />
        ))}
      </span>
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
    </a>
  );
}

function ArrowSwap({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-3 w-4 items-center justify-center ${className}`} aria-hidden="true">
      <ArrowRight className="absolute h-4 w-4 translate-x-0 scale-100 opacity-100 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-2 group-hover:scale-0 group-hover:opacity-0" />
      <ArrowRight className="absolute h-4 w-4 -translate-x-2 scale-0 opacity-0 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.36,0,0.114,0.92)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
    </span>
  );
}

function TextCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.01em] text-[var(--color-accent)]">
      <span>{children}</span>
      <ArrowSwap />
    </a>
  );
}

function useCounter(ref: React.RefObject<HTMLElement | null>, target: number, suffix: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = `${target}${suffix}`;

    const number = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(number, {
        value: target,
        duration: 1.8,
        ease: 'power1.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(number.value)}${suffix}`;
        },
        onComplete: () => {
          el.textContent = `${target}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [ref, target, suffix]);
}

function useShrinkHeader() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent =
      '@keyframes tramoHeaderShrink{to{height:56px}}@supports(animation-timeline:scroll()){.tramo-hdr{animation:tramoHeaderShrink auto linear both;animation-timeline:scroll(block root);animation-range:0px 100px}}';
    document.head.appendChild(style);

    if (typeof CSS !== 'undefined' && !CSS.supports('animation-timeline:scroll()')) {
      const header = document.querySelector('.tramo-hdr') as HTMLElement | null;
      const onScroll = () => {
        if (!header) return;
        header.style.height = `${72 - Math.min(1, window.scrollY / 100) * 16}px`;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => {
        window.removeEventListener('scroll', onScroll);
        style.remove();
      };
    }

    return () => style.remove();
  }, []);
}

function MobileNav({ open, close }: { open: boolean; close: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-[var(--color-paper)]"
        >
          <div className="flex h-[72px] items-center justify-between border-b border-[var(--color-border)] px-5">
            <span className="font-display text-xl font-semibold text-[var(--color-ink)]">Tramo</span>
            <button type="button" onClick={close} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-ink)]">
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar navegación</span>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 pt-6">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={close} className="border-b border-[var(--color-border)] py-4 font-display text-xl text-[var(--color-ink)]">
                {label}
              </a>
            ))}
              <div className="mt-8">
              <ScaleBarBtn href="#diagnostico">Diagnosticar mi cartera</ScaleBarBtn>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroProductPanel() {
  return (
    <div className="rv mx-auto mt-14 max-w-5xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm md:p-6">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 md:p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">VGO-014 · Vigo Centro</p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--color-ink)]">Consumo fuera de reserva</h2>
            </div>
            <span className="rounded-full border border-[var(--color-warning)] bg-[color-mix(in_srgb,var(--color-warning)_14%,transparent)] px-3 py-1 font-mono text-xs font-semibold text-[var(--color-warning)]">
              activo
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Checkout', '11:00'],
              ['Consumo', '13:10-16:40'],
              ['Acumulado', '4,2 kWh'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                <p className="text-xs font-medium text-[var(--color-muted)]">{label}</p>
                <p className="mt-1 font-mono text-lg font-semibold text-[var(--color-ink)]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 h-28 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4" aria-label="Consumo por ventana de reserva">
            <div className="flex h-full items-end gap-2">
              {[18, 22, 16, 20, 26, 18, 15, 55, 72, 68, 61, 45].map((height, index) => (
                <div key={index} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                  <span
                    className={`w-full rounded-sm ${index > 6 && index < 11 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-accent-soft)]'}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="rounded-lg bg-[var(--color-ink)] px-4 py-2 font-display text-sm font-semibold text-[var(--color-surface)]">
              Revisar termo/AC
            </button>
            <button type="button" className="rounded-lg border border-[var(--color-border-strong)] px-4 py-2 font-display text-sm font-semibold text-[var(--color-ink)]">
              Aplicar regla post-checkout
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-[var(--color-border)] p-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Impacto estimado</p>
            <p className="mt-2 font-mono text-5xl font-semibold tracking-tight text-[var(--color-ink)]">34,20 €</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">Estimación si el patrón se repite cada semana. No es ahorro garantizado.</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Potencia P2</p>
            <div className="mt-4 space-y-3">
              <Meter label="Actual" value="4,6 kW" width="88%" />
              <Meter label="Recomendada" value="3,3 kW" width="62%" accent />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-4">
            <p className="font-display text-base font-semibold text-[var(--color-ink)]">Informe abril listo</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">3 acciones · 412 kWh atribuidos · Costa Rentals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meter({ label, value, width, accent = false }: { label: string; value: string; width: string; accent?: boolean }) {
  return (
    <div>
      <div className="mb-1 flex justify-between gap-4 font-mono text-xs text-[var(--color-muted)]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--color-surface-alt)]">
        <div className={`h-2 rounded-full ${accent ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'}`} style={{ width }} />
      </div>
    </div>
  );
}

function SystemFlow() {
  const sources = [
    ['Reservas/PMS', CalendarClock],
    ['CUPS/Datadis', Database],
    ['Tarifas/P1-P2', SlidersHorizontal],
    ['Medición real', Activity],
  ] as const;
  const outputs = ['Detecta', 'Decide', 'Actúa', 'Informa'];

  return (
    <section id="sistema" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="rv mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
              La capa que une reservas, energía y acciones.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
            Datadis explica la factura; los medidores inteligentes detectan el problema cuando aún puedes actuar. Tramo junta ambas capas para atribuir cada kWh.
          </p>
        </div>

        <div className="rv rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="grid gap-3 sm:grid-cols-2">
              {sources.map(([label, Icon]) => (
                <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  <p className="mt-4 font-display text-base font-semibold text-[var(--color-ink)]">{label}</p>
                </div>
              ))}
            </div>
            <div className="hidden h-px w-14 bg-[var(--color-border-strong)] lg:block" />
            <div className="rounded-xl bg-[var(--color-ink)] p-5 text-[var(--color-surface)]">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-soft)]">Tramo atribuye</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {outputs.map((item) => (
                  <div key={item} className="rounded-lg border border-[rgba(255,255,255,0.16)] p-3">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-accent-soft)]" />
                    <p className="mt-3 font-display text-lg font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModuleScreenshot({ module }: { module: (typeof coreModules)[number] }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">{module.label}</p>
        <span className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--color-accent-ink)]">sincronizado</span>
      </div>
      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl bg-[var(--color-surface-alt)] p-4">
          <p className="font-mono text-4xl font-semibold text-[var(--color-ink)]">{module.stat}</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{module.statLabel}</p>
        </div>
        <div className="space-y-2">
          {module.bullets.map((bullet) => (
            <div key={bullet} className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[var(--color-accent)]" />
              <span className="text-sm leading-relaxed text-[var(--color-ink)]">{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoreModules() {
  const [active, setActive] = useState(0);
  const module = coreModules[active];

  return (
    <section id="modulos" className="border-y border-[var(--color-border)] bg-[var(--color-surface-alt)] px-5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="rv mb-10 max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
            Cuatro superficies para operar la cartera.
          </h2>
        </div>
        <div className="rv grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="flex flex-col gap-2">
            {coreModules.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className="rounded-xl border p-4 text-left transition-[background-color,border-color,color] duration-300"
                style={{
                  background: active === index ? cssVar('--color-ink') : cssVar('--color-surface'),
                  borderColor: active === index ? cssVar('--color-ink') : cssVar('--color-border'),
                  color: active === index ? cssVar('--color-surface') : cssVar('--color-ink'),
                }}
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] opacity-70">0{index + 1}</p>
                <p className="mt-2 font-display text-lg font-semibold">{item.label}</p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-3xl font-semibold leading-tight text-[var(--color-ink)]">{module.title}</h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">{module.description}</p>
              <div className="mt-6">
                <ModuleScreenshot module={module} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DashboardProof() {
  return (
    <section id="dashboard" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="rv mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
              Una mesa de operaciones, no un gráfico bonito.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
            Cada fila conserva propiedad, estado de reserva, evidencia energética, acción recomendada y salida para propietario.
          </p>
        </div>

        <div className="rv rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Cartera piloto · Mayo 2026</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--color-ink)]">Operaciones energéticas</h3>
            </div>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs font-semibold text-[var(--color-muted)]">Actualizado 19:10</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['32', 'propiedades'],
                  ['184 kWh', 'fuera reserva'],
                  ['7', 'alertas activas'],
                  ['12/14', 'propietarios'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
                    <p className="font-mono text-2xl font-semibold text-[var(--color-ink)]">{value}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-muted)]">{label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[var(--color-border)] p-4">
                <p className="mb-4 font-display text-base font-semibold text-[var(--color-ink)]">Cola de acciones</p>
                <div className="space-y-2">
                  {actionRows.map(([code, type, evidence, action]) => (
                    <div key={`${code}-${type}`} className="grid gap-3 rounded-lg border border-[var(--color-border)] p-3 text-sm md:grid-cols-[90px_1fr]">
                      <div>
                        <p className="font-mono font-semibold text-[var(--color-ink)]">{code}</p>
                        <p className="text-xs text-[var(--color-muted)]">{type}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-muted)]">{evidence}</p>
                        <p className="mt-1 font-display font-semibold text-[var(--color-accent)]">{action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
              <div className="grid grid-cols-[92px_1fr_90px_80px_84px] border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)] max-md:hidden">
                <span>Código</span>
                <span>Propiedad</span>
                <span>Estado</span>
                <span>kWh</span>
                <span>Señal</span>
              </div>
              {properties.map(([code, name, state, kwh, signal]) => (
                <div key={code} className="grid gap-2 border-b border-[var(--color-border)] px-3 py-4 last:border-b-0 md:grid-cols-[92px_1fr_90px_80px_84px] md:items-center">
                  <p className="font-mono text-sm font-semibold text-[var(--color-ink)]">{code}</p>
                  <p className="text-sm text-[var(--color-ink)]">{name}</p>
                  <p className="text-sm text-[var(--color-muted)]">{state}</p>
                  <p className="font-mono text-sm text-[var(--color-ink)]">{kwh}</p>
                  <p className={`w-fit rounded-full px-2 py-1 font-mono text-[11px] font-semibold ${signal === 'Alerta' ? 'bg-[color-mix(in_srgb,var(--color-warning)_14%,transparent)] text-[var(--color-warning)]' : 'bg-[var(--color-accent-soft)] text-[var(--color-accent-ink)]'}`}>
                    {signal}
                  </p>
                </div>
              ))}
              <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
                <p className="font-display text-base font-semibold text-[var(--color-ink)]">Informe propietario</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">Abril · 412 kWh · 3 acciones ejecutadas · resumen listo para liquidación.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  useShrinkHeader();
  const [mobileOpen, setMobileOpen] = useState(false);
  const counterRefs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)];
  useCounter(counterRefs[0], 32, '');
  useCounter(counterRefs[1], 184, ' kWh');
  useCounter(counterRefs[2], 180, ' €/año');

  return (
    <>
      <style>{`
        @keyframes rv{from{opacity:0;translate:0 28px}to{opacity:1;translate:0 0}}
        .rv{animation:rv .7s cubic-bezier(0.36,0,0.114,0.92) both}
        @media(prefers-reduced-motion:reduce){.rv{animation:none!important;opacity:1!important}}
      `}</style>

      <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
        <header className="tramo-hdr fixed inset-x-0 top-0 z-40 flex h-[72px] items-center">
          <div className="absolute inset-0 bg-[var(--color-paper)]/80 backdrop-blur-sm" />
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 relative">
            <a href="#" className="font-display text-xl font-semibold text-[var(--color-ink)]">
              Tramo
            </a>
            <nav className="hidden items-center gap-5 md:flex">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="inline-flex min-h-6 items-center py-1 font-display text-sm font-medium tracking-[0.01em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
                  {label}
                </a>
              ))}
              <ScaleBarBtn href="#diagnostico">Diagnosticar mi cartera</ScaleBarBtn>
            </nav>
            <button type="button" onClick={() => setMobileOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir navegación</span>
            </button>
          </div>
        </header>
        <MobileNav open={mobileOpen} close={() => setMobileOpen(false)} />
        <div className="h-[72px]" />

        <section className="px-5 pb-24 pt-20 text-center md:pb-32 md:pt-28">
          <div className="mx-auto max-w-5xl">
            <div className="rv mx-auto mb-5 flex flex-wrap items-center justify-center gap-3">
              <p className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
                Para gestores de carteras turísticas
              </p>
              <p className="w-fit rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-ink)]">
                ~180&nbsp;€/año por CUPS
              </p>
            </div>
            <h1 className="rv mx-auto max-w-5xl font-display text-[clamp(3rem,7vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-[var(--color-ink)]">
              Convierte la energía de tu cartera turística en margen operativo.
            </h1>
            <p className="rv mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
              Cruza reservas con CUPS y Datadis para detectar consumo fuera de estancia, activar reglas y preparar informes por propietario.
            </p>
            <div className="rv mt-9 flex flex-col items-center gap-4">
              <ScaleBarBtn href="#diagnostico">Diagnosticar mi cartera</ScaleBarBtn>
              <TextCta href="#dashboard">Ver dashboard demo</TextCta>
            </div>
            <HeroInteractiveDemo />
          </div>
        </section>

        <section id="problema" className="border-y border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl rv">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
                La factura llega tarde; la fuga ocurre hoy.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {painCards.map((card) => (
                <article key={card.number} className="rv rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">{card.number}</p>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-[var(--color-ink)]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{card.body}</p>
                  <p className="mt-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 font-mono text-sm font-semibold text-[var(--color-ink)]">{card.data}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SystemFlowScroll />
        <CoreModules />

        <section className="px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl rv">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
                Más negocio cuando la cartera ya tiene datos.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: PlugZap,
                  visual: SmartHomeSVG,
                  title: 'Medición en tiempo real',
                  body: 'Medidores inteligentes opcionales para detectar el consumo mientras ocurre y activar reglas operativas.',
                  note: 'No obligatorio para el diagnóstico inicial',
                },
                {
                  icon: BatteryCharging,
                  visual: BatteryArbitrageSVG,
                  title: 'Batería y arbitraje OMIE',
                  body: 'Simulación avanzada para carteras con solar, baterías o potencial de arbitraje horario.',
                  note: 'Escenarios y sensibilidad de payback',
                },
              ].map(({ icon: Icon, visual: Visual, title, body, note }) => (
                <article key={title} className="rv grid min-h-[320px] gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:grid-cols-[1fr_150px] md:items-center">
                  <div>
                    <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                    <h3 className="mt-6 font-display text-2xl font-semibold text-[var(--color-ink)]">{title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">{body}</p>
                    <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">{note}</p>
                  </div>
                  <div className="flex h-36 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)]">
                    <Visual className="h-32 w-32" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SENSORS & HARDWARE ── */}
        <section id="sensores" className="border-y border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl rv">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">Hardware Inteligente</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
                No solo software. Instalamos sensores Shelly en cada apartamento.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
                Los medidores inteligentes detectan el consumo mientras ocurre y permiten actuar antes de que el kWh se convierta en factura.
              </p>
            </div>
            <div className="rv grid gap-4 md:grid-cols-3">
              {[
                { name: 'Shelly EM', func: 'Medición consumo total', price: '~60 €', desc: 'Instalado en la entrada general del cuadro eléctrico. Mide kWh totales, voltaje, corriente y factor de potencia en tiempo real.', tag: 'Medición' },
                { name: 'Shelly Pro 4PM', func: 'Control 4 circuitos', price: '~80 €', desc: 'Controla y mide 4 circuitos independientes: termo, AC, lavadora, cocina. Permite activar/desactivar remotamente cada línea.', tag: 'Control' },
                { name: 'Shelly H&T', func: 'Temperatura y humedad', price: '~18 €', desc: 'Sensor ambiental para salón o zona común. Monitoriza confort, detecta presencia por variación térmica y ayuda a validar reglas de climatización.', tag: 'Ambiente' },
              ].map((sensor) => (
                <article key={sensor.name} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                  <span className="inline-block rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-ink)]">{sensor.tag}</span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[var(--color-ink)]">{sensor.name}</h3>
                  <p className="mt-1 font-mono text-sm font-semibold text-[var(--color-muted)]">{sensor.func}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{sensor.desc}</p>
                  <p className="mt-6 font-mono text-2xl font-semibold text-[var(--color-ink)]">{sensor.price}</p>
                  <p className="text-xs text-[var(--color-muted)]">por unidad</p>
                </article>
              ))}
            </div>
            <div className="rv mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] p-6 text-[var(--color-surface)] md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-soft)]">Kit por apartamento</p>
                  <p className="mt-2 font-mono text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none">158 €</p>
                  <p className="mt-2 text-sm text-[var(--color-data-muted)]">+ 120-200 € instalación profesional</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-data-muted)]">Inversión total</p>
                  <p className="mt-2 font-mono text-3xl font-semibold">~300 €</p>
                  <p className="text-sm text-[var(--color-data-muted)]">por apartamento</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BATERÍAS & ARBITRAJE ── */}
        <section id="baterias" className="px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl rv">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">Arbitraje Energético</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
                Convertimos las diferencias de precio entre periodos tarifarios en margen.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
                Carga baterías cuando la energía es barata (P3) y descarga cuando es cara (P1). El diferencial de precio se convierte en ahorro operativo recurrente.
              </p>
            </div>
            <div className="rv grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Sin batería</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-muted)]">Precio P1 (punta)</span>
                    <span className="font-mono font-semibold text-[var(--color-ink)]">0,20 €/kWh</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-muted)]">Precio P3 (valle)</span>
                    <span className="font-mono font-semibold text-[var(--color-ink)]">0,08 €/kWh</span>
                  </div>
                  <div className="border-t border-[var(--color-border)] pt-4">
                    <p className="text-sm text-[var(--color-muted)]">Margen no aprovechado</p>
                    <p className="mt-1 font-mono text-3xl font-semibold text-[var(--color-viz-fuera-reserva)]">0,12 €/kWh</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-ink)]">Con batería</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-ink)]">Carga en P3</span>
                    <span className="font-mono font-semibold text-[var(--color-accent-ink)]">0,08 €/kWh</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-ink)]">Descarga en P1</span>
                    <span className="font-mono font-semibold text-[var(--color-accent-ink)]">0,20 €/kWh</span>
                  </div>
                  <div className="border-t border-[var(--color-accent-soft)] pt-4">
                    <p className="text-sm text-[var(--color-ink)]">Margen capturado</p>
                    <p className="mt-1 font-mono text-3xl font-semibold text-[var(--color-accent-ink)]">+0,12 €/kWh</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rv mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="flex items-center gap-3">
                  <BatteryCharging className="h-8 w-8 text-[var(--color-accent)]" />
                  <div>
                    <p className="font-display text-lg font-semibold text-[var(--color-ink)]">Huawei Luna 2000</p>
                    <p className="font-mono text-sm text-[var(--color-muted)]">10 kWh · expandible a 30 kWh</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ['5.500 €', 'instalada'],
                    ['350-700 €/año', 'ahorro adicional'],
                    ['5-7 años', 'ROI estimado'],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-xl bg-[var(--color-surface-alt)] p-4 text-center">
                      <p className="font-mono text-2xl font-semibold text-[var(--color-ink)]">{value}</p>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[var(--color-muted)]">10 años de garantía · Instalación profesional incluida · Monitorización en Tramo</p>
              </div>
            </div>
            <div className="rv mt-6">
              <TextCta href="mailto:hola@tramo.energy">Solicitar estudio de arbitraje</TextCta>
            </div>
          </div>
        </section>

        <DashboardProof />

        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {[
              [counterRefs[0], '32', '', 'propiedades monitorizadas'],
              [counterRefs[1], '184', ' kWh', 'detectados fuera de estancia'],
              [counterRefs[2], '180', ' €/año', 'estimación media por CUPS'],
            ].map(([ref, initial, suffix, label], index) => (
              <div key={label as string} className="rv rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-8 text-center">
                <p className="font-mono text-[clamp(3rem,7vw,5rem)] font-semibold leading-none text-[var(--color-ink)]">
                  <span ref={ref as React.RefObject<HTMLSpanElement>}>{initial as string}{suffix as string}</span>
                </p>
                <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">{label as string}</p>
                {index === 2 && <p className="mt-3 text-xs text-[var(--color-muted)]">Estimación prudente, no garantía de ahorro.</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl rv">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
                Diagnóstico sin credenciales ni promesas infladas.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                [ShieldCheck, 'Datos en la UE', 'Servidores europeos con cifrado en reposo y en tránsito. Datos segregados por cartera, acceso limitado al equipo autorizado.'],
                [LockKeyhole, 'Sin scraping ni credenciales', 'Tú decides qué datos compartir. Sin acceso automatizado a PMS, facturas ni CUPS sin tu autorización explícita.'],
                [Gauge, 'Sin lock-in ni permanencia', 'Piloto con datos reales y sin configuración técnica. Si decides parar, los datos son tuyos y la baja es inmediata.'],
              ].map(([Icon, title, body], index) => {
                const TypedIcon = Icon as typeof ShieldCheck;
                return (
                  <article key={title as string} className="rv rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                    <TypedIcon className="h-6 w-6 text-[var(--color-accent)]" />
                    <h3 className="mt-6 font-display text-xl font-semibold text-[var(--color-ink)]">{title as string}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{body as string}</p>
                    {index === 0 && <p className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3 font-mono text-xs font-semibold text-[var(--color-ink)]">Certificado ISO 27001 del proveedor cloud</p>}
                    {index === 2 && <p className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3 font-mono text-xs font-semibold text-[var(--color-accent-ink)]">Piloto sin coste · sin tarjeta</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="precios" className="px-5 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl rv">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">Precios</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-[var(--color-ink)]">
                Inversión que se recupera con el ahorro operativo.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
                Todos los planes incluyen piloto gratuito, sin permanencia ni tarjeta. El ahorro estimado supera el coste en todos los tramos.
              </p>
            </div>
            <div className="rv grid gap-4 md:grid-cols-4">
              {[
                { name: 'Starter', range: '10-24', price: '150-250 €/mes', saving: '1.200 €/año', cta: 'Diagnosticar' },
                { name: 'Professional', range: '25-49', price: '300-500 €/mes', saving: '3.000 €/año', cta: 'Diagnosticar', highlight: true },
                { name: 'Enterprise', range: '50-99', price: '500-750 €/mes', saving: '6.000 €/año', cta: 'Diagnosticar' },
                { name: 'Scale', range: '100+', price: '750-1.250 €/mes', saving: '12.000 €/año', cta: 'Hablar con ventas' },
              ].map((plan) => (
                <article key={plan.name} className={`rounded-2xl border p-6 ${plan.highlight ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]' : 'border-[var(--color-border)] bg-[var(--color-surface)]'}`}>
                  <p className="font-display text-lg font-semibold text-[var(--color-ink)]">{plan.name}</p>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">{plan.range} apartamentos</p>
                  <p className="mt-6 font-mono text-sm font-semibold text-[var(--color-muted)]">Desde</p>
                  <p className="font-mono text-2xl font-semibold text-[var(--color-ink)]">{plan.price}</p>
                  <div className="mt-4 rounded-xl bg-[var(--color-accent-soft)] p-3">
                    <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-ink)]">Ahorro estimado</p>
                    <p className="mt-1 text-center font-mono text-xl font-semibold text-[var(--color-accent-ink)]">{plan.saving}</p>
                  </div>
                  <div className="mt-6">
                    <ScaleBarBtn href="#diagnostico" variant={plan.highlight ? 'solid' : 'outline'} className="w-full justify-center">{plan.cta}</ScaleBarBtn>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-accent)]" /> Piloto gratuito</div>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-accent)]" /> Sin tarjeta</div>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-accent)]" /> Sin permanencia</div>
                  </div>
                </article>
              ))}
            </div>
            <div className="rv mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">Add-ons opcionales</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl bg-[var(--color-surface)] p-4">
                  <div>
                    <p className="font-display text-sm font-semibold text-[var(--color-ink)]">+ Sensores Shelly</p>
                    <p className="text-xs text-[var(--color-muted)]">Instalación y configuración por apartamento</p>
                  </div>
                  <p className="font-mono text-lg font-semibold text-[var(--color-ink)]">+300 €/apt</p>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[var(--color-surface)] p-4">
                  <div>
                    <p className="font-display text-sm font-semibold text-[var(--color-ink)]">+ Batería</p>
                    <p className="text-xs text-[var(--color-muted)]">Huawei Luna 2000 · estudio personalizado</p>
                  </div>
                  <p className="font-mono text-lg font-semibold text-[var(--color-ink)]">Consultar</p>
                </div>
              </div>
              <div className="mt-4">
                <TextCta href="/precios">Calcula tu ahorro con nuestra calculadora</TextCta>
              </div>
            </div>
          </div>
        </section>

        <section id="diagnostico" className="border-t border-[var(--color-border)] bg-[var(--color-ink)] px-5 py-24 text-[var(--color-surface)] md:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rv">
              <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.02]">¿Listo para controlar tu cartera?</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-data-muted)]">
                Revisamos cuántas propiedades tienes, qué datos están disponibles y dónde puede haber kWh sin explicación antes de plantear un piloto.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ScaleBarBtn href="mailto:hola@tramo.energy">Solicitar diagnóstico</ScaleBarBtn>
                <ScaleBarBtn href="mailto:hola@tramo.energy" variant="darkOutline">
                  Hablar con ventas
                </ScaleBarBtn>
              </div>
            </div>
            <form className="rv rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] p-4 md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {['Nombre', 'Empresa / gestora', 'Email corporativo', 'Nº alojamientos', 'Ciudad / región', 'PMS utilizado'].map((label) => (
                  <label key={label} className="block">
                    <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-data-muted)]">{label}</span>
                    <input
                      suppressHydrationWarning
                      className="h-11 w-full rounded-lg border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-3 text-sm text-[var(--color-surface)] outline-offset-2 placeholder:text-[var(--color-data-muted)]"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {['Datadis/CUPS', 'Facturas recientes', 'Dolor principal'].map((label) => (
                  <label key={label} className="block">
                    <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-data-muted)]">{label}</span>
                    <select
                      suppressHydrationWarning
                      className="h-11 w-full rounded-lg border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-3 text-sm text-[var(--color-surface)] outline-offset-2"
                    >
                      <option>Sí</option>
                      <option>No</option>
                      <option>No lo sé</option>
                    </select>
                  </label>
                ))}
              </div>
              <p className="mt-5 rounded-lg border border-[rgba(255,255,255,0.16)] p-3 text-sm leading-relaxed text-[var(--color-data-muted)]">
                No envíes credenciales ni facturas por este formulario. En la llamada revisamos qué datos tienes disponibles y cómo preparar un piloto seguro.
              </p>
            </form>
          </div>
        </section>

        <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
            <div>
              <p className="font-display text-xl font-semibold text-[var(--color-ink)]">Tramo</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">Consumo atribuido por reserva y propietario.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-ink)]">Producto</p>
                <ul className="mt-4 space-y-2">
                  {['Fuera de reserva','Tarifa y potencia','Reglas por reserva','Informes propietarios'].map(l => <li key={l}><a href="#" className="inline-flex min-h-6 items-center py-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">{l}</a></li>)}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-ink)]">Legal</p>
                <ul className="mt-4 space-y-2">
                  {['Privacidad','Términos','Contacto'].map(l => <li key={l}><a href="#" className="inline-flex min-h-6 items-center py-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">{l}</a></li>)}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
