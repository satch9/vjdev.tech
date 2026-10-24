import { existsSync } from 'node:fs'

// Les vrais noms à masquer vivent dans un fichier local non versionné
const privateUrl = new URL('../privateTerms.local.mjs', import.meta.url)
const privateTerms = existsSync(privateUrl) ? await import(privateUrl.href) : null

function getPrivateTerms() {
  if (!privateTerms) throw new Error('privateTerms.local.mjs manquant : anonymisation impossible')
  return privateTerms
}

export function anonymizeText(text) {
  return getPrivateTerms().replacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text)
}

// Exécutée dans la page : la fonction doit être autonome (pas de closure)
export function anonymizePageSource() {
  const { replacements, hiddenImagePattern } = getPrivateTerms()
  return `(() => {
    const replacements = [${replacements.map(([p, r]) => `[${p.toString()}, ${JSON.stringify(r)}]`).join(', ')}]
    const clean = (value) => replacements.reduce((acc, [p, r]) => acc.replace(p, r), value)
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const next = clean(node.nodeValue)
      if (next !== node.nodeValue) node.nodeValue = next
    }
    for (const el of document.querySelectorAll('[alt], [title], [placeholder], [aria-label]')) {
      for (const attr of ['alt', 'title', 'placeholder', 'aria-label']) {
        const value = el.getAttribute(attr)
        if (value) el.setAttribute(attr, clean(value))
      }
    }
    for (const img of document.querySelectorAll('img')) {
      if (${hiddenImagePattern.toString()}.test(img.src)) img.style.visibility = 'hidden'
    }
    document.title = clean(document.title)
  })()`
}
