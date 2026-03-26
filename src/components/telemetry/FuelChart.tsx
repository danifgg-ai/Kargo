'use client'

interface FuelChartProps {
  data: { hour: string; fuel_level: number }[]
}

export default function FuelChart({ data }: FuelChartProps) {
  const max = 100
  const chartHeight = 150
  const barWidth = 100 / data.length

  return (
    <div className="bg-kargo-surface border border-kargo-border p-5">
      <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-4">
        Nivel de combustible (últimas 24h)
      </h3>

      <div className="relative" style={{ height: chartHeight }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[9px] text-kargo-steel">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>

        {/* Chart area */}
        <div className="ml-10 h-full flex items-end gap-px">
          {data.map((d, i) => {
            const height = (d.fuel_level / max) * 100
            const isLow = d.fuel_level < 30

            return (
              <div
                key={i}
                className="flex-1 group relative"
                style={{ height: '100%' }}
              >
                <div
                  className={`absolute bottom-0 left-0 right-0 transition-all ${
                    isLow ? 'bg-kargo-red/60' : 'bg-kargo-yellow/40'
                  } group-hover:bg-kargo-yellow/70`}
                  style={{ height: `${height}%` }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-kargo-black border border-kargo-border text-[9px] text-kargo-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {d.hour}: {d.fuel_level.toFixed(0)}%
                </div>
              </div>
            )
          })}
        </div>

        {/* Threshold line at 30% */}
        <div
          className="absolute left-10 right-0 border-t border-dashed border-kargo-red/40"
          style={{ bottom: `${(30 / max) * 100}%` }}
        >
          <span className="absolute right-0 -top-3 text-[8px] text-kargo-red">Mínimo</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="ml-10 flex justify-between mt-2 text-[8px] text-kargo-steel">
        {data.filter((_, i) => i % 4 === 0).map((d) => (
          <span key={d.hour}>{d.hour}</span>
        ))}
      </div>

      {/* Unused var suppression */}
      {false && barWidth}
    </div>
  )
}
