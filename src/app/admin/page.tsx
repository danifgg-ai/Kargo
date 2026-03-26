'use client'

import { motion } from 'framer-motion'
import StatCard from '@/components/dashboard/StatCard'
import { adminStats, demoAuditLog } from '@/lib/data/admin'
import { demoRentals } from '@/lib/data/rentals'
import { formatGuaranies } from '@/lib/utils/currency'
import { formatRelativeTime } from '@/lib/utils/dates'
import Link from 'next/link'

const actionLabels: Record<string, string> = {
  'rental.created': 'Reserva creada',
  'rental.completed': 'Reserva completada',
  'rental.cancelled': 'Reserva cancelada',
  'payment.approved': 'Pago aprobado',
  'invoice.generated': 'Factura generada',
  'machinery.updated': 'Maquinaria actualizada',
  'machinery.created': 'Maquinaria creada',
  'user.registered': 'Usuario registrado',
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-black text-kargo-text uppercase">
          Admin Dashboard
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Vista general de la plataforma KARGO.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <StatCard
          label="Ingresos totales"
          value={formatGuaranies(adminStats.totalRevenue)}
          accentColor="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          }
        />
        <StatCard
          label="Reservas activas"
          value={String(adminStats.activeRentals)}
          subtext={`${adminStats.totalRentals} totales`}
          accentColor="green"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Usuarios"
          value={String(adminStats.totalUsers)}
          subtext={`${adminStats.totalMachines} máquinas`}
          accentColor="blue"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <StatCard
          label="Pagos pendientes"
          value={String(adminStats.pendingPayments)}
          accentColor={adminStats.pendingPayments > 0 ? 'red' : 'green'}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          }
        />
      </motion.div>

      {/* Revenue chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-kargo-surface border border-kargo-border p-6"
      >
        <h2 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-4 font-bold">
          Ingresos mensuales
        </h2>
        <div className="flex items-end gap-4 h-40">
          {adminStats.monthlyRevenue.map((m) => {
            const maxAmount = Math.max(...adminStats.monthlyRevenue.map((r) => r.amount))
            const height = (m.amount / maxAmount) * 100
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-kargo-muted">{formatGuaranies(m.amount)}</span>
                <div
                  className="w-full bg-kargo-yellow/40 hover:bg-kargo-yellow/60 transition-colors rounded-t"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs font-display uppercase text-kargo-steel">{m.month}</span>
              </div>
            )
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent rentals */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-kargo-surface border border-kargo-border"
        >
          <div className="flex items-center justify-between p-5 border-b border-kargo-border">
            <h2 className="font-display text-xs uppercase tracking-wider text-kargo-muted font-bold">
              Últimas reservas
            </h2>
            <Link href="/admin/reservas" className="text-[10px] font-display uppercase tracking-wider text-kargo-yellow hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="divide-y divide-kargo-border/50">
            {demoRentals.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm text-kargo-text font-medium">{r.rental_number}</p>
                  <p className="text-xs text-kargo-muted">{r.machinery?.name}</p>
                </div>
                <span className="text-xs font-display uppercase text-kargo-yellow font-bold">
                  {formatGuaranies(r.total_amount)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Audit log */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-kargo-surface border border-kargo-border"
        >
          <div className="flex items-center justify-between p-5 border-b border-kargo-border">
            <h2 className="font-display text-xs uppercase tracking-wider text-kargo-muted font-bold">
              Actividad reciente
            </h2>
            <Link href="/admin/auditoria" className="text-[10px] font-display uppercase tracking-wider text-kargo-yellow hover:underline">
              Ver todo
            </Link>
          </div>
          <div className="divide-y divide-kargo-border/50">
            {demoAuditLog.slice(0, 5).map((log) => (
              <div key={log.id} className="px-5 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-kargo-text">{actionLabels[log.action] || log.action}</p>
                  <span className="text-[10px] text-kargo-steel">{formatRelativeTime(log.created_at)}</span>
                </div>
                <p className="text-xs text-kargo-muted mt-0.5">{log.entity} &middot; {log.user}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
