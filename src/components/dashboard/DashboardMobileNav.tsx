'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const navItems = [
  { href: '/dashboard', label: 'Resumen', exact: true },
  { href: '/dashboard/reservas', label: 'Reservas' },
  { href: '/dashboard/perfil', label: 'Perfil' },
  { href: '/dashboard/notificaciones', label: 'Alertas', badge: 2 },
]

export default function DashboardMobileNav() {
  const pathname = usePathname()

  return (
    <div className="lg:hidden overflow-x-auto border-b border-kargo-border bg-kargo-black">
      <div className="flex min-w-max px-4">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'px-4 py-3 text-xs font-display uppercase tracking-wider whitespace-nowrap border-b-2 transition-all',
                isActive
                  ? 'text-kargo-yellow border-kargo-yellow'
                  : 'text-kargo-muted border-transparent hover:text-kargo-text'
              )}
            >
              {item.label}
              {item.badge && item.badge > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 bg-kargo-red text-white text-[9px] font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
