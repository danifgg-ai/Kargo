'use client'

import { formatDate } from '@/lib/utils/dates'

interface DailyReport {
  date: string
  hours_used: number
  fuel_used: number
  distance_km: number
  alerts: number
}

interface DailyReportTableProps {
  reports: DailyReport[]
}

export default function DailyReportTable({ reports }: DailyReportTableProps) {
  const totalHours = reports.reduce((s, r) => s + r.hours_used, 0)
  const totalFuel = reports.reduce((s, r) => s + r.fuel_used, 0)
  const totalDistance = reports.reduce((s, r) => s + r.distance_km, 0)

  return (
    <div className="bg-kargo-surface border border-kargo-border">
      <div className="p-5 border-b border-kargo-border">
        <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted">
          Reporte diario (últimos 7 días)
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-kargo-border">
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted font-medium">
                Fecha
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted font-medium">
                Horas
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted font-medium">
                Combustible (L)
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted font-medium">
                Distancia (km)
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted font-medium">
                Alertas
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.date}
                className="border-b border-kargo-border/50 hover:bg-kargo-black/30 transition-colors"
              >
                <td className="px-4 py-3 text-kargo-text">{formatDate(report.date)}</td>
                <td className="px-4 py-3 text-right text-kargo-text">
                  {report.hours_used > 0 ? report.hours_used.toFixed(1) : '—'}
                </td>
                <td className="px-4 py-3 text-right text-kargo-text">
                  {report.fuel_used > 0 ? report.fuel_used.toFixed(1) : '—'}
                </td>
                <td className="px-4 py-3 text-right text-kargo-text">
                  {report.distance_km > 0 ? report.distance_km.toFixed(1) : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  {report.alerts > 0 ? (
                    <span className="text-kargo-red font-bold">{report.alerts}</span>
                  ) : (
                    <span className="text-kargo-steel">0</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-kargo-black/30">
              <td className="px-4 py-3 font-display text-[10px] uppercase tracking-wider text-kargo-muted font-bold">
                Total
              </td>
              <td className="px-4 py-3 text-right font-bold text-kargo-yellow">
                {totalHours.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-right font-bold text-kargo-yellow">
                {totalFuel.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-right font-bold text-kargo-yellow">
                {totalDistance.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-right text-kargo-steel">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
