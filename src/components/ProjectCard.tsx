import { Link } from 'react-router'
import type { Project } from '../data/types'
import { Shot } from './Shot'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col gap-4 border border-frame bg-white p-4 transition-colors hover:border-lagon">
      <Shot capture={project.captures[0]} sizes="(min-width: 768px) 480px, 100vw" />
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs uppercase tracking-wide text-lagonDeep">
          {project.sector} · {project.kind === 'client' ? 'Réalisation client' : 'Produit conçu et développé'}
        </p>
        <h3 className="text-xl font-bold">{project.name}</h3>
        <p className="text-slate">{project.summary}</p>
        <p className="font-mono text-xs text-ink">{project.stack.join(' · ')}</p>
        <Link to={`/projets/${project.slug}`} className="mt-1 font-mono text-sm text-ink underline-offset-4 hover:underline">
          Voir l'étude de cas →
        </Link>
      </div>
    </article>
  )
}
