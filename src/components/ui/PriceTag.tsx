import { formatGuaranies } from '@/lib/utils/currency'

interface PriceTagProps {
  amount: number
  period?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function PriceTag({ amount, period = '/día', size = 'md' }: PriceTagProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl md:text-4xl',
  }

  return (
    <div className="flex items-baseline gap-1">
      <span className={`font-display font-bold text-kargo-yellow ${sizeClasses[size]}`}>
        {formatGuaranies(amount)}
      </span>
      {period && (
        <span className="text-sm text-kargo-muted">{period}</span>
      )}
    </div>
  )
}
