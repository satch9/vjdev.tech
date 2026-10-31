import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { findForbidden, hasPrivateTerms } from '../forbiddenTerms'
import { projects } from '../../src/data/projects'
import { services } from '../../src/data/services'

const read = (file: string) => readFileSync(join('dist', file), 'utf8')

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? listFiles(path) : [path]
  })
}

describe('pré-rendu', () => {
  it('accueil : contenu et head rendus', () => {
    const html = read('index.html')
    expect(html).toContain('<title>Site internet et application sur mesure à La Réunion · VJDev</title>')
    expect(html).toContain('id="realisations"')
    expect(html).not.toContain('<!--app-html-->')
  })
  it('chaque étude de cas a son HTML complet', () => {
    for (const p of projects) {
      const html = read(`projets/${p.slug}/index.html`)
      expect(html).toContain(`<title>${p.seoTitle ?? `${p.name} · Étude de cas`}`)
      expect(html).toContain(p.delivered[0].replace(/&/g, '&amp;'))
    }
  })
  it('404.html : page introuvable, non indexable', () => {
    const html = read('404.html')
    expect(html).toContain('Page introuvable')
    expect(html).toContain('noindex')
  })
  it('sitemap : les 8 URL avec lastmod, pas de 404', () => {
    const xml = read('sitemap.xml')
    expect(xml.match(/<loc>/g)).toHaveLength(8)
    expect(xml.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)).toHaveLength(8)
    expect(xml).toContain('<loc>https://vjdev.tech/projets/club1</loc>')
    expect(xml).toContain('<loc>https://vjdev.tech/services/creation-site-vitrine</loc>')
  })
  it('chaque page de service a son HTML complet', () => {
    for (const s of services) {
      const html = read(`services/${s.slug}/index.html`)
      expect(html).toContain(`<title>${s.seoTitle}</title>`)
      expect(html).toContain(`<link rel="canonical" href="https://vjdev.tech/services/${s.slug}">`)
      expect(html).toContain('"FAQPage"')
      expect(html).toContain(s.faq[0].question.replace(/'/g, '&#x27;'))
    }
  })
  it('robots.txt pointe le sitemap', () => {
    expect(read('robots.txt')).toContain('Sitemap: https://vjdev.tech/sitemap.xml')
  })
})

describe('anonymisation du build', () => {
  const files = listFiles('dist')
  it.skipIf(!hasPrivateTerms)('aucun terme interdit dans les fichiers texte publiés (HTML, JS, CSS…)', () => {
    const hits = files.filter((f) => /\.(html|xml|txt|js|css|svg|json|webmanifest)$/.test(f))
      .flatMap((f) => findForbidden(readFileSync(f, 'utf8')).map((t) => `${f} : ${t}`))
    expect(hits).toEqual([])
  })
  it.skipIf(!hasPrivateTerms)('aucun terme interdit dans les noms de fichiers', () => {
    expect(files.flatMap((f) => findForbidden(f).map((t) => `${f} : ${t}`))).toEqual([])
  })
  it('aucune source map publiée', () => {
    expect(files.filter((f) => f.endsWith('.map'))).toEqual([])
  })
  it('pas de dossier SSR résiduel', () => {
    expect(existsSync('distSsr')).toBe(false)
  })
})
