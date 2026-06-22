import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tramo.energy'),
  title: 'Tramo — Control energético para carteras turísticas',
  description:
    'Sistema de atribución de consumo por reserva para gestores profesionales de apartamentos turísticos. Detección fuera de estancia, recomendación de potencia e informes por propietario.',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  keywords: [
    'gestión energética alojamientos turísticos',
    'software energía apartamentos turísticos',
    'control consumo pisos turísticos',
    'atribución consumo por reserva',
    'gestora apartamentos energía',
    'CUPS consumo turístico',
    'informe energético propietarios',
    'detección consumo fuera estancia',
    'optimización potencia eléctrica alojamientos',
    'airbnb gestión energética',
  ],
  openGraph: {
    title: 'Tramo — Control energético para carteras turísticas',
    description:
      'Atribuye cada kWh a la reserva que lo generó. Detecta consumo fuera de estancia, recomienda ajustes de potencia y genera informes por propietario.',
    type: 'website',
    locale: 'es_ES',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tramo — Control energético para carteras turísticas' }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://tramo.energy' },
  twitter: {
    card: 'summary_large_image',
    title: 'Tramo — Control energético para carteras turísticas',
    description: 'Sistema de atribución de consumo por reserva para gestores de apartamentos turísticos.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Tramo',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description:
                'Sistema de atribución de consumo energético por reserva para gestores de apartamentos turísticos en España. Detección fuera de estancia, recomendación de potencia e informes por propietario.',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                description: 'Piloto para gestoras con 5+ alojamientos',
              },
              provider: { '@type': 'Organization', name: 'Tramo' },
            }),
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${jetBrainsMono.variable} antialiased min-h-screen`} style={{ background: 'var(--color-cream-paper)' }}>
        <a href="#main-content" className="skip-link">Ir al contenido</a>
        {children}
      </body>
    </html>
  )
}
