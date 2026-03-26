'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import StatusBadge from '@/components/ui/StatusBadge'
import KargoButton from '@/components/ui/KargoButton'
import { demoRentals } from '@/lib/data/rentals'
import { formatGuaranies } from '@/lib/utils/currency'
import { formatDate, formatDateTime } from '@/lib/utils/dates'
import type { RentalStatus } from '@/types/database'

const rateLabels: Record<string, string> = {
  hour: 'Hora',
  day: 'Día',
  week: 'Semana',
  month: 'Mes',
}

export default function RentalDetailPage() {
  const params = useParams()
  const rental = useMemo(
    () => demoRentals.find((r) => r.id === params.id),
    [params.id]
  )

  if (!rental) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-2xl text-kargo-text uppercase mb-4">
          Reserva no encontrada
        </h1>
        <Link href="/dashboard/reservas">
          <KargoButton variant="outline">Volver a mis reservas</KargoButton>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/dashboard/reservas"
        className="inline-flex items-center gap-1 text-sm text-kargo-muted hover:text-kargo-yellow transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Volver a mis reservas
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
              {rental.rental_number}
            </h1>
            <StatusBadge status={rental.status as RentalStatus} size="md" />
          </div>
          <p className="text-sm text-kargo-muted">
            Creada el {formatDateTime(rental.created_at)}
          </p>
        </div>

        {rental.status === 'pending_payment' && (
          <Link href="/checkout">
            <KargoButton>Completar pago</KargoButton>
          </Link>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Machine card */}
          {rental.machinery && (
            <div className="bg-kargo-surface border border-kargo-border p-5">
              <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-4">
                Maquinaria
              </h3>
              <div className="flex gap-4">
                {rental.machinery.images?.[0] && (
                  <div className="relative w-24 h-24 flex-shrink-0 bg-kargo-black overflow-hidden">
                    <Image
                      src={rental.machinery.images[0]}
                      alt={rental.machinery.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <Link
                    href={`/catalogo/${rental.machinery.slug}`}
                    className="font-display text-base font-bold text-kargo-text uppercase hover:text-kargo-yellow transition-colors"
                  >
                    {rental.machinery.name}
                  </Link>
                  <p className="text-xs text-kargo-muted mt-1">
                    {rental.machinery.brand} &middot; {rental.machinery.model}
                    {rental.machinery.year ? ` &middot; ${rental.machinery.year}` : ''}
                  </p>
                  <p className="text-xs text-kargo-muted mt-0.5">
                    S/N: {rental.machinery.serial_number}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rental details */}
          <div className="bg-kargo-surface border border-kargo-border p-5">
            <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-4">
              Detalles del alquiler
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-xs text-kargo-steel mb-0.5">Fecha de inicio</p>
                <p className="text-sm text-kargo-text font-medium">{formatDate(rental.start_date)}</p>
              </div>
              <div>
                <p className="text-xs text-kargo-steel mb-0.5">Fecha de fin</p>
                <p className="text-sm text-kargo-text font-medium">{formatDate(rental.end_date)}</p>
              </div>
              <div>
                <p className="text-xs text-kargo-steel mb-0.5">Tipo de tarifa</p>
                <p className="text-sm text-kargo-text font-medium">Por {rateLabels[rental.rate_type]?.toLowerCase() || rental.rate_type}</p>
              </div>
              <div>
                <p className="text-xs text-kargo-steel mb-0.5">Tarifa</p>
                <p className="text-sm text-kargo-text font-medium">{formatGuaranies(rental.rate_amount)}/{rateLabels[rental.rate_type]?.toLowerCase() || rental.rate_type}</p>
              </div>
              <div>
                <p className="text-xs text-kargo-steel mb-0.5">Entrega</p>
                <p className="text-sm text-kargo-text font-medium">
                  {rental.delivery_type === 'delivery' ? 'A domicilio' : 'Retiro en depósito'}
                </p>
              </div>
              {rental.delivery_address && (
                <div>
                  <p className="text-xs text-kargo-steel mb-0.5">Dirección</p>
                  <p className="text-sm text-kargo-text font-medium">{rental.delivery_address}</p>
                </div>
              )}
            </div>
            {rental.notes && (
              <div className="mt-4 pt-4 border-t border-kargo-border">
                <p className="text-xs text-kargo-steel mb-0.5">Notas</p>
                <p className="text-sm text-kargo-muted">{rental.notes}</p>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-kargo-surface border border-kargo-border p-5">
            <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-4">
              Historial
            </h3>
            <div className="space-y-4">
              <TimelineItem
                date={rental.created_at}
                title="Reserva creada"
                description={`Reserva ${rental.rental_number} generada`}
              />
              {rental.status !== 'pending_payment' && rental.status !== 'cancelled' && (
                <TimelineItem
                  date={rental.created_at}
                  title="Pago confirmado"
                  description="Pago procesado vía Bancard VPOS"
                  color="green"
                />
              )}
              {rental.status === 'active' && (
                <TimelineItem
                  date={rental.start_date}
                  title="Alquiler iniciado"
                  description="La maquinaria fue entregada"
                  color="green"
                />
              )}
              {rental.status === 'completed' && (
                <>
                  <TimelineItem
                    date={rental.start_date}
                    title="Alquiler iniciado"
                    description="La maquinaria fue entregada"
                    color="green"
                  />
                  <TimelineItem
                    date={rental.end_date}
                    title="Alquiler completado"
                    description="Maquinaria devuelta en buen estado"
                    color="blue"
                  />
                </>
              )}
              {rental.status === 'cancelled' && (
                <TimelineItem
                  date={rental.updated_at}
                  title="Reserva cancelada"
                  description={rental.notes || 'La reserva fue cancelada'}
                  color="red"
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Sidebar — Payment summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24 space-y-6">
            <div className="bg-kargo-surface border border-kargo-border p-5">
              <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-4">
                Resumen de pago
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-kargo-muted">Subtotal</span>
                  <span className="text-kargo-text">{formatGuaranies(rental.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-kargo-muted">IVA (10%)</span>
                  <span className="text-kargo-text">{formatGuaranies(rental.iva_amount)}</span>
                </div>
                {rental.deposit_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-kargo-muted">Depósito</span>
                    <span className="text-kargo-text">{formatGuaranies(rental.deposit_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-kargo-border">
                  <span className="font-display text-sm uppercase tracking-wider font-bold text-kargo-text">
                    Total
                  </span>
                  <span className="font-display text-xl font-bold text-kargo-yellow">
                    {formatGuaranies(rental.total_amount + rental.deposit_amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Help card */}
            <div className="bg-kargo-black border border-kargo-border p-5">
              <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-2">
                ¿Necesitás ayuda?
              </h3>
              <p className="text-sm text-kargo-muted mb-3">
                Contactá a nuestro equipo de soporte para consultas sobre esta reserva.
              </p>
              <a
                href="tel:+595211234567"
                className="text-sm text-kargo-yellow hover:underline"
              >
                +595 21 123 4567
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function TimelineItem({
  date,
  title,
  description,
  color = 'yellow',
}: {
  date: string
  title: string
  description: string
  color?: 'yellow' | 'green' | 'blue' | 'red'
}) {
  const dotColors = {
    yellow: 'bg-kargo-yellow',
    green: 'bg-kargo-green',
    blue: 'bg-kargo-blue',
    red: 'bg-kargo-red',
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColors[color]} mt-1.5`} />
        <div className="w-px flex-1 bg-kargo-border" />
      </div>
      <div className="pb-4">
        <p className="text-sm font-medium text-kargo-text">{title}</p>
        <p className="text-xs text-kargo-muted">{description}</p>
        <p className="text-[10px] text-kargo-steel mt-1">{formatDateTime(date)}</p>
      </div>
    </div>
  )
}
