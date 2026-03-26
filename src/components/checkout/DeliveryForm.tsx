'use client'

import { useRentalStore } from '@/stores/useRentalStore'
import KargoInput from '@/components/ui/KargoInput'

export default function DeliveryForm() {
  const { draft, setDraft } = useRentalStore()

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg uppercase tracking-wider text-kargo-text font-bold">
        Método de entrega
      </h2>

      {/* Delivery type toggle */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setDraft({ deliveryType: 'pickup', deliveryAddress: '' })}
          className={`p-4 border text-left transition-all ${
            draft.deliveryType === 'pickup'
              ? 'border-kargo-yellow bg-kargo-yellow/5'
              : 'border-kargo-border bg-kargo-surface hover:border-kargo-steel'
          }`}
        >
          <div className="flex items-center gap-3">
            <svg className={`w-6 h-6 ${draft.deliveryType === 'pickup' ? 'text-kargo-yellow' : 'text-kargo-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
            <div>
              <p className={`font-display text-sm uppercase font-bold ${draft.deliveryType === 'pickup' ? 'text-kargo-yellow' : 'text-kargo-text'}`}>
                Retiro en depósito
              </p>
              <p className="text-xs text-kargo-muted mt-0.5">Sin costo adicional</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setDraft({ deliveryType: 'delivery' })}
          className={`p-4 border text-left transition-all ${
            draft.deliveryType === 'delivery'
              ? 'border-kargo-yellow bg-kargo-yellow/5'
              : 'border-kargo-border bg-kargo-surface hover:border-kargo-steel'
          }`}
        >
          <div className="flex items-center gap-3">
            <svg className={`w-6 h-6 ${draft.deliveryType === 'delivery' ? 'text-kargo-yellow' : 'text-kargo-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h4.875c.621 0 1.125-.504 1.125-1.125V4.125c0-.621-.504-1.125-1.125-1.125H3.375C2.754 3 2.25 3.504 2.25 4.125v9c0 .621.504 1.125 1.125 1.125zm13.125 0h1.5c.621 0 1.125-.504 1.125-1.125V8.625a3.375 3.375 0 00-3.375-3.375h-.75m3 0h-3.375m0 0h-.375m0 0V3m0 5.25h5.625" />
            </svg>
            <div>
              <p className={`font-display text-sm uppercase font-bold ${draft.deliveryType === 'delivery' ? 'text-kargo-yellow' : 'text-kargo-text'}`}>
                Entrega a domicilio
              </p>
              <p className="text-xs text-kargo-muted mt-0.5">Consultá disponibilidad</p>
            </div>
          </div>
        </button>
      </div>

      {/* Delivery address */}
      {draft.deliveryType === 'delivery' && (
        <div className="space-y-4">
          <KargoInput
            label="Dirección de entrega"
            placeholder="Av. Mariscal López 1234, Asunción"
            value={draft.deliveryAddress}
            onChange={(e) => setDraft({ deliveryAddress: e.target.value })}
          />
          <KargoInput
            label="Notas de entrega (opcional)"
            placeholder="Ej: Portón azul, preguntar por Juan"
            value={draft.deliveryNotes}
            onChange={(e) => setDraft({ deliveryNotes: e.target.value })}
          />
        </div>
      )}

      {/* Pickup info */}
      {draft.deliveryType === 'pickup' && (
        <div className="bg-kargo-black border border-kargo-border p-4">
          <h3 className="font-display text-xs uppercase tracking-wider text-kargo-muted mb-2">
            Dirección del depósito
          </h3>
          <p className="text-sm text-kargo-text">
            Av. Aviadores del Chaco 2050
          </p>
          <p className="text-sm text-kargo-text">Asunción, Paraguay</p>
          <p className="text-xs text-kargo-muted mt-2">
            Lunes a Viernes: 07:00 — 17:00 hs
          </p>
          <p className="text-xs text-kargo-muted">
            Sábados: 07:00 — 12:00 hs
          </p>
        </div>
      )}
    </div>
  )
}
