'use client'

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ImageGallery from '@/components/machinery/ImageGallery'
import SpecsGrid from '@/components/machinery/SpecsGrid'
import AvailabilityCalendar from '@/components/machinery/AvailabilityCalendar'
import PriceCalculator from '@/components/rental/PriceCalculator'
import StatusBadge from '@/components/ui/StatusBadge'
import { demoMachines, demoBlockedDates, demoMaintenanceDates } from '@/lib/data/machines'
import { formatGuaranies, calculateIVA } from '@/lib/utils/currency'
import { useRentalStore } from '@/stores/useRentalStore'

export default function MachineDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { setDraft } = useRentalStore()

  const machine = useMemo(() => demoMachines.find((m) => m.slug === slug), [slug])

  const [rateType, setRateType] = useState<'hour' | 'day' | 'week' | 'month'>('day')
  const [selectedStart, setSelectedStart] = useState<string | null>(null)
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null)

  if (!machine) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-kargo-dark pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl text-kargo-text uppercase mb-4">
              Maquinaria no encontrada
            </h1>
            <p className="text-kargo-muted mb-6">La máquina que buscás no existe o fue removida.</p>
            <Link
              href="/catalogo"
              className="px-6 py-3 bg-kargo-yellow text-kargo-black font-display uppercase font-bold tracking-wider hover:shadow-kargo transition-all"
            >
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const rateAmounts: Record<string, number> = {
    hour: machine.price_per_hour,
    day: machine.price_per_day,
    week: machine.price_per_week,
    month: machine.price_per_month,
  }

  const handleRangeSelect = (start: string, end: string) => {
    setSelectedStart(start)
    setSelectedEnd(end)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-kargo-dark pt-20">
        {/* Breadcrumb */}
        <div className="bg-kargo-black border-b border-kargo-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/catalogo" className="text-kargo-muted hover:text-kargo-yellow transition-colors">
                Catálogo
              </Link>
              <span className="text-kargo-steel">/</span>
              <span className="text-kargo-text">{machine.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left column — Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageGallery images={machine.images} name={machine.name} />

              {/* Status badge under gallery */}
              <div className="mt-4">
                <StatusBadge status={machine.status} size="md" />
              </div>
            </motion.div>

            {/* Right column — Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Title */}
              <div>
                <p className="text-sm text-kargo-muted uppercase tracking-wider mb-1">
                  {machine.brand} &middot; {machine.model}
                  {machine.year ? ` &middot; ${machine.year}` : ''}
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-black text-kargo-text uppercase">
                  {machine.name}
                </h1>
                {machine.description && (
                  <p className="text-kargo-muted mt-3 leading-relaxed">
                    {machine.description}
                  </p>
                )}
              </div>

              {/* Quick prices */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Hora', amount: machine.price_per_hour },
                  { label: 'Día', amount: machine.price_per_day },
                  { label: 'Semana', amount: machine.price_per_week },
                  { label: 'Mes', amount: machine.price_per_month },
                ].map((rate) => (
                  <div
                    key={rate.label}
                    className="p-3 bg-kargo-surface border border-kargo-border text-center"
                  >
                    <p className="text-[10px] text-kargo-muted uppercase tracking-wider mb-1">{rate.label}</p>
                    <p className="font-display text-sm font-bold text-kargo-yellow">
                      {formatGuaranies(rate.amount)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Specs */}
              <div>
                <h2 className="font-display text-sm uppercase tracking-wider text-kargo-muted mb-3">
                  Especificaciones técnicas
                </h2>
                <SpecsGrid machine={machine} />
              </div>

              {/* Calendar */}
              <div>
                <h2 className="font-display text-sm uppercase tracking-wider text-kargo-muted mb-3">
                  Seleccioná tus fechas
                </h2>
                <AvailabilityCalendar
                  blockedDates={demoBlockedDates}
                  maintenanceDates={demoMaintenanceDates}
                  onRangeSelect={handleRangeSelect}
                  selectedStart={selectedStart}
                  selectedEnd={selectedEnd}
                />
              </div>

              {/* Price calculator */}
              <PriceCalculator
                rateType={rateType}
                rateAmount={rateAmounts[rateType]}
                startDate={selectedStart}
                endDate={selectedEnd}
                depositAmount={machine.deposit_amount}
                onRateTypeChange={setRateType}
              />

              {/* Reserve button */}
              <button
                onClick={() => {
                  if (machine.status !== 'available' || !selectedStart || !selectedEnd) return
                  const rateAmount = rateAmounts[rateType]
                  const start = new Date(selectedStart)
                  const end = new Date(selectedEnd)
                  const diffMs = end.getTime() - start.getTime()
                  const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
                  let quantity: number
                  switch (rateType) {
                    case 'hour': quantity = diffDays * 8; break
                    case 'week': quantity = Math.max(1, Math.ceil(diffDays / 7)); break
                    case 'month': quantity = Math.max(1, Math.ceil(diffDays / 30)); break
                    default: quantity = diffDays
                  }
                  const subtotal = quantity * rateAmount
                  const { iva, total } = calculateIVA(subtotal)
                  setDraft({
                    machineryId: machine.id,
                    machineryName: machine.name,
                    machineryImage: machine.images[0] || null,
                    startDate: selectedStart,
                    endDate: selectedEnd,
                    rateType,
                    rateAmount,
                    subtotal,
                    iva,
                    deposit: machine.deposit_amount,
                    total,
                  })
                  router.push('/checkout')
                }}
                disabled={machine.status !== 'available' || !selectedStart || !selectedEnd}
                className={`block w-full py-4 text-center font-display text-lg uppercase font-bold tracking-wider transition-all ${
                  machine.status === 'available' && selectedStart && selectedEnd
                    ? 'bg-kargo-yellow text-kargo-black hover:shadow-kargo cursor-pointer'
                    : 'bg-kargo-steel text-kargo-muted cursor-not-allowed'
                }`}
              >
                {machine.status !== 'available'
                  ? 'No disponible'
                  : !selectedStart || !selectedEnd
                    ? 'Seleccioná fechas para reservar'
                    : 'Reservar ahora'}
              </button>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
