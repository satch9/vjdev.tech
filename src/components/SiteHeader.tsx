import { Link } from 'react-router'
import { contact, telHref } from '../data/contact'

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-ink">
      <Link to="/" className="font-medium">{contact.name} · {contact.role}</Link>
      <nav aria-label="Navigation principale" className="flex flex-wrap gap-4">
        <Link to="/#services" className="hover:text-lagonDeep">Services</Link>
        <Link to="/#realisations" className="hover:text-lagonDeep">Réalisations</Link>
        <Link to="/#methode" className="hover:text-lagonDeep">Méthode</Link>
        <Link to="/#contact" className="hover:text-lagonDeep">Contact</Link>
      </nav>
      <a href={telHref} data-umami-event="contact" data-umami-event-canal="Téléphone (en-tête)" className="w-full sm:w-auto">{contact.city}, {contact.region} · {contact.phoneDisplay}</a>
    </header>
  )
}
