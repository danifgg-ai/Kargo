'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CheckoutStepper from '@/components/checkout/CheckoutStepper'
import RentalSummaryCard from '@/components/checkout/RentalSummaryCard'
import DeliveryForm from '@/components/checkout/DeliveryForm'
import BillingForm, { type BillingData } from '@/components/checkout/BillingForm'
import PaymentStep from '@/components/checkout/PaymentStep'
import KargoButton from '@/components/ui/KargoButton'
import { useRentalStore } from '@/stores/useRentalStore'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { draft } = useRentalStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [billingData, setBillingData] = useState<BillingData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // If no machinery selected, show empty state
  if (!draft.machineryId) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-kargo-dark pt-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-kargo-surface border border-kargo-border flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-kargo-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl text-kargo-text uppercase font-bold mb-3">
              No hay reserva activa
            </h1>
            <p className="text-kargo-muted mb-6">
              Seleccioná una maquinaria del catálogo para iniciar tu reserva.
            </p>
            <Link
              href="/catalogo"
              className="inline-block px-6 py-3 bg-kargo-yellow text-kargo-black font-display uppercase font-bold tracking-wider hover:shadow-kargo transition-all"
            >
              Ver catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const canProceedStep1 =
    draft.deliveryType === 'pickup' ||
    (draft.deliveryType === 'delivery' && draft.deliveryAddress.trim().length > 5)

  const handleBillingSubmit = (data: BillingData) => {
    setBillingData(data)
    setCurrentStep(3)
  }

  const handleInitiatePayment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/payments/bancard/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...draft,
          ...billingData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar pago')
      }

      // Redirect to Bancard payment form (or success in demo)
      router.push(data.redirect_url)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-kargo-dark pt-20">
        {/* Header */}
        <div className="bg-kargo-black border-b border-kargo-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="font-display text-2xl font-black text-kargo-text uppercase text-center mb-6">
              Checkout
            </h1>
            <CheckoutStepper currentStep={currentStep} />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <DeliveryForm />

                    <div className="flex justify-end">
                      <KargoButton
                        onClick={() => setCurrentStep(2)}
                        disabled={!canProceedStep1}
                      >
                        Continuar
                      </KargoButton>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BillingForm
                      onSubmit={handleBillingSubmit}
                      isLoading={isLoading}
                      defaultValues={billingData || undefined}
                    />

                    <button
                      onClick={() => setCurrentStep(1)}
                      className="mt-4 text-sm text-kargo-muted hover:text-kargo-yellow transition-colors"
                    >
                      &larr; Volver al paso anterior
                    </button>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PaymentStep
                      totalAmount={draft.total}
                      depositAmount={draft.deposit}
                      onInitiatePayment={handleInitiatePayment}
                    />

                    <button
                      onClick={() => setCurrentStep(2)}
                      className="mt-4 text-sm text-kargo-muted hover:text-kargo-yellow transition-colors"
                    >
                      &larr; Volver al paso anterior
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar — Rental summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-3">
                  Resumen de reserva
                </h3>
                <RentalSummaryCard
                  machineryName={draft.machineryName}
                  machineryImage={draft.machineryImage}
                  startDate={draft.startDate}
                  endDate={draft.endDate}
                  rateType={draft.rateType}
                  subtotal={draft.subtotal}
                  iva={draft.iva}
                  deposit={draft.deposit}
                  total={draft.total}
                  deliveryType={draft.deliveryType}
                  deliveryAddress={draft.deliveryAddress}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
