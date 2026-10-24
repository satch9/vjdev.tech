import { otherProjects } from '../data/otherProjects'

export function OtherProjects() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-8">
      <p className="font-mono text-sm text-slate">
        Autres projets :{' '}
        {otherProjects.map((project, index) => (
          <span key={project.url}>
            {index > 0 && ' · '}
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">{project.name}</a>
            {' '}({project.text})
          </span>
        ))}
      </p>
    </section>
  )
}
