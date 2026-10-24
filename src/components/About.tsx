import { aboutParagraphs } from '../data/about'
import { RichText } from './RichText'

export function About() {
  return (
    <section id="a-propos" className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-14 sm:px-8">
      <h2 className="text-3xl font-bold">À propos</h2>
      <div className="flex max-w-[65ch] flex-col gap-3 text-lg text-slate">
        {aboutParagraphs.map((paragraph) => <p key={paragraph}><RichText text={paragraph} /></p>)}
      </div>
    </section>
  )
}
