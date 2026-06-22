import Link from 'next/link';

const sections = [
  ['Titularidad', 'Tramo es una plataforma en fase piloto. Los datos mercantiles, domicilio y NIF del titular se completarán antes de activar captación pública en producción.'],
  ['Objeto del sitio', 'Este sitio presenta una solución SaaS B2B para diagnóstico, atribución y optimización de consumo energético en carteras de apartamentos turísticos.'],
  ['Uso permitido', 'El contenido se ofrece con finalidad informativa y comercial. No debe interpretarse como auditoría energética certificada, asesoramiento legal ni garantía de ahorro.'],
  ['Estimaciones de ahorro', 'Las cifras de ahorro, retorno de inversión y arbitraje son estimaciones orientativas basadas en escenarios de piloto. El resultado real depende de ocupación, tarifa, potencia contratada, equipamiento instalado, climatología, comportamiento de huéspedes y capacidad de ejecutar acciones operativas.'],
  ['Propiedad intelectual', 'Los textos, interfaces, gráficos y elementos visuales de Tramo pertenecen a sus titulares o licenciantes. No se autoriza su reproducción sin permiso.'],
  ['Responsabilidad', 'Tramo no responde por decisiones tomadas únicamente a partir de esta web sin análisis individualizado de datos de consumo, contratos y condiciones técnicas de cada cartera.'],
  ['Contacto', 'El canal de contacto legal definitivo se publicará antes del lanzamiento comercial. Durante la fase piloto, las solicitudes se gestionan mediante el formulario de diagnóstico.'],
];

export default function LegalPage() {
  return (
    <main id="main-content" className="min-h-screen px-5 py-24" style={{ background: 'var(--color-cream-paper)', color: 'var(--color-ink)' }}>
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm underline" style={{ color: 'var(--color-slate)' }}>Volver a Tramo</Link>
        <h1 className="mt-8 font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.05]" style={{ letterSpacing: '-0.04em' }}>
          Aviso legal
        </h1>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>
          Documento provisional para revisión antes de producción. La publicación final debe completarse con datos societarios y canal legal real.
        </p>
        <div className="mt-12 space-y-8">
          {sections.map(([title, body]) => (
            <section key={title}>
              <h2 className="font-display text-xl font-light" style={{ letterSpacing: '-0.02em' }}>{title}</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>{body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
