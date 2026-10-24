import { Link } from 'react-router'
import { services } from '../data/services'

export function Services() {
  return (
    <section id="services" className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-14 sm:px-8">
      <h2 className="text-3xl font-bold">Ce que je fais</h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="relative flex flex-col gap-2 border-t-2 border-ink pt-4">
            <h3 className="text-lg font-bold">
              <Link to={`/services/${service.slug}`} className="underline decoration-lagon decoration-2 underline-offset-4 after:absolute after:inset-0 hover:text-lagonDeep">{service.title} →</Link>
            </h3>
            <p className="text-slate">{service.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
