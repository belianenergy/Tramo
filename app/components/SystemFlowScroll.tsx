'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarCheck, Thermometer, BrainCircuit, Zap, PiggyBank, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: CalendarCheck,
    accent: '#6366f1', bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.2)',
    label: 'PMS', title: 'Check-out detectado',
    detail: 'Riazor 2B · 19/05 11:00',
    narrative: 'El PMS notifica el check-out. Tramo activa el contador de 30 minutos para el apagado automático de climatización.',
    tag: '2 huéspedes · limpieza 15:00',
  },
  {
    icon: Thermometer,
    accent: '#ef4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.25)',
    label: 'Sensores', title: 'Lectura en tiempo real',
    detail: 'Salón 25,8 °C · sin huésped',
    narrative: 'Los sensores confirman climatización encendida 45 min después del check-out. Sin presencia detectada en la vivienda.',
    tag: 'Tª exterior 22°C · umbral superado',
    pulse: true,
  },
  {
    icon: BrainCircuit,
    accent: '#0d9488', bg: 'rgba(13,148,136,0.08)', border: 'rgba(13,148,136,0.25)',
    label: 'Tramo', title: 'Motor de reglas',
    detail: '3 condiciones verificadas',
    narrative: '¿Check-out +30 min? ✓  ·  ¿Tª > 24°C? ✓  ·  ¿Próxima entrada < 24h? No. Decisión del motor: APAGAR climatización.',
    tag: '12 ejecuciones este mes · regla activa 01/05',
  },
  {
    icon: Zap,
    accent: '#14b8a6', bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.24)',
    label: 'Acción', title: 'Comando MQTT enviado',
    detail: 'tramo/riazor-2b/split-salon → OFF',
    narrative: 'El dispositivo Shelly recibe la orden MQTT. El split se apaga sin intervención humana. Todo el proceso en menos de 1 segundo.',
    tag: 'MQTT QoS 1 · confirmado por dispositivo',
  },
  {
    icon: PiggyBank,
    accent: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)',
    label: 'Resultado', title: 'Ahorro documentado',
    detail: '34,20 € ahorrados esta semana',
    narrative: 'Cada acción queda registrada con timestamp, kWh evitados y coste calculado. El propietario lo ve en su informe mensual sin llamar.',
    tag: '221 kWh evitados · 58,30 € acumulados mayo',
    highlight: true,
  },
];

export default function SystemFlowScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const updateDots = (progress: number) => {
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      const dotProgress = i / (steps.length - 1);
      const active = progress >= dotProgress - 0.02;
      dot.classList.toggle('bg-[#0d9488]', active);
      dot.classList.toggle('bg-white/20', !active);
      dot.classList.toggle('w-6', active);
      dot.classList.toggle('w-2', !active);
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const compactViewport = window.matchMedia('(max-width: 767px)').matches;
      const panels = wrapper.children;
      if (panels.length < 2) return;

      if (reduceMotion || compactViewport) {
        gsap.set(wrapper, { clearProps: 'transform' });
        return;
      }

      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${wrapper.scrollWidth - window.innerWidth + 100}`,
          pin: true,
          scrub: 1.2,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.3,
            ease: 'power2.inOut',
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Update progress bar
      const updateProgress = () => {
        const st = ScrollTrigger.getAll().find(t => t.trigger === section);
        if (st && st.progress !== undefined) {
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${st.progress})`;
          updateDots(st.progress);
        }
      };
      gsap.ticker.add(updateProgress);
      return () => gsap.ticker.remove(updateProgress);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sistema"
      ref={sectionRef}
      className="flow-section relative overflow-hidden bg-[#0f0b0c] text-white"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 pt-16 sm:pt-20 px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/25 mb-3">
          Arquitectura del sistema
        </p>
        <h2 className="text-3xl sm:text-[40px] leading-[1.1] tracking-[-0.8px] font-semibold">
        No solo te avisa. <span className="text-[#0d9488]">Actúa.</span>
      </h2>
        <p className="mt-2 text-white/30 max-w-lg mx-auto text-sm">
          Tramo conecta reservas, sensores y dispositivos para ejecutar decisiones.
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 max-w-md mx-auto px-6 mt-8 mb-4">
        <div className="h-[2px] bg-white/8 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="flow-progress-fill h-full origin-left scale-x-0 bg-gradient-to-r from-[#0d9488] to-[#22c55e] rounded-full"
          />
        </div>
      </div>

      {/* Panels wrapper */}
      <div
        ref={wrapperRef}
        data-flow-scroller
        className="flex w-fit flex-nowrap max-md:w-full max-md:gap-4 max-md:overflow-x-auto max-md:px-6 max-md:pb-8 max-md:snap-x max-md:snap-mandatory max-md:[scrollbar-width:none]"
        onScroll={(event) => {
          const el = event.currentTarget;
          if (window.matchMedia('(min-width: 768px)').matches) return;
          const max = Math.max(1, el.scrollWidth - el.clientWidth);
          const progress = el.scrollLeft / max;
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
          updateDots(progress);
        }}
        style={{ willChange: 'transform' }}
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="flex h-[calc(100vh-240px)] min-h-[420px] w-screen flex-shrink-0 flex-col items-center justify-center px-6 max-md:h-auto max-md:min-h-0 max-md:w-[86vw] max-md:snap-center max-md:px-0 sm:px-12"
            >
              <div
                className="relative w-full max-w-md overflow-hidden rounded-2xl p-8 shadow-[0_24px_90px_rgba(13,148,136,0.08)] sm:p-10 lg:max-w-xl"
                style={{ background: step.bg, border: `1px solid ${step.border}` }}
              >
                {/* Step counter */}
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono"
                    style={{ background: `${step.accent}18`, color: step.accent }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35">{step.label}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{step.detail}</p>
                  </div>
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-5 mb-6">
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.accent}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.accent }} />
                    {step.pulse && (
                      <span className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                        style={{ background: step.accent }} />
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Narrative */}
                <p className="text-white/45 leading-relaxed text-sm mb-5">
                  {step.narrative}
                </p>

                {/* Tag */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono"
                  style={{ background: `${step.accent}12`, color: step.accent }}
                >
                  {step.highlight && <span className="text-[10px] font-bold uppercase tracking-[0.12em]">ROI</span>}
                  {step.tag}
                </div>

                {/* Next arrow indicator */}
                {i < steps.length - 1 && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-1 text-white/10">
                    <ChevronRight className="w-5 h-5" />
                    <ChevronRight className="w-4 h-4" />
                    <ChevronRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="relative z-10 pb-8 flex justify-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            type="button"
            onClick={() => {
              const triggers = ScrollTrigger.getAll();
              const st = triggers.find(t => t.trigger === sectionRef.current);
              if (!st) return;
              const target = st.start + (st.end - st.start) * (i / (steps.length - 1));
              window.scrollTo({ top: target, behavior: 'smooth' });
            }}
            className={`flow-dot w-2 h-2 rounded-full transition-all duration-500 ${
              i === 0 ? 'bg-[#0d9488] w-6' : 'bg-white/20'
            }`}
            aria-label={`Ir al paso ${i + 1}`}
          />
        ))}
      </div>

      {/* Mobile hint */}
      <div className="absolute bottom-3 left-0 right-0 text-center text-white/12 text-[10px] font-mono uppercase tracking-widest md:hidden">
        Desliza →
      </div>
    </section>
  );
}
