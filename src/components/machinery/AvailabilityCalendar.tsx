'use client'

import { useState, useMemo } from 'react'
import { clsx } from 'clsx'

interface AvailabilityCalendarProps {
  blockedDates?: string[] // ISO date strings
  maintenanceDates?: string[]
  onRangeSelect?: (start: string, end: string) => void
  selectedStart?: string | null
  selectedEnd?: string | null
}

const DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function toDateString(d: Date): string {
  return d.toISOString().split('T')[0]
}

export default function AvailabilityCalendar({
  blockedDates = [],
  maintenanceDates = [],
  onRangeSelect,
  selectedStart,
  selectedEnd,
}: AvailabilityCalendarProps) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [hoverDate, setHoverDate] = useState<string | null>(null)
  const [localStart, setLocalStart] = useState<string | null>(selectedStart || null)
  const [localEnd, setLocalEnd] = useState<string | null>(selectedEnd || null)

  const blockedSet = useMemo(() => new Set(blockedDates), [blockedDates])
  const maintenanceSet = useMemo(() => new Set(maintenanceDates), [maintenanceDates])

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7 // Monday = 0

  const days = useMemo(() => {
    const result: (number | null)[] = []
    for (let i = 0; i < firstDayOfWeek; i++) result.push(null)
    for (let d = 1; d <= daysInMonth; d++) result.push(d)
    return result
  }, [firstDayOfWeek, daysInMonth])

  const navigate = (dir: number) => {
    let m = viewMonth + dir
    let y = viewYear
    if (m > 11) { m = 0; y++ }
    if (m < 0) { m = 11; y-- }
    setViewMonth(m)
    setViewYear(y)
  }

  const handleDayClick = (day: number) => {
    const dateStr = toDateString(new Date(viewYear, viewMonth, day))

    if (blockedSet.has(dateStr) || maintenanceSet.has(dateStr)) return

    const dateObj = new Date(dateStr)
    if (dateObj < new Date(toDateString(today))) return

    if (!localStart || (localStart && localEnd)) {
      setLocalStart(dateStr)
      setLocalEnd(null)
    } else {
      if (dateStr < localStart) {
        setLocalStart(dateStr)
        setLocalEnd(null)
      } else {
        setLocalEnd(dateStr)
        onRangeSelect?.(localStart, dateStr)
      }
    }
  }

  const isInRange = (dateStr: string) => {
    if (!localStart) return false
    const end = localEnd || hoverDate
    if (!end) return false
    return dateStr >= localStart && dateStr <= end
  }

  return (
    <div className="bg-kargo-surface border border-kargo-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center text-kargo-muted hover:text-kargo-yellow transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-display text-sm uppercase tracking-wider text-kargo-text">
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 flex items-center justify-center text-kargo-muted hover:text-kargo-yellow transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] text-kargo-muted uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />

          const dateStr = toDateString(new Date(viewYear, viewMonth, day))
          const isBlocked = blockedSet.has(dateStr)
          const isMaintenance = maintenanceSet.has(dateStr)
          const isPast = new Date(dateStr) < new Date(toDateString(today))
          const isToday = dateStr === toDateString(today)
          const isStart = dateStr === localStart
          const isEnd = dateStr === localEnd
          const inRange = isInRange(dateStr)
          const isDisabled = isBlocked || isMaintenance || isPast

          return (
            <button
              key={dateStr}
              disabled={isDisabled}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => localStart && !localEnd && setHoverDate(dateStr)}
              onMouseLeave={() => setHoverDate(null)}
              className={clsx(
                'aspect-square flex items-center justify-center text-xs font-medium transition-all relative',
                isDisabled && 'cursor-not-allowed',
                isBlocked && 'bg-kargo-red/20 text-kargo-red/50 line-through',
                isMaintenance && 'bg-kargo-steel/20 text-kargo-steel line-through',
                isPast && !isBlocked && !isMaintenance && 'text-kargo-steel/40',
                !isDisabled && !inRange && !isStart && !isEnd && 'text-kargo-text hover:bg-kargo-border',
                inRange && !isStart && !isEnd && 'bg-kargo-yellow/10 text-kargo-yellow',
                (isStart || isEnd) && 'bg-kargo-yellow text-kargo-black font-bold',
                isToday && !isStart && !isEnd && 'ring-1 ring-kargo-yellow',
              )}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-3 border-t border-kargo-border">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-kargo-green/30 border border-kargo-green/50" />
          <span className="text-[10px] text-kargo-muted">Disponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-kargo-red/30 border border-kargo-red/50" />
          <span className="text-[10px] text-kargo-muted">Ocupado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-kargo-steel/30 border border-kargo-steel/50" />
          <span className="text-[10px] text-kargo-muted">Mantenimiento</span>
        </div>
      </div>
    </div>
  )
}
