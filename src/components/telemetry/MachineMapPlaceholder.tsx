'use client'

interface MachineMapPlaceholderProps {
  machines: {
    id: string
    name: string
    latitude: number
    longitude: number
    engine_on: boolean
  }[]
  selectedId?: string
  onSelect?: (id: string) => void
}

export default function MachineMapPlaceholder({
  machines,
  selectedId,
  onSelect,
}: MachineMapPlaceholderProps) {
  return (
    <div className="relative bg-kargo-black border border-kargo-border overflow-hidden" style={{ height: 400 }}>
      {/* Grid background to simulate map */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-kargo-steel" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Asunción label */}
      <div className="absolute top-4 left-4 z-10">
        <p className="text-[10px] font-display uppercase tracking-wider text-kargo-steel">
          Asunción, Paraguay
        </p>
        <p className="text-[9px] text-kargo-steel mt-0.5">
          -25.2867°, -57.6470° &middot; {machines.length} máquinas rastreadas
        </p>
      </div>

      {/* Mapbox placeholder notice */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-kargo-surface/90 border border-kargo-border p-3">
          <p className="text-[10px] font-display uppercase tracking-wider text-kargo-muted">
            Mapa interactivo — Configurá NEXT_PUBLIC_MAPBOX_TOKEN para activar Mapbox GL
          </p>
        </div>
      </div>

      {/* Machine dots */}
      {machines.map((machine, index) => {
        const isSelected = selectedId === machine.id
        // Spread machines across the placeholder area
        const left = 20 + (index * 30) % 60
        const top = 25 + (index * 20) % 50

        return (
          <button
            key={machine.id}
            onClick={() => onSelect?.(machine.id)}
            className="absolute z-20 group"
            style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
          >
            {/* Pulse ring */}
            {machine.engine_on && (
              <span className="absolute inset-0 w-8 h-8 -m-1.5 rounded-full bg-kargo-green/20 animate-ping" />
            )}
            {/* Dot */}
            <span
              className={`relative block w-5 h-5 rounded-full border-2 transition-all ${
                isSelected
                  ? 'bg-kargo-yellow border-kargo-yellow scale-125'
                  : machine.engine_on
                    ? 'bg-kargo-green border-kargo-green'
                    : 'bg-kargo-steel border-kargo-steel'
              }`}
            />
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-kargo-black border border-kargo-border text-[10px] text-kargo-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {machine.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
