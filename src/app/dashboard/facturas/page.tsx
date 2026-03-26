'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import InvoiceRow from '@/components/invoices/InvoiceRow'
import InvoiceDetail from '@/components/invoices/InvoiceDetail'
import { demoInvoices } from '@/lib/data/invoices'
import { formatGuaranies } from '@/lib/utils/currency'
import type { Invoice, InvoiceStatus } from '@/types/database'
import { clsx } from 'clsx'

const filters: { label: string; value: InvoiceStatus | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Aprobadas', value: 'approved' },
  { label: 'Borrador', value: 'draft' },
  { label: 'Rechazadas', value: 'rejected' },
  { label: 'Anuladas', value: 'cancelled' },
]

export default function FacturasPage() {
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus | 'all'>('all')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const filtered = activeFilter === 'all'
    ? demoInvoices
    : demoInvoices.filter((inv) => inv.status === activeFilter)

  const totalApproved = demoInvoices
    .filter((inv) => inv.status === 'approved')
    .reduce((sum, inv) => sum + inv.total_amount, 0)

  if (selectedInvoice) {
    return (
      <InvoiceDetail
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-black text-kargo-text uppercase">
          Facturas electrónicas
        </h1>
        <p className="text-sm text-kargo-muted mt-1">
          Facturación electrónica SIFEN — SET Paraguay
        </p>
      </motion.div>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="border border-kargo-green/30 bg-kargo-green/5 p-4">
          <p className="text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
            Facturas aprobadas
          </p>
          <p className="font-display text-2xl font-bold text-kargo-green">
            {demoInvoices.filter((i) => i.status === 'approved').length}
          </p>
        </div>
        <div className="border border-kargo-yellow/30 bg-kargo-yellow/5 p-4">
          <p className="text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
            Total facturado
          </p>
          <p className="font-display text-2xl font-bold text-kargo-yellow">
            {formatGuaranies(totalApproved)}
          </p>
        </div>
        <div className="border border-kargo-border bg-kargo-surface p-4">
          <p className="text-[10px] font-display uppercase tracking-wider text-kargo-muted mb-1">
            Pendientes
          </p>
          <p className="font-display text-2xl font-bold text-kargo-text">
            {demoInvoices.filter((i) => i.status === 'draft').length}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-2"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={clsx(
              'px-3 py-1.5 text-xs font-display uppercase tracking-wider transition-all border',
              activeFilter === f.value
                ? 'bg-kargo-yellow text-kargo-black border-kargo-yellow font-bold'
                : 'bg-kargo-surface text-kargo-muted border-kargo-border hover:border-kargo-steel'
            )}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Invoice list */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {filtered.length > 0 ? (
          filtered.map((invoice) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              onView={setSelectedInvoice}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-kargo-surface border border-kargo-border">
            <svg className="w-12 h-12 text-kargo-steel mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="font-display text-sm uppercase tracking-wider text-kargo-muted">
              No hay facturas con este filtro
            </p>
          </div>
        )}
      </motion.div>

      {/* SIFEN info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-kargo-black border border-kargo-border p-5"
      >
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-kargo-muted flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <div>
            <p className="text-sm text-kargo-text font-medium">
              Sistema SIFEN — SET Paraguay
            </p>
            <p className="text-xs text-kargo-muted mt-1">
              Todas las facturas son generadas y validadas a través del Sistema Integrado de
              Facturación Electrónica Nacional (SIFEN) de la Subsecretaría de Estado de Tributación.
              Cada factura incluye un CDC (Código de Control Digital) y código QR para verificación.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
