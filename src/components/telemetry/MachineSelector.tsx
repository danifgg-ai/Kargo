'use client'

import Image from 'next/image'
import { clsx } from 'clsx'

interface Machine {
  id: string
  name: string
  image: string
  engine_on: boolean
  fuel_level: number
}

interface MachineSelectorProps {
  machines: Machine[]
  selectedId: string
  onSelect: (id: string) => void
}

export default function MachineSelector({ machines, selectedId, onSelect }: MachineSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted">
        Seleccionar máquina
      </h3>
      {machines.map((machine) => {
        const isSelected = selectedId === machine.id
        return (
          <button
            key={machine.id}
            onClick={() => onSelect(machine.id)}
            className={clsx(
              'w-full flex items-center gap-3 p-3 border transition-all text-left',
              isSelected
                ? 'border-kargo-yellow bg-kargo-yellow/5'
                : 'border-kargo-border bg-kargo-surface hover:border-kargo-steel'
            )}
          >
            <div className="relative w-10 h-10 flex-shrink-0 bg-kargo-black overflow-hidden">
              <Image
                src={machine.image}
                alt={machine.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className={clsx(
                'text-xs font-display uppercase tracking-wider font-bold truncate',
                isSelected ? 'text-kargo-yellow' : 'text-kargo-text'
              )}>
                {machine.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={clsx(
                  'w-1.5 h-1.5 rounded-full',
                  machine.engine_on ? 'bg-kargo-green' : 'bg-kargo-steel'
                )} />
                <span className="text-[10px] text-kargo-muted">
                  {machine.engine_on ? 'En operación' : 'Apagado'} &middot; {machine.fuel_level}% fuel
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
