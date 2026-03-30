'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import KargoButton from '@/components/ui/KargoButton'
import { clsx } from 'clsx'

const DEFAULT_ADMIN = {
  email: 'admin@kargo.com.py',
  password: 'Kargo2024!',
  role: 'super_admin',
}

export default function AdminOperacionesConfigPage() {
  const [deliveryEnabled, setDeliveryEnabled] = useState(true)
  const [deliveryFee, setDeliveryFee] = useState('500000')
  const [freeDeliveryMin, setFreeDeliveryMin] = useState('5000000')
  const [maintenanceInterval, setMaintenanceInterval] = useState('500')
  const [notifyLowFuel, setNotifyLowFuel] = useState(true)
  const [notifyMaintenance, setNotifyMaintenance] = useState(true)
  const [notifyNewBooking, setNotifyNewBooking] = useState(true)
  const [workingHoursStart, setWorkingHoursStart] = useState('07:00')
  const [workingHoursEnd, setWorkingHoursEnd] = useState('18:00')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Configuración de operaciones
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Ajustes de entregas, mantenimiento, notificaciones y horarios.
        </p>
      </motion.div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-kargo-green/10 border border-kargo-green/30 text-kargo-green text-sm"
        >
          Configuración operativa guardada.
        </motion.div>
      )}

      {/* Default admin info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-kargo-yellow/5 border border-kargo-yellow/30 p-4 space-y-2"
      >
        <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow font-bold">
          Usuario administrador por defecto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-[10px] text-kargo-muted uppercase tracking-wider block">Email</span>
            <span className="text-kargo-text font-medium">{DEFAULT_ADMIN.email}</span>
          </div>
          <div>
            <span className="text-[10px] text-kargo-muted uppercase tracking-wider block">Contraseña</span>
            <span className="text-kargo-text font-medium font-mono">{DEFAULT_ADMIN.password}</span>
          </div>
          <div>
            <span className="text-[10px] text-kargo-muted uppercase tracking-wider block">Rol</span>
            <span className="text-kargo-red font-display uppercase tracking-wider text-xs font-bold">Super Admin</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {/* Delivery */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Entregas
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              onClick={() => setDeliveryEnabled(!deliveryEnabled)}
              className={clsx(
                'w-10 h-5 rounded-full transition-colors relative',
                deliveryEnabled ? 'bg-kargo-yellow' : 'bg-kargo-steel'
              )}
            >
              <span className={clsx(
                'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform',
                deliveryEnabled ? 'left-5' : 'left-0.5'
              )} />
            </button>
            <span className="text-sm text-kargo-text">Habilitar entrega en obra</span>
          </label>
          {deliveryEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                  Costo de entrega (Gs.)
                </label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                  Entrega gratis desde (Gs.)
                </label>
                <input
                  type="number"
                  value={freeDeliveryMin}
                  onChange={(e) => setFreeDeliveryMin(e.target.value)}
                  className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Working hours */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Horario de operación
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Hora de inicio
              </label>
              <input
                type="time"
                value={workingHoursStart}
                onChange={(e) => setWorkingHoursStart(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Hora de cierre
              </label>
              <input
                type="time"
                value={workingHoursEnd}
                onChange={(e) => setWorkingHoursEnd(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Mantenimiento
          </h2>
          <div>
            <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
              Intervalo de mantenimiento (horas de motor)
            </label>
            <input
              type="number"
              value={maintenanceInterval}
              onChange={(e) => setMaintenanceInterval(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Notificaciones al admin
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Nueva reserva', value: notifyNewBooking, set: setNotifyNewBooking },
              { label: 'Combustible bajo', value: notifyLowFuel, set: setNotifyLowFuel },
              { label: 'Mantenimiento requerido', value: notifyMaintenance, set: setNotifyMaintenance },
            ].map((n) => (
              <label key={n.label} className="flex items-center gap-3 cursor-pointer">
                <button
                  onClick={() => n.set(!n.value)}
                  className={clsx(
                    'w-10 h-5 rounded-full transition-colors relative',
                    n.value ? 'bg-kargo-yellow' : 'bg-kargo-steel'
                  )}
                >
                  <span className={clsx(
                    'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform',
                    n.value ? 'left-5' : 'left-0.5'
                  )} />
                </button>
                <span className="text-sm text-kargo-text">{n.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <KargoButton onClick={handleSave}>Guardar configuración</KargoButton>
        </div>
      </motion.div>
    </div>
  )
}
