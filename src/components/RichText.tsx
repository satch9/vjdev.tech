import { Fragment } from 'react'
import { Link } from 'react-router'
import type { ContentSection } from '../data/types'

const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g
const linkClass = 'font-bold text-ink underline decoration-lagon decoration-2 underline-offset-4 hover:text-lagonDeep'

// Transforme « texte [lien](/chemin) texte » en texte et liens ; les chemins internes passent par le routeur
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(linkPattern)) {
    const [whole, label, href] = match
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    parts.push(
      href.startsWith('/')
        ? <Link key={index} to={href} className={linkClass}>{label}</Link>
        : <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{label}</a>
    )
    last = index + whole.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)}</>
}

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((section) => {
        const List = section.ordered ? 'ol' : 'ul'
        return (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="max-w-[65ch] text-lg"><RichText text={paragraph} /></p>
            ))}
            {section.items && (
              <List className={`flex max-w-[65ch] flex-col gap-2 text-lg ${section.ordered ? 'list-decimal pl-6' : ''}`}>
                {section.items.map((item) => (
                  <li key={item} className={section.ordered ? 'pl-1' : 'border-l-4 border-lagon pl-3'}><RichText text={item} /></li>
                ))}
              </List>
            )}
          </section>
        )
      })}
    </>
  )
}
