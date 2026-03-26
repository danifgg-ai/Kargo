'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { demoNotifications } from '@/lib/data/rentals'
import { formatRelativeTime } from '@/lib/utils/dates'
import { clsx } from 'clsx'

export default function NotificacionesPage() {
  const [notifications, setNotifications] = useState(demoNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
            Notificaciones
          </h1>
          <p className="text-sm text-kargo-muted mt-1">
            {unreadCount > 0
              ? `${unreadCount} sin leer`
              : 'Todas leídas'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-display uppercase tracking-wider text-kargo-yellow hover:underline"
          >
            Marcar todas como leídas
          </button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            onClick={() => markAsRead(notification.id)}
            className={clsx(
              'p-4 border transition-all cursor-pointer',
              notification.read
                ? 'bg-kargo-surface border-kargo-border'
                : 'bg-kargo-yellow/5 border-kargo-yellow/20 hover:border-kargo-yellow/40'
            )}
          >
            <div className="flex items-start gap-3">
              {/* Dot indicator */}
              <div className="mt-1.5 flex-shrink-0">
                <div
                  className={clsx(
                    'w-2 h-2 rounded-full',
                    notification.read ? 'bg-kargo-steel' : 'bg-kargo-yellow'
                  )}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={clsx(
                      'text-sm font-display uppercase tracking-wider',
                      notification.read
                        ? 'text-kargo-muted font-medium'
                        : 'text-kargo-text font-bold'
                    )}
                  >
                    {notification.title}
                  </h3>
                  <span className="text-[10px] text-kargo-steel flex-shrink-0">
                    {formatRelativeTime(notification.created_at)}
                  </span>
                </div>
                <p className="text-sm text-kargo-muted mt-1">
                  {notification.message}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {notifications.length === 0 && (
        <div className="text-center py-16 bg-kargo-surface border border-kargo-border">
          <svg className="w-12 h-12 text-kargo-steel mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <p className="font-display text-sm uppercase tracking-wider text-kargo-muted">
            No hay notificaciones
          </p>
        </div>
      )}
    </div>
  )
}
