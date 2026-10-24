import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { preview, type PreviewServer } from 'vite'
import { chromium, type Browser } from 'playwright'

let base = ''
const pages = [
  '/',
  '/projets/freightworkshop/', '/projets/club1/', '/projets/madoc/', '/projets/plateforme-reunion/',
  '/services/creation-site-vitrine/', '/services/application-metier-sur-mesure/', '/services/outils-internes-automatisation/'
]

let server: PreviewServer
let browser: Browser

beforeAll(async () => {
  // Port 0 : le système choisit un port libre (machine partagée, 8090 peut être occupé)
  server = await preview({ appType: 'mpa', preview: { port: 0, host: '127.0.0.1' } })
  base = server.resolvedUrls!.local[0].replace(/\/$/, '')
  browser = await chromium.launch()
}, 30000)

afterAll(async () => {
  await browser?.close()
  await server?.close()
})

describe('navigateur', () => {
  it('aucune erreur console (hydratation comprise) sur chaque page', async () => {
    const page = await browser.newPage()
    const errors: string[] = []
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`${page.url()} : ${msg.text()}`) })
    page.on('pageerror', (err) => errors.push(`${page.url()} : ${err.message}`))
    for (const path of pages) await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
    expect(errors).toEqual([])
    await page.close()
  }, 60000)

  it('aucun défilement horizontal à 360 px', async () => {
    const page = await browser.newPage({ viewport: { width: 360, height: 740 } })
    const overflowing: string[] = []
    for (const path of pages) {
      await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
      const tooWide = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
      if (tooWide) overflowing.push(path)
    }
    expect(overflowing).toEqual([])
    await page.close()
  }, 60000)

  it('« Un projet similaire ? » mène à la section contact de l\'accueil', async () => {
    const page = await browser.newPage()
    await page.goto(`${base}/projets/club1/`, { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: 'Un projet similaire ? Parlons-en' }).click()
    await page.waitForURL(`${base}/#contact`)
    await expect.poll(() => page.evaluate(() => {
      const box = document.getElementById('contact')!.getBoundingClientRect()
      return box.top < window.innerHeight && box.bottom > 0
    })).toBe(true)
    await page.close()
  }, 30000)

  it('recliquer sur une ancre déjà active y ramène', async () => {
    const page = await browser.newPage()
    await page.goto(`${base}/`, { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: 'Me contacter' }).click()
    await page.waitForURL(`${base}/#contact`)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Contact' }).first().click()
    await expect.poll(() => page.evaluate(() => {
      const box = document.getElementById('contact')!.getBoundingClientRect()
      return box.top < window.innerHeight && box.bottom > 0
    })).toBe(true)
    await page.close()
  }, 30000)

  it('le focus clavier est visible dans la section contact', async () => {
    const page = await browser.newPage()
    await page.goto(`${base}/`, { waitUntil: 'networkidle' })
    const link = page.locator('#contact a').first()
    await link.focus()
    const [outline, background] = await link.evaluate((el) => [
      getComputedStyle(el).outlineColor,
      getComputedStyle(el.closest('section')!).backgroundColor
    ])
    expect(outline).not.toBe(background)
    await page.close()
  }, 30000)

  it('changer d\'étude de cas remonte en haut de page', async () => {
    const page = await browser.newPage()
    await page.goto(`${base}/`, { waitUntil: 'networkidle' })
    await page.locator('a[href="/projets/madoc"]').first().scrollIntoViewIfNeeded()
    await page.locator('a[href="/projets/madoc"]').first().click()
    await page.waitForURL(`${base}/projets/madoc`)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await page.close()
  }, 30000)

  it('404.html s\'affiche et s\'hydrate sans erreur', async () => {
    const page = await browser.newPage()
    const errors: string[] = []
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
    page.on('pageerror', (err) => errors.push(err.message))
    await page.goto(`${base}/404.html`, { waitUntil: 'networkidle' })
    expect(await page.textContent('h1')).toBe('Page introuvable')
    expect(errors).toEqual([])
    await page.close()
  }, 30000)

  it('une capture de la méthode s\'agrandit au clic et se referme', async () => {
    const page = await browser.newPage()
    await page.goto(`${base}/`, { waitUntil: 'networkidle' })
    const dialog = page.getByRole('dialog', { name: 'Note de cadrage de la boulangerie fictive' })
    await page.getByRole('button', { name: 'Agrandir : Note de cadrage de la boulangerie fictive' }).click()
    await expect.poll(() => dialog.isVisible()).toBe(true)
    await page.keyboard.press('Escape')
    await expect.poll(() => dialog.isVisible()).toBe(false)
    await page.getByRole('button', { name: 'Agrandir : Note de cadrage de la boulangerie fictive' }).click()
    await dialog.getByRole('button', { name: 'Fermer' }).click()
    await expect.poll(() => dialog.isVisible()).toBe(false)
    await page.close()
  }, 30000)

  it('une capture d\'étude de cas s\'agrandit au clic et se referme', async () => {
    const page = await browser.newPage()
    await page.goto(`${base}/projets/club1/`, { waitUntil: 'networkidle' })
    const name = 'Page d\'accueil du site vitrine du club de tennis'
    const dialog = page.getByRole('dialog', { name })
    await page.getByRole('button', { name: `Agrandir : ${name}` }).click()
    await expect.poll(() => dialog.isVisible()).toBe(true)
    await page.keyboard.press('Escape')
    await expect.poll(() => dialog.isVisible()).toBe(false)
    await page.close()
  }, 30000)

  it('« Me contacter » d\'une page de service reste sur la page et montre le contact', async () => {
    const page = await browser.newPage()
    await page.goto(`${base}/services/creation-site-vitrine/`, { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: 'Me contacter' }).click()
    await page.waitForURL(`${base}/services/creation-site-vitrine/#contact`)
    await expect.poll(() => page.evaluate(() => {
      const box = document.getElementById('contact')!.getBoundingClientRect()
      return box.top < window.innerHeight && box.bottom > 0
    })).toBe(true)
    await page.close()
  }, 30000)

  it('depuis l\'accueil, une carte de service ouvre sa page en haut avec le bon titre', async () => {
    const page = await browser.newPage()
    await page.goto(`${base}/`, { waitUntil: 'networkidle' })
    const link = page.locator('#services a[href="/services/application-metier-sur-mesure"]')
    await link.scrollIntoViewIfNeeded()
    await link.click()
    await page.waitForURL(`${base}/services/application-metier-sur-mesure`)
    await expect.poll(() => page.title()).toBe('Application métier sur mesure à La Réunion · Vincent')
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    expect(await page.textContent('h1')).toBe('Application métier sur mesure à La Réunion')
    await page.close()
  }, 30000)
})
