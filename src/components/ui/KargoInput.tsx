'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface KargoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const KargoInput = forwardRef<HTMLInputElement, KargoInputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-kargo-muted mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-3 bg-kargo-surface border border-kargo-border rounded-none text-kargo-text placeholder:text-kargo-steel focus:border-kargo-yellow focus:ring-1 focus:ring-kargo-yellow focus:outline-none transition-colors',
            error && 'border-kargo-red focus:border-kargo-red focus:ring-kargo-red',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-kargo-red">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-kargo-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

KargoInput.displayName = 'KargoInput'

export default KargoInput
