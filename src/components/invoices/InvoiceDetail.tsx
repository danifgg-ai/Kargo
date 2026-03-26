'use client'

import { clsx } from 'clsx'
import { formatGuaranies } from '@/lib/utils/currency'
import { formatDateTime } from '@/lib/utils/dates'
import KargoButton from '@/components/ui/KargoButton'
import type { Invoice } from '@/types/database'

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: 'Borrador', color: 'text-kargo-steel' },
  sent_to_set: { label: 'Enviada a SET', color: 'text-kargo-yellow' },
  approved: { label: 'Aprobada por SET', color: 'text-kargo-green' },
  rejected: { label: 'Rechazada por SET', color: 'text-kargo-red' },
  cancelled: { label: 'Anulada', color: 'text-kargo-red' },
}

interface InvoiceDetailProps {
  invoice: Invoice
  onClose: () => void
}

export default function InvoiceDetail({ invoice, onClose }: InvoiceDetailProps) {
  const sc = statusConfig[invoice.status] || statusConfig.draft

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={onClose}
        className="inline-flex items-center gap-1 text-sm text-kargo-muted hover:text-kargo-yellow transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Volver a facturas
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-black text-kargo-text uppercase">
            {invoice.invoice_number}
          </h2>
          <p className={clsx('text-sm font-display uppercase tracking-wider font-bold mt-1', sc.color)}>
            {sc.label}
          </p>
        </div>
        <div className="flex gap-2">
          {invoice.qr_code && (
            <a href={invoice.qr_code} target="_blank" rel="noopener noreferrer">
              <KargoButton variant="outline" size="sm">
                Verificar en SET
              </KargoButton>
            </a>
          )}
          <KargoButton variant="ghost" size="sm">
            Descargar PDF
          </KargoButton>
        </div>
      </div>

      {/* Invoice card */}
      <div className="bg-kargo-surface border border-kargo-border">
        {/* Emitter / Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-kargo-border">
          <div>
            <p className="text-[10px] font-display uppercase tracking-wider text-kargo-steel mb-2">
              Emisor
            </p>
            <p className="text-sm text-kargo-text font-bold">{invoice.emitter_name}</p>
            <p className="text-xs text-kargo-muted mt-0.5">RUC: {invoice.emitter_ruc}</p>
            <p className="text-xs text-kargo-muted">Av. Aviadores del Chaco 2050, Asunción</p>
          </div>
          <div>
            <p className="text-[10px] font-display uppercase tracking-wider text-kargo-steel mb-2">
              Receptor
            </p>
            <p className="text-sm text-kargo-text font-bold">{invoice.receiver_name}</p>
            <p className="text-xs text-kargo-muted mt-0.5">RUC: {invoice.receiver_ruc}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 border-b border-kargo-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] font-display uppercase tracking-wider text-kargo-steel mb-1">
                Timbrado
              </p>
              <p className="text-sm text-kargo-text">{invoice.timbrado}</p>
            </div>
            <div>
              <p className="text-[10px] font-display uppercase tracking-wider text-kargo-steel mb-1">
                Fecha emisión
              </p>
              <p className="text-sm text-kargo-text">{formatDateTime(invoice.created_at)}</p>
            </div>
            <div>
              <p className="text-[10px] font-display uppercase tracking-wider text-kargo-steel mb-1">
                Condición
              </p>
              <p className="text-sm text-kargo-text">Contado</p>
            </div>
            <div>
              <p className="text-[10px] font-display uppercase tracking-wider text-kargo-steel mb-1">
                Moneda
              </p>
              <p className="text-sm text-kargo-text">PYG (Guaraníes)</p>
            </div>
          </div>
        </div>

        {/* CDC */}
        {invoice.cdc && (
          <div className="p-6 border-b border-kargo-border">
            <p className="text-[10px] font-display uppercase tracking-wider text-kargo-steel mb-1">
              CDC (Código de Control Digital)
            </p>
            <p className="text-xs font-mono text-kargo-muted break-all">{invoice.cdc}</p>
          </div>
        )}

        {/* Amounts */}
        <div className="p-6">
          <div className="space-y-2 max-w-sm ml-auto">
            <div className="flex justify-between text-sm">
              <span className="text-kargo-muted">Subtotal gravado (10%)</span>
              <span className="text-kargo-text">{formatGuaranies(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-kargo-muted">IVA (10%)</span>
              <span className="text-kargo-text">{formatGuaranies(invoice.iva_amount)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-kargo-border">
              <span className="font-display text-sm uppercase tracking-wider font-bold text-kargo-text">
                Total
              </span>
              <span className="font-display text-xl font-bold text-kargo-yellow">
                {formatGuaranies(invoice.total_amount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QR placeholder */}
      {invoice.qr_code && (
        <div className="bg-kargo-surface border border-kargo-border p-6 text-center">
          <div className="w-32 h-32 mx-auto bg-white flex items-center justify-center mb-3">
            <div className="text-center">
              <svg className="w-12 h-12 text-kargo-dark mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
              </svg>
              <p className="text-[8px] text-kargo-dark mt-1">QR SIFEN</p>
            </div>
          </div>
          <p className="text-xs text-kargo-muted">
            Escaneá el código QR para verificar esta factura en el sitio de la SET
          </p>
        </div>
      )}
    </div>
  )
}
