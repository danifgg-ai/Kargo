'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { demoUsers } from '@/lib/data/admin'
import { formatDate } from '@/lib/utils/dates'
import { clsx } from 'clsx'

const roleLabels: Record<string, { label: string; color: string }> = {
  client: { label: 'Cliente', color: 'text-kargo-blue bg-kargo-blue/10 border-kargo-blue/30' },
  admin: { label: 'Admin', color: 'text-kargo-yellow bg-kargo-yellow/10 border-kargo-yellow/30' },
  super_admin: { label: 'Super Admin', color: 'text-kargo-red bg-kargo-red/10 border-kargo-red/30' },
}

export default function AdminUsuariosPage() {
  const [search, setSearch] = useState('')

  const filtered = demoUsers.filter(
    (u) =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.company || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Usuarios
        </h1>
        <p className="text-sm text-kargo-muted mt-1">{demoUsers.length} usuarios registrados</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <input
          type="text"
          placeholder="Buscar por nombre, email o empresa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-kargo-surface border border-kargo-border text-sm text-kargo-text placeholder:text-kargo-steel focus:border-kargo-yellow focus:outline-none"
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-kargo-surface border border-kargo-border overflow-x-auto"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-kargo-border">
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Usuario</th>
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Empresa</th>
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Rol</th>
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Estado</th>
              <th className="text-left px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Registro</th>
              <th className="text-center px-4 py-3 text-[10px] font-display uppercase tracking-wider text-kargo-muted">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              const role = roleLabels[user.role] || roleLabels.client
              return (
                <tr key={user.id} className="border-b border-kargo-border/50 hover:bg-kargo-black/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-kargo-text font-medium">{user.full_name}</p>
                    <p className="text-xs text-kargo-muted">{user.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-kargo-muted">
                    {user.company || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx(
                      'inline-flex px-2 py-0.5 border text-[10px] font-display uppercase tracking-wider font-medium',
                      role.color
                    )}>
                      {role.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx(
                      'inline-flex items-center gap-1.5 text-xs',
                      user.is_active ? 'text-kargo-green' : 'text-kargo-red'
                    )}>
                      <span className={clsx(
                        'w-1.5 h-1.5 rounded-full',
                        user.is_active ? 'bg-kargo-green' : 'bg-kargo-red'
                      )} />
                      {user.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-kargo-muted">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-2 py-1 text-[10px] font-display uppercase tracking-wider text-kargo-muted hover:text-kargo-yellow border border-kargo-border hover:border-kargo-yellow transition-all">
                        Editar
                      </button>
                      <button className={clsx(
                        'px-2 py-1 text-[10px] font-display uppercase tracking-wider border transition-all',
                        user.is_active
                          ? 'text-kargo-muted hover:text-kargo-red border-kargo-border hover:border-kargo-red'
                          : 'text-kargo-muted hover:text-kargo-green border-kargo-border hover:border-kargo-green'
                      )}>
                        {user.is_active ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
