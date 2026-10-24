import { Link } from 'react-router'
import { services } from '../data/services'
import { RichText } from './RichText'

const servicesNote = 'Votre caisse, vos réservations ou vos commandes tiennent sur trois fichiers ? Je développe des [applications métier sur mesure](/services/application-metier-sur-mesure) qui les réunissent. Et pour une seule tâche répétitive, un [outil interne qui l\'automatise](/services/outils-internes-automatisation) suffit souvent.'

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
      <p className="max-w-[65ch] text-lg text-slate"><RichText text={servicesNote} /></p>
    </section>
  )
}
