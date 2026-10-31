import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const dist = join(root, 'dist')
const ssrDir = join(root, 'distSsr')
const { render, routes, getSeo, renderHead, siteUrl } = await import(join(ssrDir, 'entryServer.js'))

const template = await readFile(join(dist, 'index.html'), 'utf8')

function fileFor(route) {
  if (route === '/') return 'index.html'
  if (route === '/404') return '404.html'
  return join(route.slice(1), 'index.html')
}

for (const route of [...routes, '/404']) {
  const html = template
    .replace('<!--app-head-->', renderHead(getSeo(route)))
    .replace('<!--app-html-->', render(route))
  const file = join(dist, fileFor(route))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`✓ ${route}`)
}

// lastmod : date du dernier changement réel du contenu de chaque page, et non date du build.
// Une empreinte du HTML rendu (head SEO + contenu, sans les noms d'assets) est conservée
// entre deux déploiements dans .sitemap-dates.json (hors dépôt) ; la date n'avance que si
// l'empreinte change. Sinon Google voit toutes les pages « modifiées » à chaque déploiement
// et finit par ignorer ces dates.
const today = new Date().toISOString().slice(0, 10)
const statePath = join(root, '.sitemap-dates.json')
let previous = {}
try { previous = JSON.parse(await readFile(statePath, 'utf8')) } catch { /* premier build : tout à la date du jour */ }
const state = {}
for (const route of routes) {
  const hash = createHash('sha256').update(renderHead(getSeo(route)) + render(route)).digest('hex')
  const before = previous[route]
  state[route] = { hash, lastmod: before && before.hash === hash ? before.lastmod : today }
}
await writeFile(statePath, JSON.stringify(state, null, 2) + '\n')
const urls = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${state[route].lastmod}</lastmod></url>`).join('\n')
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`)
await writeFile(join(dist, 'robots.txt'), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`)

await rm(ssrDir, { recursive: true, force: true })
