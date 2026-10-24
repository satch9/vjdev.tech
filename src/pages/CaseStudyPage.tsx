import { Link, useParams } from 'react-router'
import { findProject } from '../data/projects'
import { servicesForProject } from '../data/services'
import { SiteHeader } from '../components/SiteHeader'
import { ZoomableShot } from '../components/ZoomableShot'
import { NotFound } from './NotFound'
import { ContentSections } from '../components/RichText'

export function CaseStudyPage() {
  const { slug = '' } = useParams()
  const project = findProject(slug)
  if (!project) return <NotFound />
  const projectServices = servicesForProject(project.slug)

  return (
    <main>
      <div className="bg-blueprint">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-10 pt-8 sm:px-8">
          <SiteHeader />
          <Link to="/#realisations" className="font-mono text-sm text-ink">← Toutes les réalisations</Link>
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-wide text-lagonDeep">
              {project.sector} · {project.kind === 'client' ? 'Réalisation client' : 'Produit conçu et développé'}
            </p>
            <h1 className="text-balance text-4xl font-bold sm:text-5xl">{project.name}</h1>
            <p className="max-w-[60ch] text-lg text-slate">{project.summary}</p>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-fit bg-ink px-4 py-3 font-mono text-sm text-white hover:bg-lagonDeep">
                Voir le site →
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <section className="flex flex-col gap-2">
            <h2 className="font-mono text-xs uppercase tracking-wide text-pencil">Contexte</h2>
            <p className="text-lg">{project.context}</p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-mono text-xs uppercase tracking-wide text-pencil">Besoin</h2>
            <p className="text-lg">{project.need}</p>
          </section>
        </div>
        <section className="flex flex-col gap-3">
          <h2 className="font-mono text-xs uppercase tracking-wide text-pencil">Ce que j'ai livré</h2>
          <ul className="flex flex-col gap-2 text-lg">
            {project.delivered.map((item) => <li key={item} className="border-l-4 border-lagon pl-3">{item}</li>)}
          </ul>
        </section>
        {project.sections && <ContentSections sections={project.sections} />}
        <div className="grid gap-4 sm:grid-cols-2">
          {project.captures.map((capture, index) => (
            <ZoomableShot key={capture.src} capture={capture} sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw" eager={index === 0} />
          ))}
        </div>
        <ul className="flex flex-wrap gap-2 font-mono text-xs" aria-label="Technologies">
          {project.stack.map((tech) => <li key={tech} className="border border-ink px-2 py-1 text-ink">{tech}</li>)}
        </ul>
        {projectServices.length > 0 && (
          <ul className="flex flex-col gap-1 font-mono text-sm" aria-label="Services liés">
            {projectServices.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="text-ink underline-offset-4 hover:underline">{`Service : ${service.title} →`}</Link>
              </li>
            ))}
          </ul>
        )}
        <Link to="/#contact" className="w-fit bg-ink px-4 py-3 font-mono text-sm text-white hover:bg-lagonDeep">Un projet similaire ? Parlons-en</Link>
      </div>
    </main>
  )
}
