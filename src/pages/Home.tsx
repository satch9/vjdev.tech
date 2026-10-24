import { Hero } from '../components/Hero'
import { ProjectCard } from '../components/ProjectCard'
import { MethodSteps } from '../components/MethodSteps'
import { Services } from '../components/Services'
import { OtherProjects } from '../components/OtherProjects'
import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { projects } from '../data/projects'

export function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <section id="realisations" className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-14 sm:px-8">
        <h2 className="text-3xl font-bold">Réalisations</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>
      <MethodSteps />
      <OtherProjects />
      <About />
      <Contact />
    </main>
  )
}
