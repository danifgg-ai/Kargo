'use client'

import { clsx } from 'clsx'

interface EngineStatusProps {
  isOn: boolean
  engineHours: number
}

export default function EngineStatus({ isOn, engineHours }: EngineStatusProps) {
  return (
    <div className={clsx(
      'border p-4 transition-all',
      isOn
        ? 'bg-kargo-green/5 border-kargo-green/30'
        : 'bg-kargo-surface border-kargo-border'
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={clsx(
            'w-3 h-3 rounded-full',
            isOn ? 'bg-kargo-green animate-pulse-green' : 'bg-kargo-steel'
          )} />
          <div>
            <p className={clsx(
              'font-display text-sm uppercase tracking-wider font-bold',
              isOn ? 'text-kargo-green' : 'text-kargo-steel'
            )}>
              Motor {isOn ? 'Encendido' : 'Apagado'}
            </p>
            <p className="text-xs text-kargo-muted mt-0.5">
              {engineHours.toFixed(1)} horas acumuladas
            </p>
          </div>
        </div>
        <svg
          className={clsx('w-8 h-8', isOn ? 'text-kargo-green' : 'text-kargo-steel')}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
        </svg>
      </div>
    </div>
  )
}
