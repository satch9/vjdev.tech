import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { projects, findProject } from '../../src/data/projects'
import { methodSteps } from '../../src/data/method'
import { contact, telHref, mailHref, whatsappHref } from '../../src/data/contact'
import { otherProjects } from '../../src/data/otherProjects'
import { services, findService, servicesForProject } from '../../src/data/services'
import type { Capture } from '../../src/data/types'

const captureExists = (c: Capture) =>
  existsSync(`public/${c.src}-640.webp`) && existsSync(`public/${c.src}-1280.webp`)

describe('projets', () => {
  it('expose les 4 études de cas dans l\'ordre', () => {
    expect(projects.map((p) => p.slug)).toEqual(['freightworkshop', 'club1', 'madoc', 'plateforme-reunion'])
  })
  it('a tous les champs remplis', () => {
    for (const p of projects) {
      for (const field of [p.name, p.sector, p.summary, p.context, p.need]) expect(field.trim()).not.toBe('')
      expect(p.delivered.length).toBeGreaterThan(0)
      expect(p.stack.length).toBeGreaterThan(0)
      expect(p.captures.length).toBeGreaterThanOrEqual(2)
      expect(p.captures.length).toBeLessThanOrEqual(5)
    }
  })
  it('distingue réalisations client et produits', () => {
    expect(projects.filter((p) => p.kind === 'client').map((p) => p.slug)).toEqual(['freightworkshop', 'club1'])
  })
  it('club1 n\'a aucun lien public', () => {
    expect(findProject('club1')?.url).toBeUndefined()
  })
  it('chaque capture existe en 640 et 1280, la première aussi en og.jpg', () => {
    for (const p of projects) {
      for (const c of p.captures) expect(captureExists(c), c.src).toBe(true)
      expect(existsSync(`public/${p.captures[0].src}-og.jpg`), p.slug).toBe(true)
    }
  })
  it('chaque capture a un texte alternatif', () => {
    for (const c of [...projects.flatMap((p) => p.captures), ...methodSteps.flatMap((s) => s.captures)]) {
      expect(c.alt.length).toBeGreaterThan(10)
    }
  })
  it('findProject renvoie undefined pour un slug inconnu', () => {
    expect(findProject('xyz')).toBeUndefined()
  })
})

describe('méthode', () => {
  it('4 étapes, captures existantes', () => {
    expect(methodSteps).toHaveLength(4)
    for (const c of methodSteps.flatMap((s) => s.captures)) expect(captureExists(c), c.src).toBe(true)
  })
})

describe('contact', () => {
  it('construit des liens valides', () => {
    expect(contact.name).toBe('Vincent')
    expect(telHref).toBe('tel:+262692183123')
    expect(mailHref).toBe('mailto:viny1976@gmail.com')
    expect(whatsappHref).toBe('https://wa.me/262692183123')
  })
})

describe('autres projets', () => {
  it('liste gestion-courses et le poker en https', () => {
    expect(otherProjects.map((p) => p.url)).toEqual(['https://courses.vjdev.tech', 'https://home-poker.vjdev.tech'])
  })
})

describe('services', () => {
  it('expose les 3 services dans l\'ordre', () => {
    expect(services.map((s) => s.slug)).toEqual(['creation-site-vitrine', 'application-metier-sur-mesure', 'outils-internes-automatisation'])
  })
  it('a tous les champs remplis', () => {
    for (const s of services) {
      for (const field of [s.slug, s.title, s.text, s.seoTitle, s.metaDescription, s.h1, s.intro, s.deliverablesTitle, s.process]) expect(field.trim()).not.toBe('')
      expect(s.audience.length).toBeGreaterThan(0)
      expect(s.deliverables.length).toBeGreaterThan(0)
      expect(s.relatedProjects.length + s.relatedOtherProjects.length, s.slug).toBeGreaterThan(0)
    }
  })
  it('titles et descriptions aux bonnes longueurs', () => {
    for (const s of services) {
      expect(s.seoTitle.length, s.seoTitle).toBeLessThanOrEqual(65)
      expect(s.metaDescription.length, s.metaDescription).toBeLessThanOrEqual(160)
    }
  })
  it('FAQ de 4 à 6 questions', () => {
    for (const s of services) {
      expect(s.faq.length).toBeGreaterThanOrEqual(4)
      expect(s.faq.length).toBeLessThanOrEqual(6)
    }
  })
  it('les réalisations liées existent', () => {
    for (const s of services) {
      for (const slug of s.relatedProjects) expect(findProject(slug), slug).toBeDefined()
      for (const name of s.relatedOtherProjects) expect(otherProjects.some((p) => p.name === name), name).toBe(true)
    }
  })
  it('findService renvoie undefined pour un slug inconnu', () => {
    expect(findService('creation-site-vitrine')?.title).toBe('Sites vitrines')
    expect(findService('xyz')).toBeUndefined()
  })
  it('servicesForProject : club1 relève de deux services', () => {
    expect(servicesForProject('club1').map((s) => s.slug)).toEqual(['creation-site-vitrine', 'application-metier-sur-mesure'])
    expect(servicesForProject('madoc').map((s) => s.slug)).toEqual(['application-metier-sur-mesure'])
  })
})
