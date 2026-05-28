'use client';

import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

type PropertyData = {
  id: string;
  name: string;
  status: 'Ocupado' | 'Vacío' | 'Limpieza';
  consumption: number; // kWh actual
  peak: number;       // kWh pico
  bars: number[];     // 12 valores horarios
};

const INITIAL_PROPERTIES: PropertyData[] = [
  { id: 'VGO-014', name: 'Vigo Centro', status: 'Vacío', consumption: 4.2, peak: 6.8, bars: [0.3, 0.2, 0.1, 0.1, 0.2, 0.4, 0.6, 0.8, 0.7, 0.5, 0.3, 0.2] },
  { id: 'COR-007', name: 'A Coruña Marina', status: 'Ocupado', consumption: 8.4, peak: 9.2, bars: [0.5, 0.4, 0.6, 0.7, 0.9, 1.0, 0.8, 0.6, 0.7, 0.8, 0.9, 0.7] },
  { id: 'SJO-021', name: 'Sanxenxo Playa', status: 'Limpieza', consumption: 3.1, peak: 5.0, bars: [0.2, 0.1, 0.3, 0.5, 0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.4, 0.3] },
  { id: 'MDR-003', name: 'Madrid Letras', status: 'Ocupado', consumption: 12.1, peak: 14.5, bars: [0.8, 0.7, 0.9, 1.0, 0.8, 0.6, 0.7, 0.9, 1.1, 1.2, 1.0, 0.9] },
];

function cssVar(name: string) {
  return `var(${name})`;
}

function perturb(bars: number[]): number[] {
  return bars.map(v => {
    const delta = (Math.random() - 0.5) * 0.25;
    return Math.max(0.05, Math.min(1.3, v + delta));
  });
}

function PropertyBars({ bars, color }: { bars: number[]; color: string }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const prevBars = useRef(bars);

  useEffect(() => {
    bars.forEach((h, i) => {
      const el = refs.current[i];
      if (!el) return;
      gsap.to(el, {
        height: `${h * 100}%`,
        duration: 1.2,
        ease: 'power1.inOut',
      });
    });
    prevBars.current = bars;
  }, [bars]);

  return (
    <div className="flex h-14 items-end gap-[3px]">
      {bars.map((_, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el; }}
          className="flex-1 rounded-t-sm transition-[background-color,box-shadow] duration-300 cursor-pointer"
          style={{
            height: '0%',
            background: color,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = cssVar('--color-accent');
            el.style.boxShadow = `0 0 12px ${cssVar('--color-accent')}80`;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = color;
            el.style.boxShadow = 'none';
          }}
        />
      ))}
    </div>
  );
}

export default function HeroInteractiveDemo() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const liveDotRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pulse the live indicator
  useEffect(() => {
    const dot = liveDotRef.current;
    if (!dot) return;
    gsap.to(dot, {
      opacity: 0.3,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProperties(prev =>
        prev.map(p => ({
          ...p,
          bars: perturb(p.bars),
          consumption: Math.round((p.bars.reduce((a, b) => a + b, 0) * 2 + (Math.random() - 0.5) * 0.5) * 10) / 10,
        }))
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    gsap.from(container.querySelectorAll('.demo-row'), {
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case 'Ocupado': return cssVar('--color-accent');
      case 'Vacío': return cssVar('--color-warning');
      case 'Limpieza': return cssVar('--color-muted');
      default: return cssVar('--color-muted');
    }
  };

  const barColor = (index: number) => {
    const colors = [
      cssVar('--color-accent-soft'),
      '#B8E6C8',
      '#8DD9A8',
      cssVar('--color-accent'),
    ];
    return colors[index % colors.length];
  };

  const totalConsumption = properties.reduce((sum, p) => sum + p.consumption, 0);
  const totalPeak = properties.reduce((sum, p) => sum + p.peak, 0);

  return (
    <div
      ref={containerRef}
      className="rv mx-auto mt-12 max-w-5xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm md:p-7"
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            ref={liveDotRef}
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: cssVar('--color-accent') }}
          />
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
            Monitorización en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Total activo</p>
            <p className="font-mono text-lg font-semibold text-[var(--color-ink)] tabular-nums">{totalConsumption.toFixed(1)} kWh</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">Pico conjunto</p>
            <p className="font-mono text-lg font-semibold text-[var(--color-ink)] tabular-nums">{totalPeak.toFixed(1)} kW</p>
          </div>
        </div>
      </div>

      {/* Property rows */}
      <div className="space-y-2">
        {properties.map((prop, index) => (
          <div
            key={prop.id}
            className="demo-row grid grid-cols-[1fr_1.5fr_80px] items-center gap-4 rounded-xl border border-[var(--color-border)] px-4 py-3 transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_14px_rgba(9,207,88,0.12)] md:grid-cols-[1fr_2fr_90px]"
          >
            {/* Property info */}
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold text-[var(--color-ink)]">{prop.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-mono text-[10px] font-semibold text-[var(--color-muted)]">{prop.id}</span>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold"
                  style={{
                    background: `${statusColor(prop.status)}18`,
                    color: statusColor(prop.status),
                  }}
                >
                  {prop.status}
                </span>
              </div>
            </div>

            {/* Bars */}
            <PropertyBars bars={prop.bars} color={barColor(index)} />

            {/* Current consumption */}
            <div className="text-right">
              <p className="font-mono text-sm font-semibold tabular-nums text-[var(--color-ink)]">{prop.consumption.toFixed(1)}</p>
              <p className="font-mono text-[10px] text-[var(--color-muted)]">kWh</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <p className="mt-4 text-center font-mono text-[10px] text-[var(--color-muted)]">
        Pasa el ratón sobre las barras — datos simulados actualizados cada 2,5 s
      </p>
    </div>
  );
}
