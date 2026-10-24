import { findProject } from './data/projects'
import { findService, services } from './data/services'
import { contact } from './data/contact'
import type { Project, Service } from './data/types'

export const siteUrl = 'https://vjdev.tech'

export type Seo = {
  title: string
  description: string
  path: string
  image: string
  indexable: boolean
  jsonLd: string | null
}

const homeTitle = 'Site internet et application sur mesure à La Réunion · Vincent'
const homeDescription = 'Création de sites vitrines, d\'applications métier et d\'outils internes pour les entreprises et associations de La Réunion. Développeur basé à Saint-André.'
const homeImage = `${siteUrl}/captures/freightworkshop-1-og.jpg`
const businessId = `${siteUrl}/#entreprise`
const region = { '@type': 'AdministrativeArea', name: contact.region }

const toJsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')
const ogImage = (project: Project) => `${siteUrl}/${project.captures[0].src}-og.jpg`

function breadcrumb(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url }))
  }
}

function localBusinessJsonLd() {
  return toJsonLd({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessId,
    name: `${contact.name} · ${contact.role}`,
    description: homeDescription,
    url: `${siteUrl}/`,
    telephone: contact.phoneIntl,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: contact.city,
      addressRegion: contact.region,
      addressCountry: 'FR'
    },
    geo: { '@type': 'GeoCoordinates', latitude: -20.9633, longitude: 55.6503 },
    areaServed: region,
    sameAs: contact.sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, url: `${siteUrl}/services/${service.slug}` }
      }))
    }
  })
}

function caseStudyJsonLd(project: Project) {
  return toJsonLd({
    '@context': 'https://schema.org',
    ...breadcrumb([
      { name: 'Accueil', url: `${siteUrl}/` },
      { name: 'Réalisations', url: `${siteUrl}/#realisations` },
      { name: project.name, url: `${siteUrl}/projets/${project.slug}` }
    ])
  })
}

function serviceJsonLd(service: Service) {
  const url = `${siteUrl}/services/${service.slug}`
  return toJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.h1,
        description: service.metaDescription,
        url,
        serviceType: service.title,
        areaServed: region,
        provider: { '@id': businessId }
      },
      breadcrumb([
        { name: 'Accueil', url: `${siteUrl}/` },
        { name: service.title, url }
      ]),
      {
        '@type': 'FAQPage',
        mainEntity: service.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer }
        }))
      }
    ]
  })
}

export function getSeo(path: string): Seo {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path
  if (clean === '/') {
    return {
      title: homeTitle,
      description: homeDescription,
      path: '/',
      image: homeImage,
      indexable: true,
      jsonLd: localBusinessJsonLd()
    }
  }
  const projectMatch = clean.match(/^\/projets\/([^/]+)$/)
  const project = projectMatch ? findProject(projectMatch[1]) : undefined
  if (project) {
    return {
      title: `${project.name} · Étude de cas · Vincent, développeur web`,
      description: project.summary,
      path: `/projets/${project.slug}`,
      image: ogImage(project),
      indexable: true,
      jsonLd: caseStudyJsonLd(project)
    }
  }
  const serviceMatch = clean.match(/^\/services\/([^/]+)$/)
  const service = serviceMatch ? findService(serviceMatch[1]) : undefined
  if (service) {
    const firstProject = findProject(service.relatedProjects[0] ?? '')
    return {
      title: service.seoTitle,
      description: service.metaDescription,
      path: `/services/${service.slug}`,
      image: firstProject ? ogImage(firstProject) : homeImage,
      indexable: true,
      jsonLd: serviceJsonLd(service)
    }
  }
  return {
    title: 'Page introuvable · Vincent',
    description: 'Cette adresse ne correspond à aucune page.',
    path: clean,
    image: homeImage,
    indexable: false,
    jsonLd: null
  }
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderHead(seo: Seo) {
  const url = `${siteUrl}${seo.path}`
  const lines = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}">`,
    `<link rel="canonical" href="${escape(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:title" content="${escape(seo.title)}">`,
    `<meta property="og:description" content="${escape(seo.description)}">`,
    `<meta property="og:url" content="${escape(url)}">`,
    `<meta property="og:image" content="${escape(seo.image)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`
  ]
  if (!seo.indexable) lines.push('<meta name="robots" content="noindex">')
  if (seo.jsonLd) lines.push(`<script type="application/ld+json">${seo.jsonLd}</script>`)
  return lines.join('\n    ')
}
