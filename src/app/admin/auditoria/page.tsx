'use client'

import { motion } from 'framer-motion'
import { demoAuditLog } from '@/lib/data/admin'
import { formatDateTime } from '@/lib/utils/dates'
import { clsx } from 'clsx'

const actionConfig: Record<string, { label: string; color: string; icon: string }> = {
  'rental.created': { label: 'Reserva creada', color: 'bg-kargo-blue', icon: '+' },
  'rental.completed': { label: 'Reserva completada', color: 'bg-kargo-green', icon: '✓' },
  'rental.cancelled': { label: 'Reserva cancelada', color: 'bg-kargo-red', icon: '✕' },
  'payment.approved': { label: 'Pago aprobado', color: 'bg-kargo-green', icon: '$' },
  'invoice.generated': { label: 'Factura generada', color: 'bg-kargo-yellow', icon: '📄' },
  'machinery.updated': { label: 'Maquinaria actualizada', color: 'bg-kargo-blue', icon: '✎' },
  'machinery.created': { label: 'Maquinaria creada', color: 'bg-kargo-yellow', icon: '+' },
  'user.registered': { label: 'Usuario registrado', color: 'bg-kargo-green', icon: '👤' },
}

export default function AdminAuditoriaPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Log de auditoría
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Registro completo de actividad en la plataforma.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        {demoAuditLog.map((log, index) => {
          const config = actionConfig[log.action] || { label: log.action, color: 'bg-kargo-steel', icon: '•' }

          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex gap-4 p-4 bg-kargo-surface border border-kargo-border hover:border-kargo-border/80 transition-all"
            >
              {/* Icon */}
              <div className={clsx(
                'w-8 h-8 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold',
                config.color
              )}>
                {config.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-kargo-text font-medium">{config.label}</p>
                  <span className="text-[10px] text-kargo-steel flex-shrink-0">
                    {formatDateTime(log.created_at)}
                  </span>
                </div>
                <p className="text-xs text-kargo-muted mt-0.5">
                  {log.entity}
                </p>
                <p className="text-xs text-kargo-steel mt-0.5">
                  Por: {log.user}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
