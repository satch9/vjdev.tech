import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
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

const lastmod = new Date().toISOString().slice(0, 10)
const urls = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')
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
