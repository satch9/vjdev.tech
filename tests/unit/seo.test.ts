import { describe, it, expect } from 'vitest'
import { getSeo, renderHead } from '../../src/seo'
import { services } from '../../src/data/services'

const homeTitle = 'Site internet et application sur mesure à La Réunion · VJDev'

describe('getSeo', () => {
  it('accueil', () => {
    const seo = getSeo('/')
    expect(seo.title).toBe(homeTitle)
    expect(seo.image).toBe('https://vjdev.tech/captures/freightworkshop-1-og.jpg')
    expect(seo.indexable).toBe(true)
    expect(seo.jsonLd).toContain('"LocalBusiness"')
    expect(seo.jsonLd).toContain('+262692183123')
  })
  it('accueil : LocalBusiness complété', () => {
    const data = JSON.parse(getSeo('/').jsonLd!)
    expect(data['@id']).toBe('https://vjdev.tech/#entreprise')
    expect(data.geo).toEqual({ '@type': 'GeoCoordinates', latitude: -20.9633, longitude: 55.6503 })
    expect(data.areaServed).toEqual({ '@type': 'AdministrativeArea', name: 'La Réunion' })
    expect(data.hasOfferCatalog.itemListElement.map((o: { itemOffered: { url: string } }) => o.itemOffered.url)).toEqual([
      'https://vjdev.tech/services/creation-site-vitrine',
      'https://vjdev.tech/services/application-metier-sur-mesure',
      'https://vjdev.tech/services/outils-internes-automatisation'
    ])
  })
  it('accueil : LocalBusiness relié à la fiche Google et à LinkedIn', () => {
    expect(JSON.parse(getSeo('/').jsonLd!).sameAs).toEqual([
      'https://www.google.com/search?kgmid=/g/11zybfg47g',
      'https://www.linkedin.com/in/vincent-jue-0b076b14'
    ])
  })
  it('étude de cas : fil d\'Ariane', () => {
    const seo = getSeo('/projets/club1')
    expect(seo.title).toBe('club1 · Étude de cas · VJDev')
    expect(seo.image).toBe('https://vjdev.tech/captures/club1-1-og.jpg')
    const data = JSON.parse(seo.jsonLd!)
    expect(data['@type']).toBe('BreadcrumbList')
    expect(data.itemListElement.map((i: { name: string }) => i.name)).toEqual(['Accueil', 'Réalisations', 'club1'])
    expect(data.itemListElement[2].item).toBe('https://vjdev.tech/projets/club1')
  })
  it('étude de cas : title et description personnalisés', () => {
    const seo = getSeo('/projets/freightworkshop')
    expect(seo.title).toBe('freightworkshop.re, site de transport à La Réunion · Étude de cas')
    expect(seo.description).toContain('Freight Workshop')
  })
  it('page de service', () => {
    const seo = getSeo('/services/creation-site-vitrine')
    expect(seo.title).toBe('Création de site vitrine à La Réunion · VJDev')
    expect(seo.path).toBe('/services/creation-site-vitrine')
    expect(seo.indexable).toBe(true)
    expect(seo.image).toBe('https://vjdev.tech/captures/freightworkshop-1-og.jpg')
    const graph = JSON.parse(seo.jsonLd!)['@graph']
    expect(graph.map((node: { '@type': string }) => node['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage'])
    expect(graph[0].provider).toEqual({ '@id': 'https://vjdev.tech/#entreprise' })
    expect(graph[2].mainEntity).toHaveLength(6)
  })
  it('service : image de la première étude de cas liée', () => {
    expect(getSeo('/services/outils-internes-automatisation').image).toBe('https://vjdev.tech/captures/plateforme-reunion-1-og.jpg')
    expect(getSeo('/services/application-metier-sur-mesure').image).toBe('https://vjdev.tech/captures/club1-1-og.jpg')
  })
  it('service sans étude de cas : image de l\'accueil', () => {
    // Plus aucun service réel sans projet lié : on en ajoute un le temps du test
    services.push({ ...services[0], slug: 'service-sans-projet', relatedProjects: [] })
    try {
      expect(getSeo('/services/service-sans-projet').image).toBe('https://vjdev.tech/captures/freightworkshop-1-og.jpg')
    } finally {
      services.pop()
    }
  })
  it('accepte une barre oblique finale', () => {
    expect(getSeo('/projets/club1/').title).toBe(getSeo('/projets/club1').title)
    expect(getSeo('/services/creation-site-vitrine/').path).toBe('/services/creation-site-vitrine')
  })
  it('chemin inconnu : non indexable', () => {
    const seo = getSeo('/projets/xyz')
    expect(seo.title).toBe('Page introuvable · VJDev')
    expect(seo.indexable).toBe(false)
  })
  it('service inconnu : non indexable', () => {
    expect(getSeo('/services/xyz').indexable).toBe(false)
  })
})

describe('renderHead', () => {
  it('produit titre, description, canonique, OG et JSON-LD', () => {
    const head = renderHead(getSeo('/'))
    expect(head).toContain(`<title>${homeTitle}</title>`)
    expect(head).toContain('<link rel="canonical" href="https://vjdev.tech/">')
    expect(head).toContain('<meta property="og:image" content="https://vjdev.tech/captures/freightworkshop-1-og.jpg">')
    expect(head).toContain('<meta property="og:image:width" content="1200">')
    expect(head).toContain('<meta property="og:image:height" content="630">')
    expect(head).toContain('<script type="application/ld+json">')
  })
  it('échappe les guillemets et chevrons', () => {
    const head = renderHead({ title: 'A "B" <C>', description: 'd', path: '/', image: 'i', indexable: true, jsonLd: null })
    expect(head).toContain('<title>A &quot;B&quot; &lt;C&gt;</title>')
  })
  it('noindex pour la page introuvable', () => {
    expect(renderHead(getSeo('/xyz'))).toContain('<meta name="robots" content="noindex">')
  })
})
