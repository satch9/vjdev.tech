import { Link } from 'react-router'
import { contact } from '../data/contact'
import { services } from '../data/services'

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-10 font-mono text-xs text-slate sm:px-8">
      <nav aria-label="Services">
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link to={`/services/${service.slug}`} className="text-ink underline-offset-4 hover:underline">{service.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>{contact.name} · {contact.role} · {contact.city}, {contact.region}</p>
    </footer>
  )
}
