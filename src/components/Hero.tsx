import { Link } from 'react-router'
import { SiteHeader } from './SiteHeader'

export function Hero() {
  return (
    <section className="bg-blueprint">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-14 pt-8 sm:px-8">
        <SiteHeader />
        <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            <h1 className="text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Votre besoin, <span className="border-b-4 border-lagon text-ink">cadré</span> puis mis en ligne.
            </h1>
            <p className="max-w-[46ch] text-lg text-slate">
              Sites vitrines, applications métier et outils internes pour les entreprises et associations de l'île.
              Je pars de votre besoin, même flou, et je livre un outil qui tourne.
            </p>
            <div className="flex flex-wrap gap-3 font-mono text-sm">
              <Link to="/#realisations" className="bg-ink px-4 py-3 text-white hover:bg-lagonDeep">→ Voir mes réalisations</Link>
              <Link to="/#contact" className="border border-ink bg-paper px-4 py-3 text-ink hover:border-lagonDeep hover:text-lagonDeep">Me contacter</Link>
            </div>
          </div>
          <aside aria-label="Exemple de note de cadrage" className="border border-dashed border-ink bg-paper p-4 font-mono text-[13px] leading-relaxed text-ink">
            <p className="font-medium">NOTE DE CADRAGE · exemple</p>
            <p>Client : boulangerie, Saint-Benoît</p>
            <p>Besoin : commandes en ligne la veille</p>
            <p>Priorité : <span className="text-pencil">retrait avant 7 h</span></p>
            <p>Hors périmètre : livraison</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
