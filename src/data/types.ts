export type Capture = {
  src: string
  alt: string
}

export type Project = {
  slug: string
  name: string
  kind: 'client' | 'produit'
  sector: string
  summary: string
  context: string
  need: string
  delivered: string[]
  stack: string[]
  url?: string
  captures: Capture[]
}

export type MethodStep = {
  title: string
  text: string
  captures: Capture[]
}

export type Faq = {
  question: string
  answer: string
}

export type Service = {
  slug: string
  title: string
  text: string
  seoTitle: string
  metaDescription: string
  h1: string
  intro: string
  audience: string[]
  deliverablesTitle: string
  deliverables: string[]
  process: string
  relatedProjects: string[]
  relatedOtherProjects: string[]
  faq: Faq[]
}

export type OtherProject = {
  name: string
  text: string
  url: string
}
