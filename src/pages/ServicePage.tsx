import { Link, useParams } from 'react-router'
import { findService } from '../data/services'
import { findProject } from '../data/projects'
import { otherProjects } from '../data/otherProjects'
import type { Project } from '../data/types'
import { SiteHeader } from '../components/SiteHeader'
import { ProjectCard } from '../components/ProjectCard'
import { Contact } from '../components/Contact'
import { ContentSections } from '../components/RichText'
import { NotFound } from './NotFound'

export function ServicePage() {
  const { slug = '' } = useParams()
  const service = findService(slug)
  if (!service) return <NotFound />

  const related = service.relatedProjects.map((s) => findProject(s)).filter((p): p is Project => p !== undefined)
  const others = otherProjects.filter((p) => service.relatedOtherProjects.includes(p.name))

  return (
    <main>
      <div className="bg-blueprint">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-10 pt-8 sm:px-8">
          <SiteHeader />
          <nav aria-label="Fil d'Ariane" className="font-mono text-sm text-ink">
            <ol className="flex flex-wrap gap-2">
              <li><Link to="/" className="underline-offset-4 hover:underline">Accueil</Link></li>
              <li aria-hidden="true">›</li>
              <li>Services</li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{service.title}</li>
            </ol>
          </nav>
          <div className="flex flex-col gap-4">
            <h1 className="text-balance text-4xl font-bold sm:text-5xl">{service.h1}</h1>
            <p className="max-w-[60ch] text-lg text-slate">{service.intro}</p>
            <a href="#contact" className="w-fit bg-ink px-4 py-3 font-mono text-sm text-white hover:bg-lagonDeep">Me contacter</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Pour qui</h2>
            <ul className="flex flex-col gap-2 text-lg">
              {service.audience.map((item) => <li key={item} className="border-l-4 border-lagon pl-3">{item}</li>)}
            </ul>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">{service.deliverablesTitle}</h2>
            <ul className="flex flex-col gap-2 text-lg">
              {service.deliverables.map((item) => <li key={item} className="border-l-4 border-lagon pl-3">{item}</li>)}
            </ul>
          </section>
        </div>
        {service.sections && <ContentSections sections={service.sections} />}
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Comment ça se passe</h2>
          <p className="max-w-[60ch] text-lg">{service.process}</p>
          <Link to="/#methode" className="w-fit font-mono text-sm text-ink underline-offset-4 hover:underline">Voir la méthode →</Link>
        </section>
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Réalisations liées</h2>
          {related.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          )}
          {others.length > 0 && (
            <ul className="flex flex-col gap-2 text-lg">
              {others.map((project) => (
                <li key={project.url}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-bold text-ink underline-offset-4 hover:underline">{project.name}</a>
                  {' : '}{project.text}
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
          <div className="flex flex-col">
            {service.faq.map((item) => (
              <details key={item.question} className="border-t border-frame py-3">
                <summary className="cursor-pointer text-lg font-bold">{item.question}</summary>
                <p className="mt-2 max-w-[65ch] text-slate">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <Contact />
    </main>
  )
}
