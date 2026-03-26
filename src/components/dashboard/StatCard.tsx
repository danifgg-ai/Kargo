'use client'

import { clsx } from 'clsx'

interface StatCardProps {
  label: string
  value: string
  subtext?: string
  icon: React.ReactNode
  accentColor?: 'yellow' | 'green' | 'blue' | 'red'
}

const accentStyles = {
  yellow: 'border-kargo-yellow/30 bg-kargo-yellow/5',
  green: 'border-kargo-green/30 bg-kargo-green/5',
  blue: 'border-kargo-blue/30 bg-kargo-blue/5',
  red: 'border-kargo-red/30 bg-kargo-red/5',
}

const iconStyles = {
  yellow: 'text-kargo-yellow',
  green: 'text-kargo-green',
  blue: 'text-kargo-blue',
  red: 'text-kargo-red',
}

export default function StatCard({ label, value, subtext, icon, accentColor = 'yellow' }: StatCardProps) {
  return (
    <div className={clsx('border p-5 transition-all', accentStyles[accentColor])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-display uppercase tracking-wider text-kargo-muted mb-1">
            {label}
          </p>
          <p className="font-display text-2xl font-bold text-kargo-text">
            {value}
          </p>
          {subtext && (
            <p className="text-xs text-kargo-muted mt-1">{subtext}</p>
          )}
        </div>
        <div className={clsx('w-10 h-10 flex items-center justify-center', iconStyles[accentColor])}>
          {icon}
        </div>
      </div>
    </div>
  )
}
