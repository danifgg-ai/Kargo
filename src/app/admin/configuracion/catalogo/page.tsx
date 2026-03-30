'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import KargoButton from '@/components/ui/KargoButton'
import { demoCategories } from '@/lib/data/machines'
import { clsx } from 'clsx'

export default function AdminCatalogoConfigPage() {
  const [categories, setCategories] = useState(demoCategories)
  const [newCat, setNewCat] = useState('')
  const [showImageConfig, setShowImageConfig] = useState(false)
  const [minDays, setMinDays] = useState('1')
  const [maxDays, setMaxDays] = useState('365')
  const [requireDeposit, setRequireDeposit] = useState(true)
  const [autoApprove, setAutoApprove] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addCategory = () => {
    if (!newCat.trim()) return
    setCategories([...categories, {
      id: `cat-${Date.now()}`,
      name: newCat.trim(),
      slug: newCat.trim().toLowerCase().replace(/\s+/g, '-'),
    }])
    setNewCat('')
  }

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Configuración del catálogo
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Administrá categorías, reglas de alquiler e imágenes del catálogo.
        </p>
      </motion.div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-kargo-green/10 border border-kargo-green/30 text-kargo-green text-sm"
        >
          Configuración del catálogo guardada.
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {/* Categories */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Categorías
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-kargo-black border border-kargo-border text-sm text-kargo-text"
              >
                {cat.name}
                <button
                  onClick={() => removeCategory(cat.id)}
                  className="text-kargo-muted hover:text-kargo-red transition-colors text-xs"
                >
                  x
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
              placeholder="Nueva categoría..."
              className="flex-1 px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text placeholder:text-kargo-steel focus:border-kargo-yellow focus:outline-none"
            />
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-kargo-yellow text-kargo-black font-display text-xs uppercase font-bold tracking-wider hover:shadow-kargo-sm transition-all"
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Rental rules */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
            Reglas de alquiler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Mínimo de días
              </label>
              <input
                type="number"
                value={minDays}
                onChange={(e) => setMinDays(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                Máximo de días
              </label>
              <input
                type="number"
                value={maxDays}
                onChange={(e) => setMaxDays(e.target.value)}
                className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                onClick={() => setRequireDeposit(!requireDeposit)}
                className={clsx(
                  'w-10 h-5 rounded-full transition-colors relative',
                  requireDeposit ? 'bg-kargo-yellow' : 'bg-kargo-steel'
                )}
              >
                <span className={clsx(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform',
                  requireDeposit ? 'left-5' : 'left-0.5'
                )} />
              </button>
              <span className="text-sm text-kargo-text">Requerir depósito de garantía</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                onClick={() => setAutoApprove(!autoApprove)}
                className={clsx(
                  'w-10 h-5 rounded-full transition-colors relative',
                  autoApprove ? 'bg-kargo-yellow' : 'bg-kargo-steel'
                )}
              >
                <span className={clsx(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform',
                  autoApprove ? 'left-5' : 'left-0.5'
                )} />
              </button>
              <span className="text-sm text-kargo-text">Aprobar reservas automáticamente</span>
            </label>
          </div>
        </div>

        {/* Image settings */}
        <div className="bg-kargo-surface border border-kargo-border p-6 space-y-4">
          <button
            onClick={() => setShowImageConfig(!showImageConfig)}
            className="flex items-center justify-between w-full"
          >
            <h2 className="font-display text-sm uppercase tracking-wider text-kargo-yellow">
              Configuración de imágenes
            </h2>
            <svg className={clsx('w-4 h-4 text-kargo-muted transition-transform', showImageConfig && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showImageConfig && (
            <div className="space-y-3 pt-2">
              <p className="text-xs text-kargo-muted">
                Formatos aceptados: JPG, PNG, WebP. Tamaño máximo: 5MB. Resolución recomendada: 800x600px.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                    Máx. imágenes por máquina
                  </label>
                  <input
                    type="number"
                    defaultValue={5}
                    className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
                    Calidad de compresión (%)
                  </label>
                  <input
                    type="number"
                    defaultValue={80}
                    className="w-full px-3 py-2 bg-kargo-black border border-kargo-border text-sm text-kargo-text focus:border-kargo-yellow focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <KargoButton onClick={handleSave}>Guardar configuración</KargoButton>
        </div>
      </motion.div>
    </div>
  )
}
