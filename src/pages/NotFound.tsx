import { Link } from 'react-router'
import { SiteHeader } from '../components/SiteHeader'

export function NotFound() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-8">
      <SiteHeader />
      <h1 className="text-4xl font-bold">Page introuvable</h1>
      <p className="text-slate">Cette adresse ne correspond à aucune page.</p>
      <Link to="/" className="font-mono text-sm text-ink underline">← Retour à l'accueil</Link>
    </main>
  )
}
