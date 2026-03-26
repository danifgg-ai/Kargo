'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import StatusBadge from '@/components/ui/StatusBadge'
import KargoButton from '@/components/ui/KargoButton'
import { demoMachines } from '@/lib/data/machines'
import { formatGuaranies } from '@/lib/utils/currency'
import type { MachineryStatus } from '@/types/database'
import { clsx } from 'clsx'

export default function AdminMaquinariasPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<MachineryStatus | 'all'>('all')

  const filtered = demoMachines.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.brand.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
            Maquinarias
          </h1>
          <p className="text-sm text-kargo-muted mt-1">{demoMachines.length} máquinas registradas</p>
        </div>
        <KargoButton size="sm">+ Agregar máquina</KargoButton>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 bg-kargo-surface border border-kargo-border text-sm text-kargo-text placeholder:text-kargo-steel focus:border-kargo-yellow focus:outline-none"
        />
        <div className="flex gap-2">
          {(['all', 'available', 'rented', 'maintenance', 'inactive'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={clsx(
                'px-3 py-2 text-xs font-display uppercase tracking-wider border transition-all',
                statusFilter === s
                  ? 'bg-kargo-yellow text-kargo-black border-kargo-yellow font-bold'
                  : 'bg-kargo-surface text-kargo-muted border-kargo-border hover:border-kargo-steel'
              )}
            >
              {s === 'all' ? 'Todas' : s === 'available' ? 'Disp.' : s === 'rented' ? 'Alq.' : s === 'maintenance' ? 'Mant.' : 'Inact.'}
            </button>
          ))}
        </div>
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
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Máquina</th>
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Estado</th>
              <th className="text-right px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Precio/día</th>
              <th className="text-right px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Depósito</th>
              <th className="text-center px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((machine) => (
              <tr key={machine.id} className="border-b border-kargo-border/50 hover:bg-kargo-black/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 flex-shrink-0 bg-kargo-black overflow-hidden">
                      <Image src={machine.images[0]} alt={machine.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-kargo-text uppercase">{machine.name}</p>
                      <p className="text-xs text-kargo-muted">{machine.brand} &middot; {machine.model} &middot; S/N: {machine.serial_number}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={machine.status} />
                </td>
                <td className="px-4 py-3 text-right text-kargo-yellow font-display font-bold">
                  {formatGuaranies(machine.price_per_day)}
                </td>
                <td className="px-4 py-3 text-right text-kargo-text">
                  {formatGuaranies(machine.deposit_amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="px-2 py-1 text-[10px] font-display uppercase tracking-wider text-kargo-muted hover:text-kargo-yellow border border-kargo-border hover:border-kargo-yellow transition-all">
                      Editar
                    </button>
                    <button className="px-2 py-1 text-[10px] font-display uppercase tracking-wider text-kargo-muted hover:text-kargo-red border border-kargo-border hover:border-kargo-red transition-all">
                      Desactivar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-kargo-muted">No se encontraron maquinarias</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
