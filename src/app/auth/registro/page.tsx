'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import KargoButton from '@/components/ui/KargoButton'
import KargoInput from '@/components/ui/KargoInput'

const registroSchema = z.object({
  fullName: z.string().min(2, 'Nombre requerido'),
  company: z.string().optional(),
  ruc: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{6,8}-\d{1}$/.test(val),
      'Formato RUC inválido (ej: 12345678-9)'
    ),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{7,10}$/.test(val.replace(/\D/g, '')),
      'Teléfono inválido'
    ),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Debés aceptar los términos y condiciones' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

type RegistroForm = z.infer<typeof registroSchema>

export default function RegistroPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroForm>({
    resolver: zodResolver(registroSchema),
  })

  const onSubmit = async (data: RegistroForm) => {
    setError('')
    const supabase = createClient()

    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          company: data.company || null,
          ruc: data.ruc || null,
          phone: data.phone ? `+595${data.phone.replace(/\D/g, '')}` : null,
        },
      },
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Este email ya está registrado. Intentá iniciar sesión.')
      } else {
        setError(signUpError.message)
      }
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true)
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-kargo-black items-center justify-center relative kargo-noise">
        <div className="relative z-10 text-center px-12">
          <h1 className="font-display text-7xl font-black text-kargo-yellow tracking-tight mb-4">
            KARGO
          </h1>
          <p className="font-display text-2xl uppercase text-kargo-muted font-bold">
            Tu flota.<br />Cuando la necesitás.
          </p>
          <div className="mt-8 w-24 h-1 bg-kargo-yellow mx-auto" />
          <div className="mt-8 space-y-3 text-left max-w-xs mx-auto">
            {[
              'Monitoreo GPS en tiempo real',
              'Factura electrónica SIFEN',
              'Entrega en Asunción',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-kargo-yellow flex-shrink-0" />
                <span className="text-sm text-kargo-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-kargo-dark">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="font-display text-4xl font-black text-kargo-yellow">KARGO</h1>
          </div>

          <h2 className="font-display text-3xl font-bold text-kargo-text mb-2 uppercase">
            Crear cuenta
          </h2>
          <p className="text-kargo-muted mb-8">
            Registrate para alquilar maquinaria en minutos
          </p>

          {/* Google OAuth */}
          <KargoButton
            variant="outline"
            fullWidth
            size="lg"
            onClick={handleGoogleSignup}
            isLoading={isGoogleLoading}
            className="mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Registrarse con Google
          </KargoButton>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-kargo-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-kargo-dark text-kargo-muted">
                o completá el formulario
              </span>
            </div>
          </div>

          {/* Registration form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <KargoInput
              label="Nombre completo"
              placeholder="Juan Pérez"
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <KargoInput
              label="Empresa (opcional)"
              placeholder="Constructora ABC S.A."
              error={errors.company?.message}
              {...register('company')}
            />

            <div className="grid grid-cols-2 gap-4">
              <KargoInput
                label="RUC (opcional)"
                placeholder="12345678-9"
                error={errors.ruc?.message}
                {...register('ruc')}
              />
              <div>
                <label className="block text-sm font-medium text-kargo-muted mb-1.5">
                  Teléfono (opcional)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-kargo-surface border border-r-0 border-kargo-border text-kargo-muted text-sm">
                    +595
                  </span>
                  <input
                    type="tel"
                    placeholder="981 123 456"
                    className="flex-1 px-4 py-3 bg-kargo-surface border border-kargo-border text-kargo-text placeholder:text-kargo-steel focus:border-kargo-yellow focus:ring-1 focus:ring-kargo-yellow focus:outline-none transition-colors"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-kargo-red">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <KargoInput
              label="Email"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="grid grid-cols-2 gap-4">
              <KargoInput
                label="Contraseña"
                type="password"
                placeholder="Min. 6 caracteres"
                error={errors.password?.message}
                {...register('password')}
              />
              <KargoInput
                label="Confirmar"
                type="password"
                placeholder="Repetir contraseña"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </div>

            {error && (
              <div className="p-3 bg-kargo-red/10 border border-kargo-red/30 text-kargo-red text-sm">
                {error}
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 bg-kargo-surface border-kargo-border accent-kargo-yellow"
                {...register('terms')}
              />
              <span className="text-sm text-kargo-muted">
                Acepto los{' '}
                <span className="text-kargo-yellow">términos y condiciones</span>
                {' '}y la{' '}
                <span className="text-kargo-yellow">política de privacidad</span>
              </span>
            </label>
            {errors.terms && (
              <p className="text-sm text-kargo-red">{errors.terms.message}</p>
            )}

            <KargoButton
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isSubmitting}
            >
              Crear cuenta
            </KargoButton>
          </form>

          <p className="mt-6 text-center text-sm text-kargo-muted">
            ¿Ya tenés cuenta?{' '}
            <Link href="/auth/login" className="text-kargo-yellow hover:underline font-medium">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
