import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-kargo-dark kargo-noise">
      <div className="relative z-10 text-center px-6">
        <h1 className="font-display text-6xl md:text-8xl font-black text-kargo-yellow tracking-tight mb-4">
          KARGO
        </h1>
        <p className="font-display text-2xl md:text-4xl font-bold text-kargo-text mb-2 uppercase">
          Tu flota. Cuando la necesitás.
        </p>
        <p className="text-kargo-muted text-lg mb-10 max-w-md mx-auto">
          Alquilá maquinaria de construcción en Asunción con un clic.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/catalogo"
            className="px-8 py-4 border-2 border-kargo-yellow text-kargo-yellow font-display text-lg uppercase font-bold tracking-wider hover:bg-kargo-yellow hover:text-kargo-black transition-all duration-300"
          >
            Ver Catálogo
          </Link>
          <Link
            href="/auth/registro"
            className="px-8 py-4 bg-kargo-yellow text-kargo-black font-display text-lg uppercase font-bold tracking-wider hover:shadow-kargo transition-all duration-300"
          >
            Comenzar ahora
          </Link>
        </div>
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-kargo-surface border border-kargo-border rounded-full">
          <span className="w-2 h-2 rounded-full bg-kargo-green animate-pulse-green" />
          <span className="text-sm text-kargo-muted">Disponibilidad en tiempo real</span>
        </div>
      </div>
    </main>
  )
}
