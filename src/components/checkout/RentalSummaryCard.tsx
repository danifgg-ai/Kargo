'use client'

import Image from 'next/image'
import { formatGuaranies } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/dates'

interface RentalSummaryCardProps {
  machineryName: string | null
  machineryImage: string | null
  startDate: string | null
  endDate: string | null
  rateType: string
  subtotal: number
  iva: number
  deposit: number
  total: number
  deliveryType: 'pickup' | 'delivery'
  deliveryAddress: string
}

const rateLabels: Record<string, string> = {
  hour: 'Por hora',
  day: 'Por día',
  week: 'Por semana',
  month: 'Por mes',
}

export default function RentalSummaryCard({
  machineryName,
  machineryImage,
  startDate,
  endDate,
  rateType,
  subtotal,
  iva,
  deposit,
  total,
  deliveryType,
  deliveryAddress,
}: RentalSummaryCardProps) {
  return (
    <div className="bg-kargo-surface border border-kargo-border">
      {/* Machine info */}
      <div className="flex gap-4 p-5 border-b border-kargo-border">
        {machineryImage && (
          <div className="relative w-20 h-20 flex-shrink-0 bg-kargo-black overflow-hidden">
            <Image
              src={machineryImage}
              alt={machineryName || 'Maquinaria'}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold text-kargo-text uppercase truncate">
            {machineryName || 'Sin seleccionar'}
          </h3>
          <p className="text-xs text-kargo-muted mt-1">
            {rateLabels[rateType] || rateType}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="p-5 border-b border-kargo-border space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-kargo-muted">Inicio</span>
          <span className="text-kargo-text">
            {startDate ? formatDate(startDate) : '—'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-kargo-muted">Fin</span>
          <span className="text-kargo-text">
            {endDate ? formatDate(endDate) : '—'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-kargo-muted">Entrega</span>
          <span className="text-kargo-text">
            {deliveryType === 'delivery' ? 'A domicilio' : 'Retiro en depósito'}
          </span>
        </div>
        {deliveryType === 'delivery' && deliveryAddress && (
          <div className="flex justify-between text-sm">
            <span className="text-kargo-muted">Dirección</span>
            <span className="text-kargo-text text-right max-w-[60%] truncate">
              {deliveryAddress}
            </span>
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="p-5 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-kargo-muted">Subtotal</span>
          <span className="text-kargo-text">{formatGuaranies(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-kargo-muted">IVA (10%)</span>
          <span className="text-kargo-text">{formatGuaranies(iva)}</span>
        </div>
        {deposit > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-kargo-muted">Depósito (reembolsable)</span>
            <span className="text-kargo-text">{formatGuaranies(deposit)}</span>
          </div>
        )}
        <div className="flex justify-between pt-3 border-t border-kargo-border">
          <span className="font-display text-sm uppercase tracking-wider font-bold text-kargo-text">
            Total a pagar
          </span>
          <span className="font-display text-xl font-bold text-kargo-yellow">
            {formatGuaranies(total + deposit)}
          </span>
        </div>
      </div>
    </div>
  )
}
