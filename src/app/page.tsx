'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DustParticles from '@/components/ui/DustParticles'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import MachineCard from '@/components/machinery/MachineCard'
import KargoLogo from '@/components/ui/KargoLogo'
import type { Machinery } from '@/types/database'

// Featured machines data for demo (will be fetched from Supabase)
const featuredMachines: Machinery[] = [
  {
    id: '1',
    category_id: '1',
    name: 'Bobcat S70',
    slug: 'bobcat-s70',
    brand: 'Bobcat',
    model: 'S70',
    year: 2023,
    serial_number: 'BOB-S70-001',
    description: 'Mini pala cargadora compacta ideal para espacios reducidos.',
    specifications: { engine: 'Diesel', bucket_width: '91cm' },
    images: ['https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80'],
    price_per_hour: 180000,
    price_per_day: 1200000,
    price_per_week: 6500000,
    price_per_month: 22000000,
    deposit_amount: 5000000,
    status: 'available',
    is_featured: true,
    horse_power: 23,
    weight_kg: 1341,
    fuel_type: 'Diésel',
    load_capacity_kg: 318,
    max_speed_kmh: 10.5,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    category_id: '1',
    name: 'CAT 226D3',
    slug: 'cat-226d3',
    brand: 'Caterpillar',
    model: '226D3',
    year: 2024,
    serial_number: 'CAT-226D3-001',
    description: 'Pala cargadora de alto rendimiento con cabina cerrada.',
    specifications: { engine: 'Cat C2.2', bucket_width: '152cm' },
    images: ['https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&q=80'],
    price_per_hour: 250000,
    price_per_day: 1800000,
    price_per_week: 9500000,
    price_per_month: 32000000,
    deposit_amount: 8000000,
    status: 'available',
    is_featured: true,
    horse_power: 67,
    weight_kg: 2687,
    fuel_type: 'Diésel',
    load_capacity_kg: 680,
    max_speed_kmh: 12.7,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    category_id: '1',
    name: 'John Deere 324G',
    slug: 'john-deere-324g',
    brand: 'John Deere',
    model: '324G',
    year: 2024,
    serial_number: 'JD-324G-001',
    description: 'Minicargadora de orugas con máxima tracción en terrenos difíciles.',
    specifications: { engine: 'Yanmar', tracks: 'Rubber' },
    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'],
    price_per_hour: 280000,
    price_per_day: 2000000,
    price_per_week: 10500000,
    price_per_month: 35000000,
    deposit_amount: 10000000,
    status: 'rented',
    is_featured: true,
    horse_power: 74,
    weight_kg: 3850,
    fuel_type: 'Diésel',
    load_capacity_kg: 952,
    max_speed_kmh: 11.3,
    created_at: '',
    updated_at: '',
  },
]

const stats = [
  { value: 12, suffix: '+', label: 'Máquinas en flota' },
  { value: 8500, suffix: '+', label: 'Horas operadas' },
  { value: 45, suffix: '+', label: 'Clientes activos' },
  { value: 120, suffix: '+', label: 'Proyectos completados' },
]

const steps = [
  {
    number: '01',
    title: 'Elegí',
    description: 'Explorá nuestro catálogo y encontrá la maquinaria perfecta para tu proyecto.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75',
  },
  {
    number: '02',
    title: 'Reservá',
    description: 'Seleccioná las fechas, revisá el presupuesto y pagá online con Bancard.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=75',
  },
  {
    number: '03',
    title: 'Trabajá',
    description: 'Recibí la maquinaria y monitoreá en tiempo real desde tu dashboard.',
    image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=600&q=75',
  },
]

const differentiators = [
  {
    title: 'Monitoreo GPS en tiempo real',
    description: 'Seguí tu maquinaria en vivo: ubicación, horas de motor, consumo de combustible.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: 'Factura electrónica SIFEN',
    description: 'Facturación electrónica automática aprobada por la SET de Paraguay.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Entrega en Asunción',
    description: 'Entregamos la maquinaria en tu obra o retirás de nuestro depósito.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.075-.497 1.005-1.113C21.022 14.228 18.887 9 15.75 9h-3v8.25m0-8.25h-3.75" />
      </svg>
    ),
  },
  {
    title: 'Soporte 24/7',
    description: 'Asistencia técnica y operativa las 24 horas, los 7 días de la semana.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
]

// Trusted brands
const trustedBrands = ['Caterpillar', 'Bobcat', 'John Deere', 'Komatsu', 'Volvo', 'CASE']

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-kargo-black overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=75"
              alt="Construction site"
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
          </div>

          <DustParticles />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-kargo-black via-transparent to-kargo-dark z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-kargo-black/80 via-transparent to-kargo-black/80 z-[1]" />

          {/* Diagonal yellow accent */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-kargo-yellow z-[2]" />
          <div className="absolute -bottom-1 right-0 w-1/3 h-24 bg-kargo-yellow/5 skew-x-[-12deg] z-[1]" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <KargoLogo size="lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-kargo-yellow tracking-tight mb-6 leading-[0.9]">
                TU FLOTA.<br />
                <span className="text-kargo-text">CUANDO LA</span><br />
                <span className="text-kargo-yellow">NECESITÁS.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-kargo-muted text-lg md:text-xl mb-10 max-w-xl mx-auto"
            >
              Alquilá maquinaria de construcción en Asunción con un clic.
              Monitoreo en tiempo real. Factura electrónica. Sin complicaciones.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/catalogo"
                className="group px-8 py-4 border-2 border-kargo-yellow text-kargo-yellow font-display text-lg uppercase font-bold tracking-wider hover:bg-kargo-yellow hover:text-kargo-black transition-all duration-300"
              >
                Ver Catálogo
              </Link>
              <Link
                href="/auth/registro"
                className="px-8 py-4 bg-kargo-yellow text-kargo-black font-display text-lg uppercase font-bold tracking-wider hover:shadow-kargo transition-all duration-300"
              >
                Comenzar ahora
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 bg-kargo-surface/50 backdrop-blur-sm border border-kargo-border rounded-full animate-float"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-kargo-green animate-pulse-green" />
              <span className="text-sm text-kargo-muted font-medium">Disponibilidad en tiempo real</span>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 z-10"
          >
            <div className="w-6 h-10 border-2 border-kargo-steel rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-kargo-yellow rounded-full mt-2"
              />
            </div>
          </motion.div>
        </section>

        {/* ─── TRUSTED BRANDS BAR ─── */}
        <section className="py-8 bg-kargo-black border-b border-kargo-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {trustedBrands.map((brand, i) => (
                <motion.span
                  key={brand}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="font-display text-lg md:text-xl font-bold text-kargo-steel/60 uppercase tracking-wider"
                >
                  {brand}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="py-20 bg-kargo-dark border-b border-kargo-border relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 left-0 w-2 h-full bg-kargo-yellow/20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-4xl md:text-5xl font-black text-kargo-yellow mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-kargo-muted uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURED MACHINERY ─── */}
        <section className="py-24 bg-kargo-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-kargo-yellow font-display text-sm uppercase tracking-[0.2em] mb-3">
                Nuestra flota
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-kargo-text uppercase">
                Maquinaria destacada
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMachines.map((machine, i) => (
                <MachineCard key={machine.id} machine={machine} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-kargo-border text-kargo-muted font-display text-base uppercase font-bold tracking-wider hover:border-kargo-yellow hover:text-kargo-yellow transition-all duration-300"
              >
                Ver catálogo completo
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-24 bg-kargo-black kargo-noise">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-kargo-yellow font-display text-sm uppercase tracking-[0.2em] mb-3">
                Proceso simple
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-kargo-text uppercase">
                Cómo funciona
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative group"
                >
                  {/* Step image */}
                  <div className="relative h-48 mb-6 overflow-hidden bg-kargo-surface border border-kargo-border group-hover:border-kargo-yellow/50 transition-colors">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-kargo-black via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-10 h-10 bg-kargo-yellow flex items-center justify-center">
                      <span className="font-display text-sm font-black text-kargo-black">{step.number}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-kargo-text uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="text-kargo-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DIFFERENTIATORS ─── */}
        <section className="py-24 bg-kargo-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-kargo-yellow font-display text-sm uppercase tracking-[0.2em] mb-3">
                ¿Por qué KARGO?
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-kargo-text uppercase">
                Lo que nos diferencia
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {differentiators.map((diff, i) => (
                <motion.div
                  key={diff.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 bg-kargo-surface border border-kargo-border kargo-card-sm hover:border-kargo-yellow hover:shadow-kargo-sm transition-all duration-500"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-kargo-black border border-kargo-border text-kargo-yellow mb-4 group-hover:border-kargo-yellow transition-colors">
                    {diff.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-kargo-text uppercase mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-sm text-kargo-muted leading-relaxed">
                    {diff.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-24 bg-kargo-black kargo-noise relative overflow-hidden">
          {/* Yellow accent glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kargo-yellow/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Background CTA image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=60"
              alt=""
              fill
              className="object-cover opacity-10"
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-6xl font-black text-kargo-text uppercase mb-6 leading-tight">
                Tu próximo proyecto<br />
                <span className="text-kargo-yellow">empieza acá</span>
              </h2>
              <p className="text-kargo-muted text-lg mb-10 max-w-lg mx-auto">
                Registrate gratis y accedé a la flota de maquinaria más moderna de Asunción.
                Sin compromisos, sin papeleos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/registro"
                  className="px-10 py-5 bg-kargo-yellow text-kargo-black font-display text-lg uppercase font-bold tracking-wider hover:shadow-kargo-lg transition-all duration-300"
                >
                  Crear cuenta gratis
                </Link>
                <Link
                  href="/catalogo"
                  className="px-10 py-5 border-2 border-kargo-border text-kargo-muted font-display text-lg uppercase font-bold tracking-wider hover:border-kargo-yellow hover:text-kargo-yellow transition-all duration-300"
                >
                  Explorar catálogo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
