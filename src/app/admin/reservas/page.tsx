'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import StatusBadge from '@/components/ui/StatusBadge'
import { demoRentals } from '@/lib/data/rentals'
import { formatGuaranies } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/dates'
import type { RentalStatus } from '@/types/database'
import { clsx } from 'clsx'

const filters: { label: string; value: RentalStatus | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Activas', value: 'active' },
  { label: 'Confirmadas', value: 'confirmed' },
  { label: 'Pendientes', value: 'pending_payment' },
  { label: 'Completadas', value: 'completed' },
  { label: 'Canceladas', value: 'cancelled' },
]

export default function AdminReservasPage() {
  const [activeFilter, setActiveFilter] = useState<RentalStatus | 'all'>('all')

  const filtered = activeFilter === 'all'
    ? demoRentals
    : demoRentals.filter((r) => r.status === activeFilter)

  const totalRevenue = demoRentals
    .filter((r) => r.status === 'completed' || r.status === 'active')
    .reduce((sum, r) => sum + r.total_amount, 0)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Gestión de reservas
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          {demoRentals.length} reservas &middot; Ingresos: {formatGuaranies(totalRevenue)}
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

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-kargo-surface border border-kargo-border overflow-x-auto"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-kargo-border">
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Reserva</th>
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Máquina</th>
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Período</th>
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Estado</th>
              <th className="text-right px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Total</th>
              <th className="text-center px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rental) => (
              <tr key={rental.id} className="border-b border-kargo-border/50 hover:bg-kargo-black/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-display text-sm font-bold text-kargo-text">{rental.rental_number}</p>
                  <p className="text-xs text-kargo-muted">ID: {rental.id.slice(0, 8)}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-kargo-text">{rental.machinery?.name}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-xs text-kargo-text">{formatDate(rental.start_date)}</p>
                  <p className="text-xs text-kargo-muted">{formatDate(rental.end_date)}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={rental.status as RentalStatus} />
                </td>
                <td className="px-4 py-3 text-right font-display font-bold text-kargo-yellow">
                  {formatGuaranies(rental.total_amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="px-2 py-1 text-[10px] font-display uppercase tracking-wider text-kargo-muted hover:text-kargo-yellow border border-kargo-border hover:border-kargo-yellow transition-all">
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-kargo-muted">No hay reservas con este filtro</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
