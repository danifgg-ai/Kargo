'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import KargoButton from '@/components/ui/KargoButton'
import KargoInput from '@/components/ui/KargoInput'

const schema = z.object({
  email: z.string().email('Email inválido'),
})

type RecuperarForm = z.infer<typeof schema>

export default function RecuperarPage() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecuperarForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: RecuperarForm) => {
    setError('')
    const supabase = createClient()

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      }
    )

    if (resetError) {
      setError('Error al enviar el email. Intentá de nuevo.')
      return
    }

    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-kargo-dark px-6">
      <div className="w-full max-w-md">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-kargo-muted hover:text-kargo-yellow mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a login
        </Link>

        <h1 className="font-display text-4xl font-black text-kargo-yellow mb-2">KARGO</h1>
        <h2 className="font-display text-2xl font-bold text-kargo-text mb-2 uppercase">
          Recuperar contraseña
        </h2>

        {sent ? (
          <div className="mt-6 p-4 bg-kargo-green/10 border border-kargo-green/30 text-kargo-green">
            <p className="font-medium mb-1">Email enviado</p>
            <p className="text-sm opacity-80">
              Revisá tu bandeja de entrada y seguí las instrucciones para restablecer tu contraseña.
            </p>
          </div>
        ) : (
          <>
            <p className="text-kargo-muted mb-8">
              Ingresá tu email y te enviaremos un link para restablecer tu contraseña.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <KargoInput
                label="Email"
                type="email"
                placeholder="tu@email.com"
                error={errors.email?.message}
                {...register('email')}
              />

              {error && (
                <div className="p-3 bg-kargo-red/10 border border-kargo-red/30 text-kargo-red text-sm">
                  {error}
                </div>
              )}

              <KargoButton
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
              >
                Enviar link de recuperación
              </KargoButton>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
