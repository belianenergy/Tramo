import Link from 'next/link';

const sections = [
  ['Responsable', 'Tramo es un producto en fase piloto para diagnóstico energético de carteras turísticas. Los datos de contacto del responsable se completarán antes del lanzamiento público.'],
  ['Datos que tratamos', 'Datos de contacto enviados por formulario, información básica de empresa, número de alojamientos, ciudad, PMS indicado y rango de factura declarado. No solicitamos credenciales, facturas ni documentos sensibles desde el formulario público.'],
  ['Finalidad', 'Responder a solicitudes de diagnóstico, valorar encaje del piloto y preparar una propuesta comercial basada en datos facilitados voluntariamente.'],
  ['Base jurídica', 'Consentimiento del interesado al enviar el formulario y aplicación de medidas precontractuales solicitadas por la persona interesada.'],
  ['Conservación', 'Los leads se conservan durante el tiempo necesario para gestionar la solicitud y, como máximo, durante 12 meses si no existe relación comercial posterior.'],
  ['Derechos', 'Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo al canal de contacto que se publique en la versión final del servicio.'],
  ['Cookies', 'Esta versión no instala cookies analíticas ni publicitarias propias. Si se añaden analíticas o píxeles, se incorporará un mecanismo de consentimiento antes del lanzamiento público.'],
];

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen px-5 py-24" style={{ background: 'var(--color-cream-paper)', color: 'var(--color-ink)' }}>
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm underline" style={{ color: 'var(--color-slate)' }}>Volver a Tramo</Link>
        <h1 className="mt-8 font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.05]" style={{ letterSpacing: '-0.04em' }}>
          Política de privacidad
        </h1>
        <p className="mt-5 text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>
          Documento provisional para la fase piloto. Debe ser revisado por asesoría legal antes de publicar Tramo como servicio comercial abierto.
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
