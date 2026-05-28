import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: 'Tramo — Control energético para carteras turísticas',
  description:
    'Sistema de atribución de consumo por reserva para gestores profesionales de apartamentos turísticos. Detección fuera de estancia, recomendación de potencia e informes por propietario.',
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
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://tramo.energy' },
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
      <body className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable} antialiased min-h-screen bg-background`}>{children}</body>
    </html>
  )
}
