'use client'

import { clsx } from 'clsx'
import { formatGuaranies } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/dates'
import type { Invoice, InvoiceStatus } from '@/types/database'

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  draft: { label: 'Borrador', color: 'text-kargo-steel', bg: 'bg-kargo-steel/10 border-kargo-steel/30' },
  sent_to_set: { label: 'Enviada a SET', color: 'text-kargo-yellow', bg: 'bg-kargo-yellow/10 border-kargo-yellow/30' },
  approved: { label: 'Aprobada', color: 'text-kargo-green', bg: 'bg-kargo-green/10 border-kargo-green/30' },
  rejected: { label: 'Rechazada', color: 'text-kargo-red', bg: 'bg-kargo-red/10 border-kargo-red/30' },
  cancelled: { label: 'Anulada', color: 'text-kargo-red', bg: 'bg-kargo-red/10 border-kargo-red/30' },
}

interface InvoiceRowProps {
  invoice: Invoice
  onView: (invoice: Invoice) => void
}

export default function InvoiceRow({ invoice, onView }: InvoiceRowProps) {
  const sc = statusConfig[invoice.status] || statusConfig.draft

  return (
    <button
      onClick={() => onView(invoice)}
      className="w-full flex items-center gap-4 p-4 bg-kargo-surface border border-kargo-border hover:border-kargo-yellow/30 transition-all text-left group"
    >
      {/* Invoice icon */}
      <div className="w-10 h-10 bg-kargo-black flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-kargo-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-display text-sm font-bold text-kargo-text uppercase">
            {invoice.invoice_number}
          </span>
          <span
            className={clsx(
              'inline-flex items-center px-2 py-0.5 border text-[10px] font-display uppercase tracking-wider font-medium',
              sc.bg, sc.color
            )}
          >
            {sc.label}
          </span>
        </div>
        <p className="text-xs text-kargo-muted">
          {invoice.receiver_name} &middot; {formatDate(invoice.created_at)}
        </p>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0 hidden sm:block">
        <p className="font-display text-sm font-bold text-kargo-yellow">
          {formatGuaranies(invoice.total_amount)}
        </p>
        <p className="text-[10px] text-kargo-muted">IVA: {formatGuaranies(invoice.iva_amount)}</p>
      </div>

      {/* Arrow */}
      <svg className="w-4 h-4 text-kargo-steel group-hover:text-kargo-yellow transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  )
}

// Suppress unused type import warning
void (undefined as unknown as InvoiceStatus)
