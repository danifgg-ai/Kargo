'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import RentalRow from '@/components/dashboard/RentalRow'
import { demoRentals } from '@/lib/data/rentals'
import { clsx } from 'clsx'
import type { RentalStatus } from '@/types/database'

const filters: { label: string; value: RentalStatus | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Activas', value: 'active' },
  { label: 'Confirmadas', value: 'confirmed' },
  { label: 'Pendientes', value: 'pending_payment' },
  { label: 'Completadas', value: 'completed' },
  { label: 'Canceladas', value: 'cancelled' },
]

export default function ReservasPage() {
  const [activeFilter, setActiveFilter] = useState<RentalStatus | 'all'>('all')

  const filtered = activeFilter === 'all'
    ? demoRentals
    : demoRentals.filter((r) => r.status === activeFilter)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Mis reservas
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          {demoRentals.length} reserva{demoRentals.length !== 1 ? 's' : ''} en total
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={clsx(
              'px-3 py-1.5 text-xs font-display uppercase tracking-wider transition-all border',
              activeFilter === f.value
                ? 'bg-kargo-yellow text-kargo-black border-kargo-yellow font-bold'
                : 'bg-kargo-surface text-kargo-muted border-kargo-border hover:border-kargo-steel'
            )}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Rental list */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {filtered.length > 0 ? (
          filtered.map((rental) => (
            <RentalRow key={rental.id} rental={rental} />
          ))
        ) : (
          <div className="text-center py-16 bg-kargo-surface border border-kargo-border">
            <svg className="w-12 h-12 text-kargo-steel mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <p className="font-display text-sm uppercase tracking-wider text-kargo-muted">
              No hay reservas con este filtro
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
