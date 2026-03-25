'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MachineCard from '@/components/machinery/MachineCard'
import { demoMachines, demoCategories } from '@/lib/data/machines'
import { formatGuaranies } from '@/lib/utils/currency'

export default function CatalogoPage() {
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000])
  const [sortBy, setSortBy] = useState<string>('name')

  const filtered = useMemo(() => {
    let result = [...demoMachines]

    // Search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.brand.toLowerCase().includes(q) ||
          m.model.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q)
      )
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((m) => selectedCategories.includes(m.category_id))
    }

    // Availability
    if (availabilityFilter !== 'all') {
      result = result.filter((m) => m.status === availabilityFilter)
    }

    // Price range
    result = result.filter(
      (m) => m.price_per_day >= priceRange[0] && m.price_per_day <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price_per_day - b.price_per_day)
        break
      case 'price-desc':
        result.sort((a, b) => b.price_per_day - a.price_per_day)
        break
      case 'name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [search, selectedCategories, availabilityFilter, priceRange, sortBy])

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-kargo-dark pt-20">
        {/* Header */}
        <div className="bg-kargo-black border-b border-kargo-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-kargo-yellow font-display text-sm uppercase tracking-[0.2em] mb-2">
                Nuestra flota
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-black text-kargo-text uppercase mb-4">
                Catálogo de maquinaria
              </h1>
              <p className="text-kargo-muted max-w-xl">
                Explorá nuestra flota de maquinaria de construcción disponible para alquiler en Asunción, Paraguay.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-kargo-muted mb-2">
                    Buscar
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Nombre, marca, modelo..."
                      className="w-full px-4 py-3 pl-10 bg-kargo-surface border border-kargo-border text-kargo-text placeholder:text-kargo-steel focus:border-kargo-yellow focus:ring-1 focus:ring-kargo-yellow focus:outline-none text-sm"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kargo-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-kargo-muted mb-3">
                    Categoría
                  </label>
                  <div className="space-y-2">
                    {demoCategories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                          className="w-4 h-4 bg-kargo-surface border-kargo-border accent-kargo-yellow"
                        />
                        <span className="text-sm text-kargo-muted group-hover:text-kargo-text transition-colors">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-kargo-muted mb-3">
                    Disponibilidad
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Todas' },
                      { value: 'available', label: 'Disponible' },
                      { value: 'rented', label: 'Ocupado' },
                      { value: 'maintenance', label: 'Mantenimiento' },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="radio"
                          name="availability"
                          checked={availabilityFilter === opt.value}
                          onChange={() => setAvailabilityFilter(opt.value)}
                          className="w-4 h-4 bg-kargo-surface border-kargo-border accent-kargo-yellow"
                        />
                        <span className="text-sm text-kargo-muted group-hover:text-kargo-text transition-colors">
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-kargo-muted mb-3">
                    Precio por día
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={100000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-kargo-yellow"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-kargo-steel">Gs. 0</span>
                    <span className="text-xs text-kargo-yellow">{formatGuaranies(priceRange[1])}</span>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-kargo-muted mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2.5 bg-kargo-surface border border-kargo-border text-kargo-text text-sm focus:border-kargo-yellow focus:outline-none"
                  >
                    <option value="name">Nombre</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-kargo-muted">
                  {filtered.length} {filtered.length === 1 ? 'máquina encontrada' : 'máquinas encontradas'}
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((machine, i) => (
                    <MachineCard key={machine.id} machine={machine} index={i} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <svg className="w-16 h-16 text-kargo-steel mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="font-display text-xl text-kargo-text uppercase mb-2">
                    Sin resultados
                  </h3>
                  <p className="text-kargo-muted text-sm mb-6">
                    No encontramos maquinaria con esos filtros. Probá ajustando tu búsqueda.
                  </p>
                  <button
                    onClick={() => {
                      setSearch('')
                      setSelectedCategories([])
                      setAvailabilityFilter('all')
                      setPriceRange([0, 50000000])
                    }}
                    className="px-6 py-2.5 border border-kargo-yellow text-kargo-yellow font-display text-sm uppercase tracking-wider hover:bg-kargo-yellow hover:text-kargo-black transition-all"
                  >
                    Limpiar filtros
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
