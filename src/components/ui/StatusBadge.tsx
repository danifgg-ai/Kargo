'use client'

import { clsx } from 'clsx'
import type { MachineryStatus, RentalStatus } from '@/types/database'

type BadgeStatus = MachineryStatus | RentalStatus

const config: Record<string, { label: string; color: string; bg: string; pulse?: string }> = {
  available: { label: 'Disponible', color: 'text-kargo-green', bg: 'bg-kargo-green/10 border-kargo-green/30', pulse: 'animate-pulse-green' },
  rented: { label: 'Ocupado', color: 'text-kargo-red', bg: 'bg-kargo-red/10 border-kargo-red/30', pulse: 'animate-pulse-red' },
  maintenance: { label: 'Mantenimiento', color: 'text-kargo-orange', bg: 'bg-kargo-orange/10 border-kargo-orange/30' },
  inactive: { label: 'Inactivo', color: 'text-kargo-steel', bg: 'bg-kargo-steel/10 border-kargo-steel/30' },
  pending_payment: { label: 'Pago pendiente', color: 'text-kargo-yellow', bg: 'bg-kargo-yellow/10 border-kargo-yellow/30' },
  confirmed: { label: 'Confirmado', color: 'text-kargo-blue', bg: 'bg-kargo-blue/10 border-kargo-blue/30' },
  active: { label: 'Activo', color: 'text-kargo-green', bg: 'bg-kargo-green/10 border-kargo-green/30', pulse: 'animate-pulse-green' },
  completed: { label: 'Completado', color: 'text-kargo-muted', bg: 'bg-kargo-surface border-kargo-border' },
  cancelled: { label: 'Cancelado', color: 'text-kargo-red', bg: 'bg-kargo-red/10 border-kargo-red/30' },
}

interface StatusBadgeProps {
  status: BadgeStatus
  size?: 'sm' | 'md'
  showDot?: boolean
}

export default function StatusBadge({ status, size = 'sm', showDot = true }: StatusBadgeProps) {
  const c = config[status] || config.inactive

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 border font-display uppercase tracking-wider font-medium',
        c.bg, c.color,
        size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-xs',
        c.pulse
      )}
    >
      {showDot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full', c.color.replace('text-', 'bg-'))} />
      )}
      {c.label}
    </span>
  )
}
