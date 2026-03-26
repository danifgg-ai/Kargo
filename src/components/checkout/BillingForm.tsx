'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import KargoInput from '@/components/ui/KargoInput'
import KargoButton from '@/components/ui/KargoButton'
import { formatRUC, validateRUC } from '@/lib/utils/ruc'

const billingSchema = z.object({
  billingName: z.string().min(3, 'Nombre o razón social requerido'),
  billingRuc: z
    .string()
    .min(1, 'RUC requerido')
    .refine((val) => validateRUC(val), 'Formato de RUC inválido (ej: 12345678-9)'),
  billingAddress: z.string().min(5, 'Dirección de facturación requerida'),
  billingEmail: z.string().email('Email inválido'),
  billingPhone: z.string().min(6, 'Teléfono requerido'),
})

export type BillingData = z.infer<typeof billingSchema>

interface BillingFormProps {
  onSubmit: (data: BillingData) => void
  isLoading?: boolean
  defaultValues?: Partial<BillingData>
}

export default function BillingForm({ onSubmit, isLoading, defaultValues }: BillingFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BillingData>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      billingName: defaultValues?.billingName || '',
      billingRuc: defaultValues?.billingRuc || '',
      billingAddress: defaultValues?.billingAddress || '',
      billingEmail: defaultValues?.billingEmail || '',
      billingPhone: defaultValues?.billingPhone || '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="font-display text-lg uppercase tracking-wider text-kargo-text font-bold">
        Datos de facturación
      </h2>

      <p className="text-sm text-kargo-muted">
        Estos datos se usarán para generar tu factura electrónica (SIFEN).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <KargoInput
            label="Nombre o Razón Social"
            placeholder="Constructora XYZ S.A."
            error={errors.billingName?.message}
            {...register('billingName')}
          />
        </div>

        <KargoInput
          label="RUC"
          placeholder="12345678-9"
          error={errors.billingRuc?.message}
          {...register('billingRuc', {
            onChange: (e) => {
              const formatted = formatRUC(e.target.value)
              setValue('billingRuc', formatted)
            },
          })}
        />

        <KargoInput
          label="Teléfono"
          placeholder="+595 21 123 4567"
          error={errors.billingPhone?.message}
          {...register('billingPhone')}
        />

        <div className="md:col-span-2">
          <KargoInput
            label="Dirección de facturación"
            placeholder="Av. Mariscal López 1234, Asunción"
            error={errors.billingAddress?.message}
            {...register('billingAddress')}
          />
        </div>

        <div className="md:col-span-2">
          <KargoInput
            label="Email para factura"
            type="email"
            placeholder="facturacion@empresa.com.py"
            error={errors.billingEmail?.message}
            {...register('billingEmail')}
          />
        </div>
      </div>

      <KargoButton type="submit" fullWidth isLoading={isLoading}>
        Continuar al pago
      </KargoButton>
    </form>
  )
}
