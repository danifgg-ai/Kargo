'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import KargoButton from '@/components/ui/KargoButton'

function SuccessContent() {
  const searchParams = useSearchParams()
  const rentalId = searchParams.get('rental_id')
  const shopProcessId = searchParams.get('shop_process_id')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-kargo-dark pt-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="w-20 h-20 bg-kargo-green/10 border-2 border-kargo-green flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-10 h-10 text-kargo-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-black text-kargo-text uppercase mb-4">
              ¡Reserva confirmada!
            </h1>

            <p className="text-kargo-muted mb-8 leading-relaxed">
              Tu pago fue procesado exitosamente. Recibirás un email de confirmación
              con los detalles de tu reserva y la factura electrónica.
            </p>

            {(rentalId || shopProcessId) && (
              <div className="bg-kargo-surface border border-kargo-border p-5 mb-8 text-left space-y-2">
                {rentalId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-kargo-muted">ID de reserva</span>
                    <span className="text-kargo-text font-mono text-xs">{rentalId.slice(0, 8)}...</span>
                  </div>
                )}
                {shopProcessId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-kargo-muted">Nro. de operación</span>
                    <span className="text-kargo-text font-mono text-xs">{shopProcessId}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard">
                <KargoButton>Ver mis reservas</KargoButton>
              </Link>
              <Link href="/catalogo">
                <KargoButton variant="outline">Seguir explorando</KargoButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-kargo-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-kargo-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
