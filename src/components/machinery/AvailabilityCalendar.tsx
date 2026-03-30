'use client'

import { useState, useMemo, useCallback } from 'react'
import { clsx } from 'clsx'

interface AvailabilityCalendarProps {
  blockedDates?: string[]
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

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return toDateString(d)
}

const QUICK_PRESETS = [
  { label: '1 semana', days: 7 },
  { label: '2 semanas', days: 14 },
  { label: '1 mes', days: 30 },
  { label: '3 meses', days: 90 },
]

export default function AvailabilityCalendar({
  blockedDates = [],
  maintenanceDates = [],
  onRangeSelect,
  selectedStart,
  selectedEnd,
}: AvailabilityCalendarProps) {
  const today = new Date()
  const todayStr = toDateString(today)
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [hoverDate, setHoverDate] = useState<string | null>(null)
  const [localStart, setLocalStart] = useState<string | null>(selectedStart || null)
  const [localEnd, setLocalEnd] = useState<string | null>(selectedEnd || null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const blockedSet = useMemo(() => new Set(blockedDates), [blockedDates])
  const maintenanceSet = useMemo(() => new Set(maintenanceDates), [maintenanceDates])
  const unavailableSet = useMemo(
    () => new Set([...blockedDates, ...maintenanceDates]),
    [blockedDates, maintenanceDates]
  )

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7

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

  // Check if any date in a range is unavailable
  const hasUnavailableInRange = useCallback((start: string, end: string): string[] => {
    const conflicts: string[] = []
    const current = new Date(start)
    const endDate = new Date(end)
    while (current <= endDate) {
      const ds = toDateString(current)
      if (unavailableSet.has(ds)) conflicts.push(ds)
      current.setDate(current.getDate() + 1)
    }
    return conflicts
  }, [unavailableSet])

  const handleDayClick = (day: number) => {
    const dateStr = toDateString(new Date(viewYear, viewMonth, day))

    if (blockedSet.has(dateStr) || maintenanceSet.has(dateStr)) return
    if (dateStr < todayStr) return

    setErrorMessage(null)

    if (!localStart || (localStart && localEnd)) {
      // Start new selection
      setLocalStart(dateStr)
      setLocalEnd(null)
    } else {
      if (dateStr < localStart) {
        // Clicked before start, restart
        setLocalStart(dateStr)
        setLocalEnd(null)
      } else if (dateStr === localStart) {
        // Clicked same day, reset
        setLocalStart(null)
        setLocalEnd(null)
      } else {
        // Validate range for blocked/maintenance dates
        const conflicts = hasUnavailableInRange(localStart, dateStr)
        if (conflicts.length > 0) {
          setErrorMessage(
            `No disponible: hay ${conflicts.length} día${conflicts.length > 1 ? 's' : ''} bloqueado${conflicts.length > 1 ? 's' : ''} en este rango (${conflicts.slice(0, 3).map(d => {
              const date = new Date(d + 'T12:00:00')
              return `${date.getDate()}/${date.getMonth() + 1}`
            }).join(', ')}${conflicts.length > 3 ? '...' : ''}). Seleccioná otro rango.`
          )
          setLocalStart(null)
          setLocalEnd(null)
          return
        }
        setLocalEnd(dateStr)
        onRangeSelect?.(localStart, dateStr)
      }
    }
  }

  const handleQuickPreset = (days: number) => {
    const start = todayStr
    const end = addDays(start, days - 1)

    setErrorMessage(null)

    const conflicts = hasUnavailableInRange(start, end)
    if (conflicts.length > 0) {
      setErrorMessage(
        `No se puede reservar ${days} días desde hoy: hay ${conflicts.length} día${conflicts.length > 1 ? 's' : ''} no disponible${conflicts.length > 1 ? 's' : ''} en ese período. Seleccioná las fechas manualmente.`
      )
      return
    }

    setLocalStart(start)
    setLocalEnd(end)

    // Navigate to today's month
    setViewMonth(today.getMonth())
    setViewYear(today.getFullYear())

    onRangeSelect?.(start, end)
  }

  const clearSelection = () => {
    setLocalStart(null)
    setLocalEnd(null)
    setErrorMessage(null)
  }

  const isInRange = (dateStr: string) => {
    if (!localStart) return false
    const end = localEnd || hoverDate
    if (!end) return false
    return dateStr >= localStart && dateStr <= end
  }

  // Format selected range for display
  const formatRange = () => {
    if (!localStart) return null
    const startDate = new Date(localStart + 'T12:00:00')
    const startStr = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`
    if (!localEnd) return `Desde: ${startStr} — Seleccioná fecha de fin`
    const endDate = new Date(localEnd + 'T12:00:00')
    const endStr = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`
    const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return `${startStr} → ${endStr} (${diffDays} día${diffDays > 1 ? 's' : ''})`
  }

  return (
    <div className="bg-kargo-surface border border-kargo-border p-4 space-y-4">
      {/* Quick presets */}
      <div>
        <p className="text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-2">
          Reserva rápida desde hoy
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_PRESETS.map((preset) => (
            <button
              key={preset.days}
              onClick={() => handleQuickPreset(preset.days)}
              className="px-3 py-1.5 text-xs font-display uppercase tracking-wider border border-kargo-border text-kargo-muted hover:border-kargo-yellow hover:text-kargo-yellow transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="flex items-start gap-2 p-3 bg-kargo-red/10 border border-kargo-red/30 text-kargo-red text-xs">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selected range display */}
      {(localStart) && (
        <div className="flex items-center justify-between p-2.5 bg-kargo-yellow/5 border border-kargo-yellow/20">
          <span className="text-xs text-kargo-yellow font-medium">{formatRange()}</span>
          <button
            onClick={clearSelection}
            className="text-[10px] text-kargo-muted hover:text-kargo-red transition-colors uppercase tracking-wider font-display"
          >
            Limpiar
          </button>
        </div>
      )}

      {/* Calendar header */}
      <div className="flex items-center justify-between">
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
      <div className="grid grid-cols-7 gap-1">
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
          const isPast = dateStr < todayStr
          const isToday = dateStr === todayStr
          const isStart = dateStr === localStart
          const isEnd = dateStr === localEnd
          const inRange = isInRange(dateStr)
          const isDisabled = isBlocked || isMaintenance || isPast

          // Check if hovering would create a conflicting range
          const hoverConflict = localStart && !localEnd && hoverDate && hoverDate >= localStart && dateStr >= localStart && dateStr <= hoverDate && unavailableSet.has(dateStr)

          return (
            <button
              key={dateStr}
              disabled={isDisabled}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => localStart && !localEnd && setHoverDate(dateStr)}
              onMouseLeave={() => setHoverDate(null)}
              title={
                isBlocked ? 'Ocupado — no disponible' :
                isMaintenance ? 'En mantenimiento' :
                isPast ? 'Fecha pasada' : undefined
              }
              className={clsx(
                'aspect-square flex items-center justify-center text-xs font-medium transition-all relative',
                isDisabled && 'cursor-not-allowed',
                isBlocked && 'bg-kargo-red/20 text-kargo-red/50 line-through',
                isMaintenance && 'bg-kargo-steel/20 text-kargo-steel line-through',
                isPast && !isBlocked && !isMaintenance && 'text-kargo-steel/40',
                !isDisabled && !inRange && !isStart && !isEnd && 'text-kargo-text hover:bg-kargo-border',
                inRange && !isStart && !isEnd && !hoverConflict && 'bg-kargo-yellow/10 text-kargo-yellow',
                hoverConflict && 'bg-kargo-red/20 text-kargo-red',
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
      <div className="flex flex-wrap gap-4 pt-3 border-t border-kargo-border">
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
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-kargo-yellow border border-kargo-yellow" />
          <span className="text-[10px] text-kargo-muted">Seleccionado</span>
        </div>
      </div>
    </div>
  )
}
