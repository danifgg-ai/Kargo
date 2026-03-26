'use client'

import { useState } from 'react'
import KargoButton from '@/components/ui/KargoButton'
import { formatGuaranies } from '@/lib/utils/currency'

interface PaymentStepProps {
  totalAmount: number
  depositAmount: number
  onInitiatePayment: () => Promise<void>
}

export default function PaymentStep({
  totalAmount,
  depositAmount,
  onInitiatePayment,
}: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePay = async () => {
    setIsProcessing(true)
    setError(null)
    try {
      await onInitiatePayment()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago')
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg uppercase tracking-wider text-kargo-text font-bold">
        Pago con Bancard
      </h2>

      <div className="bg-kargo-black border border-kargo-border p-6 space-y-4">
        {/* Payment info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-kargo-yellow/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-kargo-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-display uppercase tracking-wider text-kargo-text font-bold">
              Pago seguro
            </p>
            <p className="text-xs text-kargo-muted">
              Serás redirigido a Bancard VPOS para completar tu pago
            </p>
          </div>
        </div>

        {/* Amount summary */}
        <div className="pt-4 border-t border-kargo-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-kargo-muted">Alquiler + IVA</span>
            <span className="text-kargo-text">{formatGuaranies(totalAmount)}</span>
          </div>
          {depositAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-kargo-muted">Depósito (reembolsable)</span>
              <span className="text-kargo-text">{formatGuaranies(depositAmount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-kargo-border">
            <span className="font-display text-sm uppercase tracking-wider font-bold text-kargo-text">
              Total a cobrar
            </span>
            <span className="font-display text-2xl font-bold text-kargo-yellow">
              {formatGuaranies(totalAmount + depositAmount)}
            </span>
          </div>
        </div>

        {/* Accepted methods */}
        <div className="pt-4 border-t border-kargo-border">
          <p className="text-xs text-kargo-muted mb-2">Métodos aceptados</p>
          <div className="flex gap-3">
            {['Visa', 'Mastercard', 'Débito'].map((method) => (
              <span
                key={method}
                className="px-3 py-1 bg-kargo-surface border border-kargo-border text-xs text-kargo-muted"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-kargo-red/10 border border-kargo-red/20 p-4">
          <p className="text-sm text-kargo-red">{error}</p>
        </div>
      )}

      <KargoButton
        fullWidth
        size="lg"
        onClick={handlePay}
        isLoading={isProcessing}
      >
        Pagar {formatGuaranies(totalAmount + depositAmount)}
      </KargoButton>

      <p className="text-xs text-kargo-steel text-center">
        Al hacer clic serás redirigido a la pasarela de pago segura de Bancard.
        Tu información de tarjeta es procesada directamente por Bancard y nunca pasa por nuestros servidores.
      </p>
    </div>
  )
}
