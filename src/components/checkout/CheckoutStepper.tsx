'use client'

import { clsx } from 'clsx'

interface Step {
  number: number
  label: string
}

const steps: Step[] = [
  { number: 1, label: 'Confirmar reserva' },
  { number: 2, label: 'Datos de facturación' },
  { number: 3, label: 'Pago' },
]

interface CheckoutStepperProps {
  currentStep: number
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                'w-8 h-8 flex items-center justify-center font-display font-bold text-sm transition-all',
                currentStep === step.number &&
                  'bg-kargo-yellow text-kargo-black',
                currentStep > step.number &&
                  'bg-kargo-green text-white',
                currentStep < step.number &&
                  'bg-kargo-surface border border-kargo-border text-kargo-steel'
              )}
            >
              {currentStep > step.number ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={clsx(
                'hidden sm:block text-xs font-display uppercase tracking-wider',
                currentStep >= step.number ? 'text-kargo-text' : 'text-kargo-steel'
              )}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={clsx(
                'w-8 sm:w-16 h-px',
                currentStep > step.number ? 'bg-kargo-green' : 'bg-kargo-border'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
