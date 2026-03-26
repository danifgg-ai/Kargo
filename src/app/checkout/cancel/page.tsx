'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import KargoButton from '@/components/ui/KargoButton'

export default function CheckoutCancelPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-kargo-dark pt-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="w-20 h-20 bg-kargo-red/10 border-2 border-kargo-red flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-10 h-10 text-kargo-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-black text-kargo-text uppercase mb-4">
              Pago cancelado
            </h1>

            <p className="text-kargo-muted mb-8 leading-relaxed">
              Tu pago fue cancelado o no pudo ser procesado.
              No se realizó ningún cargo a tu tarjeta. Podés intentar nuevamente
              o contactarnos si necesitás ayuda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/checkout">
                <KargoButton>Intentar de nuevo</KargoButton>
              </Link>
              <Link href="/catalogo">
                <KargoButton variant="outline">Volver al catálogo</KargoButton>
              </Link>
            </div>

            <div className="mt-8 bg-kargo-surface border border-kargo-border p-5 text-left">
              <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-2">
                ¿Necesitás ayuda?
              </h3>
              <p className="text-sm text-kargo-text">
                Contactanos al{' '}
                <a href="tel:+595211234567" className="text-kargo-yellow hover:underline">
                  +595 21 123 4567
                </a>{' '}
                o escribinos a{' '}
                <a href="mailto:soporte@kargo.com.py" className="text-kargo-yellow hover:underline">
                  soporte@kargo.com.py
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
