'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user, isLoading, signOut } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-kargo-black/80 backdrop-blur-md border-b border-kargo-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-black text-kargo-yellow tracking-tight">
              KARGO
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/catalogo"
              className="font-display text-sm uppercase tracking-wider text-kargo-muted hover:text-kargo-yellow transition-colors"
            >
              Catálogo
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="font-display text-sm uppercase tracking-wider text-kargo-muted hover:text-kargo-yellow transition-colors"
              >
                Dashboard
              </Link>
            )}
            {user && ['admin', 'super_admin'].includes(user.role) && (
              <Link
                href="/admin"
                className="font-display text-sm uppercase tracking-wider text-kargo-muted hover:text-kargo-yellow transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="w-20 h-8 skeleton rounded" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-kargo-muted hidden sm:block">
                  {user.fullName}
                </span>
                <button
                  onClick={signOut}
                  className="font-display text-sm uppercase tracking-wider text-kargo-muted hover:text-kargo-red transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="font-display text-sm uppercase tracking-wider text-kargo-muted hover:text-kargo-yellow transition-colors"
                >
                  Ingresar
                </Link>
                <Link
                  href="/auth/registro"
                  className="px-4 py-2 bg-kargo-yellow text-kargo-black font-display text-sm uppercase font-bold tracking-wider hover:shadow-kargo-sm transition-all"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
