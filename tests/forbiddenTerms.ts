import { existsSync } from 'node:fs'

// La liste vit dans un fichier local non versionné : sans lui, les tests qui l'utilisent sont ignorés
const privateUrl = new URL('../privateTerms.local.mjs', import.meta.url)
export const hasPrivateTerms = existsSync(privateUrl)
export const privateTerms = hasPrivateTerms ? await import(privateUrl.href) : null
export const forbiddenTerms: string[] = privateTerms?.forbiddenTerms ?? []

// Mesure d'audience : seuls le script et les attributs d'événement ont le droit de citer l'outil
const allowedPatterns = [/https:\/\/umami\.vjdev\.tech\/stats\.js/g, /data-umami-event[\w-]*/g]

export function findForbidden(text: string) {
  const lower = allowedPatterns.reduce((acc, pattern) => acc.replace(pattern, ''), text.toLowerCase())
  return forbiddenTerms.filter((term) => lower.includes(term))
}
