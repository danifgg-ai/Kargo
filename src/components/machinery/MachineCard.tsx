'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatGuaranies } from '@/lib/utils/currency'
import type { Machinery } from '@/types/database'

interface MachineCardProps {
  machine: Machinery
  index?: number
}

export default function MachineCard({ machine, index = 0 }: MachineCardProps) {
  const statusConfig = {
    available: { label: 'Disponible', color: 'bg-kargo-green', animation: 'animate-pulse-green' },
    rented: { label: 'Ocupado', color: 'bg-kargo-red', animation: 'animate-pulse-red' },
    maintenance: { label: 'Mantenimiento', color: 'bg-kargo-steel', animation: '' },
    inactive: { label: 'Inactivo', color: 'bg-kargo-steel', animation: '' },
  }

  const status = statusConfig[machine.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{
        rotateX: -2,
        rotateY: 3,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <div className="bg-kargo-surface border border-kargo-border kargo-card overflow-hidden hover:shadow-kargo transition-shadow duration-500">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-kargo-black">
          {machine.images[0] ? (
            <img
              src={machine.images[0]}
              alt={machine.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-kargo-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <div className={`flex items-center gap-1.5 px-3 py-1 bg-kargo-black/80 backdrop-blur-sm ${status.animation}`}>
              <span className={`w-2 h-2 rounded-full ${status.color}`} />
              <span className="text-xs font-medium text-kargo-text uppercase tracking-wider">
                {status.label}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs text-kargo-muted uppercase tracking-wider mb-1">
            {machine.brand} &middot; {machine.model}
          </p>
          <h3 className="font-display text-xl font-bold text-kargo-text uppercase mb-3">
            {machine.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-4">
            <span className="font-display text-2xl font-bold text-kargo-yellow">
              {formatGuaranies(machine.price_per_day)}
            </span>
            <span className="text-sm text-kargo-muted">/día</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href={`/catalogo/${machine.slug}`}
              className="flex-1 px-4 py-2.5 border border-kargo-border text-kargo-text text-center font-display text-sm uppercase tracking-wider hover:border-kargo-yellow hover:text-kargo-yellow transition-colors"
            >
              Ver detalle
            </Link>
            <Link
              href={`/catalogo/${machine.slug}`}
              className="flex-1 px-4 py-2.5 bg-kargo-yellow text-kargo-black text-center font-display text-sm uppercase font-bold tracking-wider hover:shadow-kargo-sm transition-all"
            >
              Alquilar
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
