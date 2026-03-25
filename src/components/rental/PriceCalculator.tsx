'use client'

import { useMemo } from 'react'
import { formatGuaranies, calculateIVA } from '@/lib/utils/currency'

interface PriceCalculatorProps {
  rateType: 'hour' | 'day' | 'week' | 'month'
  rateAmount: number
  startDate: string | null
  endDate: string | null
  depositAmount: number
  onRateTypeChange?: (type: 'hour' | 'day' | 'week' | 'month') => void
}

const rateLabels: Record<string, string> = {
  hour: 'Hora',
  day: 'Día',
  week: 'Semana',
  month: 'Mes',
}

export default function PriceCalculator({
  rateType,
  rateAmount,
  startDate,
  endDate,
  depositAmount,
  onRateTypeChange,
}: PriceCalculatorProps) {
  const calculation = useMemo(() => {
    if (!startDate || !endDate) {
      return { quantity: 0, subtotal: 0, iva: 0, total: 0 }
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffMs = end.getTime() - start.getTime()
    const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))

    let quantity: number
    switch (rateType) {
      case 'hour':
        quantity = diffDays * 8 // 8h workday
        break
      case 'day':
        quantity = diffDays
        break
      case 'week':
        quantity = Math.max(1, Math.ceil(diffDays / 7))
        break
      case 'month':
        quantity = Math.max(1, Math.ceil(diffDays / 30))
        break
      default:
        quantity = diffDays
    }

    const subtotal = quantity * rateAmount
    const { iva, total } = calculateIVA(subtotal)

    return { quantity, subtotal, iva, total }
  }, [startDate, endDate, rateType, rateAmount])

  return (
    <div className="bg-kargo-surface border border-kargo-border p-5">
      <h3 className="font-display text-sm uppercase tracking-wider text-kargo-muted mb-4">
        Calculá tu alquiler
      </h3>

      {/* Rate type toggle */}
      {onRateTypeChange && (
        <div className="grid grid-cols-4 gap-1 mb-5 bg-kargo-black p-1">
          {(['hour', 'day', 'week', 'month'] as const).map((type) => (
            <button
              key={type}
              onClick={() => onRateTypeChange(type)}
              className={`py-2 text-xs font-display uppercase tracking-wider transition-all ${
                rateType === type
                  ? 'bg-kargo-yellow text-kargo-black font-bold'
                  : 'text-kargo-muted hover:text-kargo-text'
              }`}
            >
              {rateLabels[type]}
            </button>
          ))}
        </div>
      )}

      {/* Rate display */}
      <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-kargo-border">
        <span className="text-sm text-kargo-muted">Tarifa por {rateLabels[rateType].toLowerCase()}</span>
        <span className="font-display text-xl font-bold text-kargo-yellow">
          {formatGuaranies(rateAmount)}
        </span>
      </div>

      {/* Breakdown */}
      {startDate && endDate ? (
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-kargo-muted">
              {calculation.quantity} {rateLabels[rateType].toLowerCase()}
              {calculation.quantity > 1 ? 's' : ''}
            </span>
            <span className="text-kargo-text">{formatGuaranies(calculation.subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-kargo-muted">IVA (10%)</span>
            <span className="text-kargo-text">{formatGuaranies(calculation.iva)}</span>
          </div>

          {depositAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-kargo-muted">Depósito (reembolsable)</span>
              <span className="text-kargo-text">{formatGuaranies(depositAmount)}</span>
            </div>
          )}

          <div className="flex justify-between pt-3 border-t border-kargo-border">
            <span className="font-display text-sm uppercase tracking-wider text-kargo-text font-bold">
              Total
            </span>
            <span className="font-display text-2xl font-bold text-kargo-yellow">
              {formatGuaranies(calculation.total + depositAmount)}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-kargo-muted text-center py-4">
          Seleccioná las fechas en el calendario para ver el presupuesto
        </p>
      )}
    </div>
  )
}
