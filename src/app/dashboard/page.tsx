'use client'

import { motion } from 'framer-motion'
import StatCard from '@/components/dashboard/StatCard'
import RentalRow from '@/components/dashboard/RentalRow'
import { demoRentals } from '@/lib/data/rentals'
import { formatGuaranies } from '@/lib/utils/currency'
import Link from 'next/link'

export default function DashboardPage() {
  const activeRentals = demoRentals.filter((r) => r.status === 'active')
  const totalSpent = demoRentals
    .filter((r) => r.status === 'completed' || r.status === 'active')
    .reduce((sum, r) => sum + r.total_amount, 0)
  const pendingCount = demoRentals.filter((r) => r.status === 'pending_payment').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-2xl md:text-3xl font-black text-kargo-text uppercase">
          Dashboard
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Bienvenido de vuelta. Aquí tenés un resumen de tu cuenta.
        </p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <StatCard
          label="Reservas activas"
          value={String(activeRentals.length)}
          subtext="En operación ahora"
          accentColor="green"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Total reservas"
          value={String(demoRentals.length)}
          subtext="Histórico completo"
          accentColor="blue"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          }
        />
        <StatCard
          label="Pagos pendientes"
          value={String(pendingCount)}
          subtext={pendingCount > 0 ? 'Requiere acción' : 'Todo al día'}
          accentColor={pendingCount > 0 ? 'red' : 'green'}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Total invertido"
          value={formatGuaranies(totalSpent)}
          subtext="Alquileres completados + activos"
          accentColor="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          }
        />
      </motion.div>

      {/* Recent rentals */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-muted font-bold">
            Reservas recientes
          </h2>
          <Link
            href="/dashboard/reservas"
            className="text-xs font-display uppercase tracking-wider text-kargo-yellow hover:underline"
          >
            Ver todas
          </Link>
        </div>

        <div className="space-y-3">
          {demoRentals.slice(0, 3).map((rental) => (
            <RentalRow key={rental.id} rental={rental} />
          ))}
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Link
          href="/catalogo"
          className="flex items-center gap-4 p-5 bg-kargo-surface border border-kargo-border hover:border-kargo-yellow/30 transition-all group"
        >
          <div className="w-12 h-12 bg-kargo-yellow/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-kargo-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-wider text-kargo-text font-bold group-hover:text-kargo-yellow transition-colors">
              Nueva reserva
            </p>
            <p className="text-xs text-kargo-muted mt-0.5">Explorá nuestro catálogo de maquinaria</p>
          </div>
        </Link>

        <Link
          href="/dashboard/perfil"
          className="flex items-center gap-4 p-5 bg-kargo-surface border border-kargo-border hover:border-kargo-yellow/30 transition-all group"
        >
          <div className="w-12 h-12 bg-kargo-blue/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-kargo-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-wider text-kargo-text font-bold group-hover:text-kargo-yellow transition-colors">
              Configurar perfil
            </p>
            <p className="text-xs text-kargo-muted mt-0.5">Datos personales y facturación</p>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
