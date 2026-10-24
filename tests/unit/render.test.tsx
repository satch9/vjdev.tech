import { describe, it, expect } from 'vitest'
import { render, routes } from '../../src/entryServer'
import { projects } from '../../src/data/projects'
import { services } from '../../src/data/services'

describe('accueil', () => {
  const html = render('/')
  it('affiche la promesse et les ancres', () => {
    expect(html).toContain('cadré')
    for (const id of ['realisations', 'methode', 'services', 'a-propos', 'contact']) expect(html).toContain(`id="${id}"`)
  })
  it('liste les 4 projets avec un lien vers leur étude de cas', () => {
    for (const p of projects) {
      expect(html).toContain(p.name)
      expect(html).toContain(`href="/projets/${p.slug}"`)
    }
  })
  it('affiche les coordonnées en clair et en lien', () => {
    expect(html).toContain('0692 18 31 23')
    expect(html).toContain('viny1976@gmail.com')
    expect(html).toContain('href="https://wa.me/262692183123"')
    expect(html).toContain('href="tel:+262692183123"')
  })
  it('présente les produits comme tels', () => {
    expect(html).toContain('Produit conçu et développé')
  })
  it('l\'offre vient avant les réalisations', () => {
    expect(html.indexOf('id="services"')).toBeLessThan(html.indexOf('id="realisations"'))
  })
  it('la navigation principale mène aux services', () => {
    const nav = html.slice(html.indexOf('aria-label="Navigation principale"'), html.indexOf('</nav>'))
    expect(nav).toMatch(/href="\/#services"[^>]*>Services</)
  })
  it('les liens de service sont soulignés en permanence et couvrent la carte', () => {
    for (const s of services) {
      const classes = html.match(new RegExp(`<a class="([^"]*)" href="/services/${s.slug}"`))![1].split(' ')
      expect(classes).toContain('underline')
      expect(classes).toContain('after:inset-0')
    }
  })
  it('chaque carte de service mène à sa page', () => {
    const section = html.slice(html.indexOf('id="services"'), html.indexOf('</section>', html.indexOf('id="services"')))
    for (const s of services) expect(section).toContain(`href="/services/${s.slug}"`)
  })
})

describe('étude de cas', () => {
  it('club1 : contenu livré, sans lien externe', () => {
    const html = render('/projets/club1')
    expect(html).toContain('<h1')
    expect(html).toContain('Comptes adhérents à crédit et débit')
    expect(html).not.toContain('Voir le site')
  })
  it('freightworkshop : lien externe sécurisé', () => {
    const html = render('/projets/freightworkshop')
    expect(html).toContain('href="https://freightworkshop.re"')
    expect(html).toContain('rel="noopener noreferrer"')
  })
  it('renvoie vers le contact de l\'accueil', () => {
    expect(render('/projets/madoc')).toContain('href="/#contact"')
  })
  it('club1 renvoie vers ses deux services', () => {
    const html = render('/projets/club1')
    expect(html).toContain('Service : Sites vitrines →')
    expect(html).toContain('Service : Applications métier sur mesure →')
  })
})

describe('page de service', () => {
  it('site vitrine : H1, fil d\'Ariane, FAQ et études de cas liées', () => {
    const html = render('/services/creation-site-vitrine')
    expect(html).toContain('Création de site vitrine à La Réunion</h1>')
    expect(html).toContain('aria-label="Fil d&#x27;Ariane"')
    expect(html).toContain('<details')
    expect(html).toContain('Combien coûte un site vitrine ?')
    expect(html).toContain('href="/projets/freightworkshop"')
    expect(html).toContain('href="/projets/club1"')
    expect(html).not.toContain('href="/projets/madoc"')
  })
  it('renvoie vers la méthode et vers le contact de la page', () => {
    const html = render('/services/application-metier-sur-mesure')
    expect(html).toContain('href="/#methode"')
    expect(html).toContain('href="#contact"')
    expect(html).toContain('id="contact"')
  })
  it('outils internes : lien externe vers la liste de courses', () => {
    const html = render('/services/outils-internes-automatisation')
    expect(html).toContain('href="https://courses.vjdev.tech"')
    expect(html).toContain('rel="noopener noreferrer"')
  })
  it('slug inconnu', () => {
    expect(render('/services/xyz')).toContain('Page introuvable')
  })
})

describe('page introuvable', () => {
  it('slug inconnu', () => {
    expect(render('/projets/xyz')).toContain('Page introuvable')
  })
  it('chemin inconnu', () => {
    expect(render('/nimporte')).toContain('Page introuvable')
  })
})

describe('routes', () => {
  it('liste l\'accueil, les 4 études de cas et les 3 services', () => {
    expect(routes).toEqual([
      '/',
      ...projects.map((p) => `/projets/${p.slug}`),
      ...services.map((s) => `/services/${s.slug}`)
    ])
  })
})

describe('pied de page', () => {
  it('liste les 3 services sur toutes les pages, 404 comprise', () => {
    for (const path of ['/', '/projets/madoc', '/services/creation-site-vitrine', '/nimporte']) {
      const footer = render(path).split('<footer')[1]
      for (const s of services) expect(footer, `${path} → ${s.slug}`).toContain(`href="/services/${s.slug}"`)
    }
  })
})
