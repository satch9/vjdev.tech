import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { projects } from './data/projects'
import { services } from './data/services'

export const routes = [
  '/',
  ...projects.map((p) => `/projets/${p.slug}`),
  ...services.map((s) => `/services/${s.slug}`)
]

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
export { getSeo, renderHead, siteUrl } from './seo'
