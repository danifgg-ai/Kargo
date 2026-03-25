import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-kargo-black border-t border-kargo-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-3xl font-black text-kargo-yellow tracking-tight">
              KARGO
            </span>
            <p className="mt-3 text-sm text-kargo-muted leading-relaxed">
              Alquiler de maquinaria de construcción en Asunción, Paraguay.
              Tecnología y potencia al servicio de tu proyecto.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-kargo-text mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo" className="text-sm text-kargo-muted hover:text-kargo-yellow transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/auth/registro" className="text-sm text-kargo-muted hover:text-kargo-yellow transition-colors">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-kargo-muted hover:text-kargo-yellow transition-colors">
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-kargo-text mb-4">
              Empresa
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-kargo-muted">Sobre nosotros</li>
              <li className="text-sm text-kargo-muted">Términos y condiciones</li>
              <li className="text-sm text-kargo-muted">Política de privacidad</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-kargo-text mb-4">
              Contacto
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-kargo-muted">Asunción, Paraguay</li>
              <li className="text-sm text-kargo-muted">+595 21 000 000</li>
              <li className="text-sm text-kargo-muted">info@kargo.com.py</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-kargo-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-kargo-steel">
            &copy; {new Date().getFullYear()} KARGO S.A. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-kargo-steel">Asunción, Paraguay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
