import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KARGO — Alquiler de Maquinaria de Construcción',
  description: 'Alquilá maquinaria de construcción en Asunción, Paraguay con un clic. Monitoreo GPS en tiempo real, factura electrónica SIFEN, entrega inmediata.',
  keywords: ['alquiler maquinaria', 'construcción', 'Paraguay', 'Asunción', 'mini pala cargadora', 'bobcat'],
  openGraph: {
    title: 'KARGO — Alquiler de Maquinaria de Construcción',
    description: 'Alquilá maquinaria de construcción en Asunción con un clic.',
    siteName: 'KARGO',
    locale: 'es_PY',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body bg-kargo-dark text-kargo-text min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
