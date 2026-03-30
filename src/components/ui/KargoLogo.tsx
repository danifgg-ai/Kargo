'use client'

interface KargoLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

export default function KargoLogo({ size = 'md', showIcon = true }: KargoLogoProps) {
  const textSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  }[size]

  const iconSize = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-9 h-9',
  }[size]

  return (
    <span className="flex items-center gap-1.5">
      {showIcon && (
        <svg
          className={`${iconSize} text-kargo-yellow`}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized excavator arm / crane — simple, bold, geometric */}
          <rect x="2" y="24" width="28" height="6" rx="1" fill="currentColor" />
          <rect x="4" y="20" width="8" height="4" fill="currentColor" />
          <rect x="6" y="4" width="4" height="16" fill="currentColor" />
          <rect x="10" y="4" width="14" height="4" rx="0" fill="currentColor" />
          <rect x="20" y="8" width="4" height="12" fill="currentColor" />
          <rect x="16" y="16" width="12" height="4" fill="currentColor" />
        </svg>
      )}
      <span className={`font-display ${textSize} font-black text-kargo-yellow tracking-tight`}>
        KARGO
      </span>
    </span>
  )
}
