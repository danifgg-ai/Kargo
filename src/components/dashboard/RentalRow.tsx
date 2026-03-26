'use client'

import Link from 'next/link'
import Image from 'next/image'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatGuaranies } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/dates'
import type { Rental, RentalStatus } from '@/types/database'

interface RentalRowProps {
  rental: Rental
}

export default function RentalRow({ rental }: RentalRowProps) {
  return (
    <Link
      href={`/dashboard/reservas/${rental.id}`}
      className="flex items-center gap-4 p-4 bg-kargo-surface border border-kargo-border hover:border-kargo-yellow/30 transition-all group"
    >
      {/* Machine thumbnail */}
      {rental.machinery?.images?.[0] && (
        <div className="relative w-16 h-16 flex-shrink-0 bg-kargo-black overflow-hidden">
          <Image
            src={rental.machinery.images[0]}
            alt={rental.machinery.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-display text-sm font-bold text-kargo-text uppercase truncate">
            {rental.machinery?.name || 'Maquinaria'}
          </span>
          <StatusBadge status={rental.status as RentalStatus} />
        </div>
        <p className="text-xs text-kargo-muted">
          {rental.rental_number} &middot; {formatDate(rental.start_date)} — {formatDate(rental.end_date)}
        </p>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0 hidden sm:block">
        <p className="font-display text-sm font-bold text-kargo-yellow">
          {formatGuaranies(rental.total_amount)}
        </p>
        <p className="text-[10px] text-kargo-muted uppercase">Total</p>
      </div>

      {/* Arrow */}
      <svg className="w-4 h-4 text-kargo-steel group-hover:text-kargo-yellow transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  )
}
