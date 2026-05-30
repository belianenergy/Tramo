'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight, BatteryCharging, BellRing, Building2, CalendarClock,
  CheckCircle2, Database, FileText, Gauge, Layers3, LockKeyhole,
  Menu, PlugZap, ReceiptText, ShieldCheck, SlidersHorizontal,
  Sparkles, X, Zap, TrendingUp, BarChart3, Activity,
  type LucideIcon,
} from 'lucide-react';
import { useRef, useState, type FormEvent, type ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Data ──

const navItems = [
  ['Producto', '#producto'],
  ['Operación', '#accion'],
  ['Precios', '#precios'],
  ['Contacto', '#diagnostico'],
];

const stats = [
  ['+30%', 'reducción en standby', '#fa3d1d'],
  ['14 días', 'detección de fuga', '#ffb005'],
  ['2.400 kWh', 'ahorro anual medio', '#0358f7'],
];

const problems = [
  { title: 'Energía fantasma', body: 'El 40% del consumo ocurre fuera de estancia. Nevera, WiFi, termostato. No se atribuye.', metric: '01 · Detección', icon: Zap, accent: '#fa3d1d', accentSoft: 'rgba(250, 61, 29, 0.08)' },
  { title: 'Potencia contratada errónea', body: 'La mayoría paga de más por potencia contratada. Otros saltan el ICP cada semana.', metric: '02 · Optimización', icon: Gauge, accent: '#ffb005', accentSoft: 'rgba(255, 176, 5, 0.08)' },
  { title: 'Informes manuales', body: 'Excel con datos de Datadis copiados a mano. Cada propietario recibe versiones distintas.', metric: '03 · Atribución', icon: FileText, accent: '#0358f7', accentSoft: 'rgba(3, 88, 247, 0.08)' },
  { title: 'Sin visibilidad operativa', body: 'Las alarmas de Shelly no se correlacionan con reservas. No hay priorización real.', metric: '04 · Loop cerrado', icon: Activity, accent: '#c679c4', accentSoft: 'rgba(198, 121, 196, 0.08)' },
];

const modules = [
  { title: 'Monitorización en tiempo real', body: 'Consumo por CUPS, por reserva, por estancia. Atribución granular.', icon: Gauge, tags: ['Shelly', 'Datadis'], accent: '#0358f7', accentSoft: 'rgba(3, 88, 247, 0.08)' },
  { title: 'Atribución por reserva', body: 'Cada kWh se asigna a una reserva, zona común o standby estructural.', icon: Database, tags: ['Algoritmo', 'Trazable'], accent: '#c679c4', accentSoft: 'rgba(198, 121, 196, 0.08)' },
  { title: 'Recomendación de potencia', body: 'Análisis histórico de picos. Potencia óptima sin riesgo de corte.', icon: SlidersHorizontal, tags: ['IA', 'Histórico'], accent: '#ffb005', accentSoft: 'rgba(255, 176, 5, 0.08)' },
  { title: 'Informes por propietario', body: 'PDFs automáticos con consumo, coste y acciones.', icon: FileText, tags: ['PDF', 'Automático'], accent: '#fa3d1d', accentSoft: 'rgba(250, 61, 29, 0.08)' },
  { title: 'Control de electrodomésticos', body: 'ACS, climatización y VE. Reglas por tarifa.', icon: BatteryCharging, tags: ['Shelly', 'Relay'], accent: '#c679c4', accentSoft: 'rgba(198, 121, 196, 0.08)' },
  { title: 'Batería y arbitraje', body: 'Carga en horas valle, descarga en punta. Maximiza autoconsumo.', icon: PlugZap, tags: ['Huawei', 'Arbitraje'], accent: '#0358f7', accentSoft: 'rgba(3, 88, 247, 0.08)' },
];

const pricingTiers = [
  { name: 'Starter', price: '150-250', aptos: '5-15', features: ['Monitorización', 'Informes mensuales', 'Atribución por reserva', 'Soporte email'], recommended: false, accent: '#c679c4' },
  { name: 'Pro', price: '300-500', aptos: '15-50', features: ['Todo Starter', 'Recomendación potencia', 'Control remoto', 'Informes propietarios', 'Soporte prioritario'], recommended: true, accent: '#fa3d1d' },
  { name: 'Business', price: '500-750', aptos: '50-100', features: ['Todo Pro', 'Batería y arbitraje', 'API abierta', 'Multi-PMS', 'Gestor dedicado'], recommended: false, accent: '#ffb005' },
  { name: 'Scale', price: '750-1.250', aptos: '100+', features: ['Todo Business', 'White-label', 'SLA 99.9%', 'Integración a medida', 'Onboarding dedicado'], recommended: false, accent: '#0358f7' },
];

const diagnosticSelects = [
  { label: 'Tipo de gestor', name: 'manager_type', options: ['Seleccionar…', 'Gestor profesional', 'Propietario múltiple', 'Plataforma turística', 'Otro'] },
  { label: 'Factura mensual', name: 'bill_range', options: ['Seleccionar…', '< 500 €', '500-1.500 €', '1.500-5.000 €', '> 5.000 €'] },
  { label: '¿Tiene sensores?', name: 'sensors', options: ['Seleccionar…', 'Sí, Shelly', 'Sí, otro', 'No, pero quiero'] },
];

const compliance = [
  { icon: ShieldCheck, text: 'Datos en UE. Sin transferencia a terceros países.', accent: '#0358f7', accentSoft: 'rgba(3, 88, 247, 0.08)' },
  { icon: LockKeyhole, text: 'Cifrado en tránsito (TLS 1.3) y en reposo (AES-256).', accent: '#fa3d1d', accentSoft: 'rgba(250, 61, 29, 0.08)' },
  { icon: CalendarClock, text: 'Retención configurable. Borrado a petición (RGPD art. 17).', accent: '#c679c4', accentSoft: 'rgba(198, 121, 196, 0.08)' },
];

// ── Spectrum Gradient decorative elements ──

function SpectrumStrip({ className = '' }: { className?: string }) {
  return <div className={`h-[3px] w-full rounded-full ${className}`} style={{ background: 'var(--gradient-spectrum)' }} />;
}

function MarqueeStrip() {
  const items = [
    { text: '+30% reducción standby', color: '#fa3d1d' },
    { text: '14 días detección fuga', color: '#ffb005' },
    { text: '2.400 kWh ahorro/año', color: '#0358f7' },
    { text: '5-100+ apartamentos', color: '#c679c4' },
    { text: 'Shelly + Datadis + PMS', color: '#fa3d1d' },
    { text: 'RGPD compliant', color: '#0358f7' },
  ];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3" style={{ background: 'var(--fog)' }}>
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: 'marquee-scroll 40s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-[12px] font-medium" style={{ color: item.color }}>
            {item.text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function SpectrumGlow({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        background: 'var(--gradient-spectrum)',
        filter: 'blur(100px)',
        opacity: 0.20,
        borderRadius: '50%',
        ...style,
      }}
    />
  );
}

// ── Frosted Card component ──

function FrostedCard({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[30px] p-8 ${className}`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── CTA button (Dia neutral button) ──

function DiaButton({
  href, children, variant = 'neutral', className = '',
}: {
  href: string; children: ReactNode; variant?: 'neutral' | 'ghost' | 'outline'; className?: string;
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-display text-[15px] font-medium transition-all duration-200 active:translate-y-px';
  const size = 'min-h-[48px] px-6';
  const styles = {
    neutral: `${size} rounded-[30px] bg-[var(--pebble)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--snow)]`,
    ghost: `${size} rounded-[9999px] bg-transparent text-[var(--ink)] hover:bg-[var(--fog)]`,
    outline: `${size} rounded-[30px] bg-transparent text-[var(--ink)] hover:bg-[var(--fog)]`,
  };
  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`}>
      <span>{children}</span>
      {variant === 'neutral' && <ArrowRight className="h-4 w-4" />}
    </a>
  );
}

// ── Section heading (Dia style: 54px, weight 300, -0.04em tracking) ──

function DiaHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-[clamp(2.5rem,5vw,3.5rem)] font-light leading-[1.1] text-[var(--ink)] ${className}`}
      style={{ letterSpacing: '-0.04em' }}
    >
      {children}
    </h2>
  );
}

function DiaEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">
      {children}
    </p>
  );
}

// ── Sections ──

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const chartBarsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const elements = ref.current.querySelectorAll('.anim-up');
    gsap.fromTo(elements, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out' });

    // Laptop mockup: gentle float
    const mockup = mockupRef.current;
    if (mockup) {
      gsap.to(mockup, { y: -8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    // Chart bars: staggered grow animation
    const chartBars = chartBarsRef.current;
    if (chartBars) {
      const bars = chartBars.querySelectorAll('.chart-bar');
      gsap.fromTo(bars, { scaleY: 0 }, {
        scaleY: 1, stagger: 0.04, duration: 0.6, ease: 'power2.out',
        delay: 0.8, transformOrigin: 'bottom center',
      });
    }

    // Stats: counting animation
    const statItems = ref.current.querySelectorAll('.stat-item');
    if (statItems.length) {
      gsap.fromTo(statItems, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out', delay: 0.5 });
    }
  }, { scope: ref });

  // Alert pulse animation
  const alertDotKeyframes = `@keyframes alert-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }`;

  return (
    <section ref={ref} className="relative overflow-hidden px-5 pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Animated spectrum gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute h-[600px] w-[800px] -top-40 -left-40"
          style={{
            background: 'var(--gradient-spectrum)',
            filter: 'blur(120px)',
            opacity: 0.15,
            borderRadius: '50%',
            animation: 'gradient-drift 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute h-[500px] w-[600px] -bottom-20 -right-20"
          style={{
            background: 'var(--gradient-spectrum)',
            filter: 'blur(100px)',
            opacity: 0.10,
            borderRadius: '50%',
            animation: 'gradient-drift 6s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Animated gradient sweep strip */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[1px]" style={{ overflow: 'hidden' }}>
        <div
          className="absolute h-full w-[40%]"
          style={{
            background: 'var(--gradient-spectrum)',
            animation: 'sweep-x 4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes gradient-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 20px) scale(1.1); }
          66% { transform: translate(-20px, -15px) scale(0.95); }
        }
        @keyframes sweep-x {
          0% { left: -40%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes alert-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
      `}</style>

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT: Headline */}
          <div>
            <p className="anim-up mb-5 text-lg text-[var(--graphite)]">
              Control energético para carteras turísticas
            </p>

            <h1
              className="anim-up font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.08] text-[var(--ink)]"
              style={{ letterSpacing: '-0.04em' }}
            >
              Tu energía, atribuida<br />
              <span className="text-[var(--graphite)]">a cada reserva.</span>
            </h1>

            <p className="anim-up mt-6 max-w-md text-lg leading-relaxed text-[var(--graphite)]">
              Detecta consumos fuera de estancia, optimiza la potencia contratada e informa a propietarios con datos reales.
            </p>

            <div className="anim-up mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <DiaButton href="#diagnostico">Solicitar diagnóstico</DiaButton>
              <DiaButton href="/app/dashboard" variant="ghost">Ver dashboard demo</DiaButton>
            </div>

            {/* Stats row */}
            <div ref={statsRef} className="stat-grid mt-12 grid grid-cols-3 gap-6">
              {stats.map(([value, label, accent]) => (
                <div key={label as string} className="stat-item">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ background: accent as string }} />
                    <p className="font-display text-2xl font-light text-[var(--ink)]" style={{ letterSpacing: '-0.03em' }}>
                      {value}
                    </p>
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--slate)]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Animated laptop mockup */}
          <div ref={mockupRef} className="anim-up relative">
            <SpectrumGlow className="-right-20 top-10 h-[350px] w-[400px] opacity-40" />
            <div className="relative">
              {/* Laptop screen frame */}
              <div className="rounded-[20px] p-1" style={{ background: 'var(--fog)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px' }}>
                {/* macOS-style window bar */}
                <div className="flex items-center gap-2 rounded-t-[16px] px-4 py-3" style={{ background: 'var(--fog)' }}>
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[var(--steel)]" />
                    <div className="h-3 w-3 rounded-full bg-[var(--pebble)]" />
                    <div className="h-3 w-3 rounded-full bg-[var(--graphite)]" />
                  </div>
                  <span className="ml-2 font-mono text-[10px] text-[var(--slate)]">tramo.energy/dashboard</span>
                </div>

                {/* Dashboard content */}
                <div className="rounded-b-[16px] p-5" style={{ background: 'var(--snow)' }}>
                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="font-display text-sm font-medium text-[var(--ink)]" style={{ letterSpacing: '-0.02em' }}>Dashboard</p>
                      <p className="text-[11px] text-[var(--slate)]">5 propiedades · Últimas 24h</p>
                    </div>
                    <div className="flex gap-1">
                      <span className="rounded-[9999px] bg-[var(--ink)] px-2 py-1 font-mono text-[9px] font-medium text-[var(--snow)]">Hoy</span>
                      <span className="rounded-[9999px] px-2 py-1 font-mono text-[9px] text-[var(--slate)]">7d</span>
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="mb-4 grid grid-cols-3 gap-2">
                    {[
                      ['12.4 kWh', 'Consumo', '#000000'],
                      ['€3.80', 'Coste', '#636363'],
                      ['32%', 'Fuera', '#fa3d1d'],
                    ].map(([val, label, color]) => (
                      <div key={label as string} className="rounded-[12px] p-3 transition-all duration-200 hover:bg-[var(--fog)]" style={{ background: 'var(--fog)' }}>
                        <p className="font-display text-[15px] font-light" style={{ letterSpacing: '-0.02em', color: color as string }}>{val}</p>
                        <p className="mt-0.5 text-[9px] text-[var(--slate)]">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Animated chart */}
                  <div className="mb-4 rounded-[12px] p-3" style={{ background: 'var(--fog)' }}>
                    <p className="mb-2 text-[10px] font-medium text-[var(--graphite)]">Consumo por franja horaria</p>
                    <div ref={chartBarsRef} className="flex items-end gap-[3px]" style={{ height: '64px' }}>
                      {[15, 8, 6, 4, 5, 12, 28, 45, 42, 38, 35, 30, 22, 18, 20, 25, 40, 52, 48, 44, 38, 30, 22, 18].map((h, i) => {
                        // Map each bar to a spectrum color based on intensity
                        const spectrumColors = ['#c679c4', '#c679c4', '#fa3d1d', '#fa3d1d', '#ffb005', '#ffb005', '#e1e1fe', '#0358f7'];
                        const intensityIdx = h >= 45 ? 7 : h >= 35 ? 6 : h >= 25 ? 5 : h >= 15 ? 3 : 1;
                        return (
                          <div
                            key={i}
                            className="chart-bar flex-1 rounded-[2px]"
                            style={{
                              height: `${h}%`,
                              background: spectrumColors[intensityIdx],
                              opacity: 0.6 + (h / 100) * 0.4,
                              transform: 'scaleY(0)',
                              transformOrigin: 'bottom center',
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Alerts with pulsing dots */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-medium text-[var(--graphite)]">Alertas activas</p>
                    {[
                      ['Standby excesivo', 'Casa Norte — 2.4 kWh', '#fa3d1d'],
                      ['Potencia > contratada', 'Ático Playa — 5.2 kW', '#ffb005'],
                      ['Fuera de estancia', 'Calle Mayor 3 — nevera', '#0358f7'],
                    ].map(([title, detail, color]) => (
                      <div key={title as string} className="flex items-start gap-2.5 rounded-[12px] p-2.5 transition-all duration-200 hover:bg-[var(--fog)]" style={{ background: 'var(--fog)' }}>
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: color as string, animation: 'alert-pulse 2s ease-in-out infinite' }} />
                        <div>
                          <p className="text-[11px] font-medium text-[var(--ink)]">{title}</p>
                          <p className="text-[9px] text-[var(--slate)]">{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Laptop base */}
              <div className="mx-auto mt-[-2px] h-[8px] w-[110%] -translate-x-[5%] rounded-b-[12px]" style={{ background: 'var(--fog)' }} />
              <div className="mx-auto mt-0 h-[4px] w-[120%] -translate-x-[10%] rounded-b-[8px]" style={{ background: 'var(--pebble)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problems() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll('.problem-card');
    gsap.fromTo(cards, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative overflow-hidden px-5 py-24 md:py-32">
      <div className="relative mx-auto max-w-[1200px]">
        <div className="text-center">
          <DiaEyebrow>El problema</DiaEyebrow>
          <DiaHeading className="mt-4">
            Pagas energía que no sabes quién consume.
          </DiaHeading>
          <p className="mx-auto mt-4 max-w-lg text-lg text-[var(--graphite)]">
            Las gestoras de apartamentos turísticos no tienen visibilidad real del consumo por reserva.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <FrostedCard key={item.title} className="problem-card group transition-all duration-200 hover:shadow-[rgba(0,0,0,0.12)_0px_0px_12px_0px]">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-[20px] transition-all duration-300 group-hover:scale-110"
                  style={{ background: item.accentSoft, color: item.accent }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: item.accent }}>{item.metric}</p>
                <h3
                  className="mt-3 font-display text-xl font-light text-[var(--ink)]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--graphite)]">{item.body}</p>
              </FrostedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OperationalFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const loop = [
    { title: 'Detectar', body: 'El sistema cruza consumo (Shelly), reservas (PMS) y datos de red (Datadis). Identifica fugas, standby innecesario y desviaciones de potencia.', tag: 'Entrada', detail: 'Lecturas cada 5 min', icon: BellRing, accent: '#0358f7', accentSoft: 'rgba(3, 88, 247, 0.08)' },
    { title: 'Priorizar', body: 'Motor de reglas clasifica alertas por impacto económico y urgencia. Lo que no cuesta, no molesta.', tag: 'Motor', detail: 'Score de prioridad 0-100', icon: Layers3, accent: '#c679c4', accentSoft: 'rgba(198, 121, 196, 0.08)' },
    { title: 'Aprobar', body: 'El usuario recibe una acción concreta: "Bajar potencia de 4.6 a 3.45 kW. Ahorro: 18 €/mes." Un clic para aprobar.', tag: 'Acción', detail: 'Requiere confirmación humana', icon: CheckCircle2, accent: '#ffb005', accentSoft: 'rgba(255, 176, 5, 0.08)' },
    { title: 'Informar', body: 'Informe mensual por propietario: consumo atribuido, acciones tomadas, ahorro acumulado. PDF listo para enviar.', tag: 'Salida', detail: 'PDF + dashboard', icon: ReceiptText, accent: '#fa3d1d', accentSoft: 'rgba(250, 61, 29, 0.08)' },
  ];

  useGSAP(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !viewport || !track || !progress) return;

    const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(track, { x: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });

      const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => ScrollTrigger.refresh()) : null;
      ro?.observe(viewport);
      ro?.observe(track);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section, pin: true, scrub: 0.45, anticipatePin: 1,
          invalidateOnRefresh: true,
          end: () => `+=${Math.max(window.innerHeight * 0.85, getDistance())}`,
          onUpdate: (s) => gsap.set(progress, { scaleX: s.progress }),
        },
      });

      return () => { ro?.disconnect(); tween.scrollTrigger?.kill(); tween.kill(); gsap.set([track, progress], { clearProps: 'all' }); };
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="accion" className="relative overflow-hidden px-5 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <DiaEyebrow>Loop operativo</DiaEyebrow>
            <DiaHeading className="mt-4">Detectar, priorizar, aprobar e informar.</DiaHeading>
            <p className="mt-4 max-w-md text-lg text-[var(--graphite)]">El producto no termina en una alerta. Termina cuando la gestora puede aprobar una acción.</p>
          </div>
          <div className="hidden md:block">
            <div className="mb-3 flex items-center justify-between font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--slate)]">
              <span>Scroll operativo</span><span>4 pasos</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-[var(--fog)]">
              <div ref={progressRef} className="h-full origin-left rounded-full" style={{ background: 'var(--gradient-spectrum)' }} />
            </div>
          </div>
        </div>

        <div ref={viewportRef} className="mt-10 md:-mr-[calc((100vw-100%)/2)] md:overflow-hidden md:pr-5">
          <div ref={trackRef} className="grid gap-5 md:flex md:w-max md:gap-5">
            {loop.map((item, i) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="min-w-0 md:flex md:h-[20rem] md:w-[min(24rem,72vw)] md:flex-col md:justify-between">
                  <FrostedCard className="h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] transition-all duration-300"
                        style={{ background: item.accentSoft, color: item.accent }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-[9999px] px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.12em]" style={{ color: item.accent, background: item.accentSoft }}>{item.tag}</span>
                    </div>
                    <h3
                      className="mt-6 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light leading-[1.08] text-[var(--ink)]"
                      style={{ letterSpacing: '-0.03em' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--graphite)]">{item.body}</p>
                  </FrostedCard>
                  <div className="mt-4 flex items-center justify-between font-mono text-xs" style={{ color: item.accent }}>
                    <span>Paso {i + 1}</span>
                    <span>{item.detail}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll('.module-card');
    gsap.fromTo(cards, { y: 40, opacity: 0, scale: 0.95 }, {
      y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
    });
  }, { scope: ref });

  return (
    <section id="producto" ref={ref} className="relative overflow-hidden px-5 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <DiaEyebrow>Producto</DiaEyebrow>
          <DiaHeading className="mt-4">Todo lo que necesita una gestora profesional.</DiaHeading>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--graphite)]">Seis módulos que cubren desde la detección hasta el arbitraje con batería.</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <FrostedCard key={m.title} className="module-card group transition-all duration-200 hover:shadow-[rgba(0,0,0,0.12)_0px_0px_12px_0px]">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-[20px] transition-all duration-300 group-hover:scale-110"
                  style={{ background: m.accentSoft, color: m.accent }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3
                  className="font-display text-xl font-light text-[var(--ink)]"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {m.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--graphite)]">{m.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-[9999px] px-3 py-1 font-mono text-[11px] font-medium transition-colors duration-200"
                      style={{ background: m.accentSoft, color: m.accent }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </FrostedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="precios" className="relative overflow-hidden px-5 py-24 md:py-32">
      <SpectrumGlow className="bottom-0 right-1/4 h-[300px] w-[400px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="text-center">
          <DiaEyebrow>Precios</DiaEyebrow>
          <DiaHeading className="mt-4">Piloto accesible. Escala con tu cartera.</DiaHeading>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--graphite)]">Precios orientativos. El diagnóstico gratuito define el plan exacto.</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <FrostedCard key={tier.name} className={`relative flex flex-col transition-all duration-200 ${tier.recommended ? 'ring-[var(--fog)]' : ''}`} style={tier.recommended ? { boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 12px 0px' } : undefined}>
              {tier.recommended && <SpectrumStrip className="absolute left-6 right-6 top-0" />}
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--slate)]">{tier.name}</p>
              <p className="mt-2 font-display text-3xl font-light text-[var(--ink)]" style={{ letterSpacing: '-0.02em' }}>
                {tier.price} <span className="text-base text-[var(--slate)]">€/mes</span>
              </p>
              <p className="mt-1 text-sm text-[var(--slate)]">{tier.aptos} aptos.</p>
              <hr className="my-5" style={{ borderColor: tier.recommended ? tier.accent + '30' : 'var(--fog)' }} />
              <ul className="flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[14px] text-[var(--graphite)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: tier.accent }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <DiaButton href="#diagnostico" variant={tier.recommended ? 'neutral' : 'ghost'} className="mt-6 w-full justify-center">
                Solicitar
              </DiaButton>
            </FrostedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compliance() {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-[20px] bg-[var(--fog)] text-[var(--ink)]">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <DiaHeading>Tus datos, bajo tu control.</DiaHeading>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--graphite)]">Diseñado para cumplir RGPD. Sin compromisos.</p>
        <div className="mx-auto mt-10 max-w-2xl space-y-4 text-left">
          {compliance.map((c) => {
            const Icon = c.icon;
            return (
              <FrostedCard key={c.text} className="flex items-start gap-4 py-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[16px]" style={{ background: c.accentSoft, color: c.accent }}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-[15px] leading-relaxed text-[var(--graphite)]">{c.text}</p>
              </FrostedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DiagnosticForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="diagnostico" className="relative overflow-hidden px-5 py-24 md:py-32">
      <SpectrumGlow className="-top-20 left-1/3 h-[300px] w-[400px]" />

      <div className="relative mx-auto max-w-[640px]">
        <div className="text-center">
          <DiaEyebrow>Diagnóstico gratuito</DiaEyebrow>
          <DiaHeading className="mt-4">¿Cuánta energía desperdicia tu cartera?</DiaHeading>
          <p className="mx-auto mt-4 max-w-lg text-lg text-[var(--graphite)]">Analizamos tus datos de consumo y reservas. Sin compromiso, sin credenciales.</p>
        </div>

        <FrostedCard className="mt-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              ['Nombre', 'name', 'text', 'name'],
              ['Empresa', 'company', 'text', 'organization'],
              ['Email', 'email', 'email', 'email'],
              ['Nº alojamientos', 'units', 'number', 'off'],
              ['Ciudad', 'region', 'text', 'address-level2'],
              ['PMS utilizado', 'pms', 'text', 'off'],
            ].map(([label, name, type, autocomplete]) => (
              <div key={name}>
                <label htmlFor={name} className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--slate)]">{label}</label>
                <input
                  id={name} name={name} type={type} autoComplete={autocomplete}
                  required={name === 'name' || name === 'email' || name === 'units'}
                  min={name === 'units' ? 1 : undefined}
                  className="h-12 w-full rounded-[16px] border px-4 text-[15px] text-[var(--ink)] outline-none transition-all duration-200 placeholder:text-[var(--steel)] focus:border-[var(--ink)]"
                  style={{ borderColor: 'var(--fog)', background: 'var(--snow)' }}
                />
              </div>
            ))}

            <div className="grid gap-4 sm:grid-cols-3">
              {diagnosticSelects.map(({ label, name, options }) => (
                <div key={label}>
                  <label htmlFor={name} className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--slate)]">{label}</label>
                  <select
                    id={name} name={name}
                    className="h-12 w-full rounded-[16px] border px-4 text-[15px] text-[var(--ink)] outline-none"
                    style={{ borderColor: 'var(--fog)', background: 'var(--snow)' }}
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <p className="rounded-[16px] p-3 text-[14px] text-[var(--slate)]" style={{ border: '1px solid var(--fog)' }}>
              No envíes credenciales ni facturas por este formulario. Primero definimos un piloto seguro.
            </p>

            {status === 'sent' && (
              <p className="rounded-[16px] p-3 text-[14px] font-medium text-[var(--graphite)]" style={{ border: '1px solid var(--fog)' }}>
                Solicitud recibida. Te responderemos con una propuesta de diagnóstico.
              </p>
            )}
            {status === 'error' && (
              <p className="rounded-[16px] p-3 text-[14px] font-medium" style={{ border: '1px solid var(--fog)', color: 'var(--crimson, #fa3d1d)' }}>
                No se pudo enviar. Revisa nombre, email y número de alojamientos.
              </p>
            )}

            <button
              type="submit" disabled={status === 'sending'}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[30px] bg-[var(--pebble)] px-6 text-[15px] font-medium text-[var(--ink)] transition-all duration-200 hover:bg-[var(--ink)] hover:text-[var(--snow)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
              <Sparkles className="h-4 w-4" />
            </button>
          </form>
        </FrostedCard>
      </div>
    </section>
  );
}

// ── Page ──

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="overflow-x-hidden" style={{ background: 'var(--canvas)', color: 'var(--ink)' }}>
      {/* Sticky header — #EFEFEF, backdrop-blur(24px), height ~52px */}
      <header
        className="sticky top-0 z-40"
        style={{ background: 'var(--fog)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        <div className="mx-auto flex h-[52px] max-w-[1200px] items-center justify-between px-5">
          <a href="#" className="font-display text-lg font-light text-[var(--ink)]" aria-label="Tramo inicio">
            Tram<span style={{ color: 'var(--graphite)' }}>o</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="text-[14px] font-normal text-[var(--ink)] transition-all duration-200 hover:opacity-60">{label}</a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="/app/dashboard" className="rounded-[9999px] px-4 py-2 text-[14px] font-medium text-[var(--ink)] transition-all duration-200 hover:bg-[var(--pebble)]">
              Ver demo
            </a>
            <a href="#diagnostico" className="rounded-[30px] bg-[var(--pebble)] px-5 py-2 text-[14px] font-medium text-[var(--ink)] transition-all duration-200 hover:bg-[var(--ink)] hover:text-[var(--snow)]">
              Diagnosticar
            </a>
          </div>

          <button type="button" onClick={() => setMobileOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] md:hidden" aria-label="Abrir navegación">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50" style={{ background: 'var(--canvas)' }}>
          <div className="flex h-16 items-center justify-between px-5">
            <a href="#" className="font-display text-xl font-light text-[var(--ink)]">Tramo</a>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Cerrar">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} className="rounded-[16px] px-4 py-3 font-display text-lg text-[var(--ink)] hover:bg-[var(--fog)]">{label}</a>
            ))}
          </nav>
        </div>
      )}

      <Hero />
      <MarqueeStrip />
      {/* Unified continuous background — 4 blobs covering full page flow */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          {/* Top-left: rose */}
          <div
            className="absolute"
            style={{
              background: 'radial-gradient(circle, #c679c4 0%, transparent 60%)',
              width: '900px',
              height: '900px',
              top: '-300px',
              left: '-200px',
              filter: 'blur(100px)',
              opacity: 0.10,
              animation: 'gradient-drift 14s ease-in-out infinite',
            }}
          />
          {/* Mid-upper: blue */}
          <div
            className="absolute"
            style={{
              background: 'radial-gradient(circle, #0358f7 0%, transparent 60%)',
              width: '800px',
              height: '800px',
              top: '800px',
              right: '-150px',
              filter: 'blur(120px)',
              opacity: 0.09,
              animation: 'gradient-drift 11s ease-in-out infinite reverse',
            }}
          />
          {/* Mid-lower: amber (covers modules, pricing, compliance) */}
          <div
            className="absolute"
            style={{
              background: 'radial-gradient(circle, #ffb005 0%, transparent 60%)',
              width: '900px',
              height: '900px',
              top: '2000px',
              left: '-100px',
              filter: 'blur(130px)',
              opacity: 0.08,
              animation: 'gradient-drift 13s ease-in-out infinite',
            }}
          />
          {/* Bottom: crimson (covers diagnostic + footer) */}
          <div
            className="absolute"
            style={{
              background: 'radial-gradient(circle, #fa3d1d 0%, transparent 60%)',
              width: '950px',
              height: '950px',
              bottom: '-200px',
              right: '-100px',
              filter: 'blur(140px)',
              opacity: 0.09,
              animation: 'gradient-drift 12s ease-in-out infinite reverse',
            }}
          />
        </div>
        <Problems />
        <SpectrumStrip className="mx-auto max-w-[1200px]" />
        <OperationalFlow />
        <Modules />
        <Pricing />
        <Compliance />
        <DiagnosticForm />
      </div>

      {/* Footer */}
      <footer className="px-5 py-16" style={{ borderTop: '1px solid var(--fog)' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-lg font-light text-[var(--ink)]">Tramo</p>
              <p className="mt-3 text-[14px] text-[var(--graphite)]">Control energético para carteras turísticas en España.</p>
            </div>
            {[
              ['Producto', ['Monitorización', 'Atribución', 'Potencia', 'Informes', 'Batería']],
              ['Empresa', ['Sobre nosotros', 'Blog', 'Contacto', 'Privacidad']],
              ['Legal', ['Términos', 'Privacidad', 'Cookies', 'RGPD']],
            ].map(([h, links]) => (
              <div key={h as string}>
                <p className="mb-3 text-[14px] font-medium text-[var(--ink)]">{h}</p>
                <ul className="space-y-2">
                  {(links as string[]).map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[14px] text-[var(--graphite)] underline decoration-transparent transition-all duration-200 hover:decoration-[var(--ink)]">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <hr className="my-10 border-[var(--fog)]" />
          <p className="text-center text-[13px] text-[var(--slate)]">© {new Date().getFullYear()} Tramo Energy.</p>
        </div>
      </footer>
    </main>
  );
}
