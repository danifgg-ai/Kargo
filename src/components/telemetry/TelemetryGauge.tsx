'use client'

import { clsx } from 'clsx'

interface TelemetryGaugeProps {
  label: string
  value: number
  max: number
  unit: string
  icon: React.ReactNode
  color?: 'yellow' | 'green' | 'red' | 'blue'
  showBar?: boolean
}

const barColors = {
  yellow: 'bg-kargo-yellow',
  green: 'bg-kargo-green',
  red: 'bg-kargo-red',
  blue: 'bg-kargo-blue',
}

const textColors = {
  yellow: 'text-kargo-yellow',
  green: 'text-kargo-green',
  red: 'text-kargo-red',
  blue: 'text-kargo-blue',
}

export default function TelemetryGauge({
  label,
  value,
  max,
  unit,
  icon,
  color = 'yellow',
  showBar = true,
}: TelemetryGaugeProps) {
  const percentage = Math.min(100, (value / max) * 100)

  return (
    <div className="bg-kargo-surface border border-kargo-border p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={clsx('w-5 h-5', textColors[color])}>{icon}</span>
        <span className="text-[10px] font-display uppercase tracking-wider text-kargo-muted">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={clsx('font-display text-2xl font-bold', textColors[color])}>
          {typeof value === 'number' ? value.toFixed(1) : value}
        </span>
        <span className="text-xs text-kargo-steel">{unit}</span>
      </div>
      {showBar && (
        <div className="mt-2 h-1.5 bg-kargo-black rounded-full overflow-hidden">
          <div
            className={clsx('h-full rounded-full transition-all duration-500', barColors[color])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  )
}
