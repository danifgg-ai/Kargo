'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import KargoInput from '@/components/ui/KargoInput'
import KargoButton from '@/components/ui/KargoButton'

// Demo profile data — in production this comes from useAuth + Supabase
const demoProfile = {
  fullName: 'Carlos Benítez',
  email: 'carlos@constructora.com.py',
  company: 'Constructora Guaraní S.A.',
  ruc: '80012345-6',
  phone: '+595 21 555 1234',
  address: 'Av. España 1234, Asunción',
  city: 'Asunción',
  billingName: 'Constructora Guaraní S.A.',
  billingRuc: '80012345-6',
  billingAddress: 'Av. España 1234, Asunción',
}

export default function PerfilPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState(demoProfile)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // In production: await supabase.from('user_profiles').update({...}).eq('id', user.id)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updateField = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Mi perfil
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Gestioná tus datos personales y de facturación.
        </p>
      </motion.div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Personal info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-kargo-surface border border-kargo-border p-6"
        >
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-muted mb-5 font-bold">
            Datos personales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <KargoInput
              label="Nombre completo"
              value={profile.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
            />
            <KargoInput
              label="Email"
              type="email"
              value={profile.email}
              disabled
              helperText="El email no puede ser modificado"
            />
            <KargoInput
              label="Empresa"
              value={profile.company}
              onChange={(e) => updateField('company', e.target.value)}
            />
            <KargoInput
              label="RUC"
              value={profile.ruc}
              onChange={(e) => updateField('ruc', e.target.value)}
            />
            <KargoInput
              label="Teléfono"
              value={profile.phone}
              onChange={(e) => updateField('phone', e.target.value)}
            />
            <KargoInput
              label="Ciudad"
              value={profile.city}
              onChange={(e) => updateField('city', e.target.value)}
            />
            <div className="md:col-span-2">
              <KargoInput
                label="Dirección"
                value={profile.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Billing info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-kargo-surface border border-kargo-border p-6"
        >
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-muted mb-5 font-bold">
            Datos de facturación
          </h2>
          <p className="text-xs text-kargo-muted mb-4">
            Estos datos se usarán por defecto al generar facturas electrónicas (SIFEN).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <KargoInput
                label="Razón social"
                value={profile.billingName}
                onChange={(e) => updateField('billingName', e.target.value)}
              />
            </div>
            <KargoInput
              label="RUC de facturación"
              value={profile.billingRuc}
              onChange={(e) => updateField('billingRuc', e.target.value)}
            />
            <div className="md:col-span-2">
              <KargoInput
                label="Dirección fiscal"
                value={profile.billingAddress}
                onChange={(e) => updateField('billingAddress', e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Save button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <KargoButton type="submit" isLoading={isSaving}>
            Guardar cambios
          </KargoButton>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-kargo-green"
            >
              Cambios guardados correctamente
            </motion.span>
          )}
        </motion.div>
      </form>
    </div>
  )
}
