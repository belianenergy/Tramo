'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* ══════════════════════════════════════════
   Battery Arbitrage Animation
   — shows charge/discharge cycle with money
   ══════════════════════════════════════════ */
export function BatteryArbitrageSVG({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      // Battery fill level
      tl.fromTo('#batt-fill', { scaleY: 0.15, transformOrigin: 'bottom center' }, { scaleY: 1, duration: 2, ease: 'power2.inOut' })
        .to('#batt-fill', { fill: 'var(--color-status-success-bright)', duration: 0.5 }, '-=0.5')
        // Lightning bolt appears
        .fromTo('#batt-lightning', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.5 }, '-=1.5')
        .to('#batt-lightning', { opacity: 0, duration: 0.5 }, '+=1')
        // Full → discharge
        .to('#batt-fill', { scaleY: 0.15, duration: 1.5, ease: 'power2.inOut', fill: 'var(--color-status-teal)' }, '+=0.5')
        // Euro symbols fly out
        .fromTo('#batt-euro1', { opacity: 0, y: 0, x: 0 }, { opacity: 1, y: -30, x: 15, duration: 0.6, ease: 'power2.out' }, '-=1')
        .fromTo('#batt-euro2', { opacity: 0, y: 0, x: 0 }, { opacity: 1, y: -22, x: -15, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .to('#batt-euro1, #batt-euro2', { opacity: 0, duration: 0.5 }, '+=0.8');

      // Pulsing glow on the battery
      gsap.to('#batt-glow', { opacity: 0.15, scale: 1.08, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} className={className} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Glow */}
      <rect id="batt-glow" x="22" y="20" width="76" height="90" rx="16" fill="var(--color-status-teal-dark)" opacity="0.06" />
      {/* Battery body */}
      <rect x="24" y="20" width="72" height="90" rx="12" stroke="var(--color-status-teal-dark)" strokeWidth="2.5" fill="none" />
      {/* Battery cap */}
      <rect x="43" y="12" width="34" height="8" rx="3" fill="var(--color-status-teal-dark)" />
      {/* Fill level */}
      <rect id="batt-fill" x="29" y="115" width="62" height="0" rx="6" fill="var(--color-status-teal-dark)" style={{ transformOrigin: 'bottom center' }} />
      {/* Lightning bolt */}
      <g id="batt-lightning" opacity="0">
        <path d="M55 50 L60 65 H52 L65 82" stroke="var(--color-bark)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Euro symbols that fly out */}
      <text id="batt-euro1" x="80" y="40" fill="var(--color-status-teal-dark)" fontSize="18" fontWeight="700" fontFamily="system-ui" opacity="0">+€</text>
      <text id="batt-euro2" x="10" y="35" fill="var(--color-status-teal-dark)" fontSize="14" fontWeight="700" fontFamily="system-ui" opacity="0">+€</text>
      {/* Labels */}
      <text x="60" y="132" fill="var(--color-status-teal-dark)" fontSize="9" textAnchor="middle" fontFamily="system-ui" fontWeight="600">CARGA</text>
    </svg>
  );
}

/* ══════════════════════════════════════════
   Smart Home Energy — house with pulsing nodes
   ══════════════════════════════════════════ */
export function SmartHomeSVG({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulse the connected dots
      gsap.to('#home-dot1', { opacity: 0.4, scale: 1.4, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('#home-dot2', { opacity: 0.4, scale: 1.4, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });
      gsap.to('#home-dot3', { opacity: 0.4, scale: 1.4, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });
      // Energy waves
      gsap.to('#home-wave1', { opacity: 0.25, scale: 1.6, duration: 2, repeat: -1, ease: 'none' });
      gsap.to('#home-wave2', { opacity: 0.2, scale: 1.6, duration: 2, repeat: -1, ease: 'none', delay: 0.7 });
      gsap.to('#home-wave3', { opacity: 0.15, scale: 1.6, duration: 2, repeat: -1, ease: 'none', delay: 1.4 });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} className={className} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Energy waves */}
      <circle cx="90" cy="65" r="20" fill="var(--color-status-teal-dark)" id="home-wave1" opacity="0.15" />
      <circle cx="90" cy="65" r="16" fill="var(--color-status-teal-dark)" id="home-wave2" opacity="0.1" />
      <circle cx="90" cy="65" r="12" fill="var(--color-status-teal-dark)" id="home-wave3" opacity="0.07" />
      {/* House body */}
      <path d="M25 100 V60 L55 38 L85 60 V100 Z" stroke="var(--color-status-teal-dark)" strokeWidth="2" fill="none" />
      {/* Roof */}
      <path d="M18 62 L55 35 L92 62" stroke="var(--color-status-teal-dark)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Door */}
      <rect x="48" y="70" width="14" height="20" rx="2" stroke="var(--color-status-teal-dark)" strokeWidth="1.5" fill="none" />
      {/* Connected dots */}
      <circle id="home-dot1" cx="90" cy="55" r="4" fill="var(--color-status-success-bright)" opacity="0.3" />
      <circle id="home-dot2" cx="100" cy="75" r="4" fill="var(--color-status-teal-dark)" opacity="0.3" />
      <circle id="home-dot3" cx="82" cy="85" r="4" fill="var(--color-status-teal)" opacity="0.3" />
      {/* Connection lines */ }
      <line x1="55" y1="62" x2="88" y2="56" stroke="var(--color-status-teal-dark)" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
      <line x1="55" y1="80" x2="98" y2="76" stroke="var(--color-status-teal-dark)" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
      <line x1="55" y1="90" x2="80" y2="86" stroke="var(--color-status-teal-dark)" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   Device Control — thermostat/AC animation
   ══════════════════════════════════════════ */
export function DeviceControlSVG({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Temperature dial rotation
      gsap.to('#ctrl-dial', { rotation: 25, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'center center' });
      // Status indicator pulse
      gsap.to('#ctrl-status', { opacity: 0.4, scale: 1.3, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      // Power wave
      gsap.to('#ctrl-wave', { strokeDashoffset: -20, duration: 1, repeat: -1, ease: 'none' });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Device body */}
      <rect x="25" y="35" width="55" height="55" rx="10" stroke="var(--color-status-teal-dark)" strokeWidth="2" fill="none" />
      {/* Screen */}
      <rect x="33" y="42" width="39" height="22" rx="3" fill="var(--color-status-teal-dark)" fillOpacity="0.06" />
      {/* Temperature text */}
      <text x="52" y="57" fill="var(--color-status-teal-dark)" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="monospace">24°</text>
      {/* Dial */}
      <g id="ctrl-dial" transform="translate(52, 85)" style={{ transformOrigin: 'center' }}>
        <circle cx="0" cy="0" r="12" stroke="var(--color-status-teal-dark)" strokeWidth="1.5" fill="none" />
        <line x1="0" y1="0" x2="0" y2="-8" stroke="var(--color-status-danger)" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Status dot */}
      <circle id="ctrl-status" cx="78" cy="42" r="3.5" fill="var(--color-status-success-bright)" />
      {/* Power wave */}
      <path id="ctrl-wave" d="M10 90 Q20 78 30 90 Q40 102 50 90 Q60 78 70 90" stroke="var(--color-status-teal-dark)" strokeWidth="1.5" fill="none" strokeDasharray="8 4" opacity="0.3" />
    </svg>
  );
}
