'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import KargoButton from '@/components/ui/KargoButton'

export default function AdminConfigPage() {
  const [siteName, setSiteName] = useState('KARGO')
  const [siteTagline, setSiteTagline] = useState('Alquiler de Maquinaria de Construcción')
  const [contactEmail, setContactEmail] = useState('info@kargo.com.py')
  const [contactPhone, setContactPhone] = useState('+595 21 555 0000')
  const [address, setAddress] = useState('Avda. España 1234, Asunción, Paraguay')
  const [currency, setCurrency] = useState('PYG')
  const [ivaRate, setIvaRate] = useState('10')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Configuración del sitio
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Ajustes generales de la plataforma KARGO.
        </p>
      </motion.div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-kargo-green/10 border border-kargo-green/30 text-kargo-green text-sm"
        >
          Configuración guardada correctamente.
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {/* General */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Información general
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Nombre del sitio
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Slogan
              </label>
              <input
                type="text"
                value={siteTagline}
                onChange={(e) => setSiteTagline(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Contacto
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Teléfono
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
            />
          </div>
        </div>

        {/* Fiscal */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Configuración fiscal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Moneda
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              >
                <option value="PYG">Guaraníes (PYG)</option>
                <option value="USD">Dólares (USD)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Tasa IVA (%)
              </label>
              <input
                type="number"
                value={ivaRate}
                onChange={(e) => setIvaRate(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <KargoButton onClick={handleSave}>Guardar cambios</KargoButton>
        </div>
      </motion.div>
    </div>
  )
}
