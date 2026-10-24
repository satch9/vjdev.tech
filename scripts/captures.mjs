import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { targets } from './captureTargets.mjs'
import { anonymizePageSource } from './anonymize.mjs'

const outDir = new URL('../public/captures/', import.meta.url).pathname
const only = process.argv[2]

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Variable d'environnement manquante : ${name}`)
  return value
}

async function login(page, { url, emailVar, passwordVar }) {
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.locator('input[type="email"], input[name="email"]').first().fill(requireEnv(emailVar))
  await page.locator('input[type="password"]').first().fill(requireEnv(passwordVar))
  await page.locator('input[type="password"]').first().press('Enter')
  await page.waitForLoadState('networkidle')
}

async function save(buffer, name) {
  const image = sharp(buffer)
  await image.clone().resize(1280, 800).webp({ quality: 80 }).toFile(`${outDir}${name}-1280.webp`)
  await image.clone().resize(640, 400).webp({ quality: 80 }).toFile(`${outDir}${name}-640.webp`)
  if (name.endsWith('-1')) {
    await image.clone().resize(1200, 630, { position: 'top' }).jpeg({ quality: 82 }).toFile(`${outDir}${name}-og.jpg`)
  }
}

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
const loggedIn = new Map()

for (const target of targets.filter((t) => !only || t.name.startsWith(only))) {
  const loginKey = target.login?.url ?? 'public'
  if (!loggedIn.has(loginKey)) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: 'fr-FR', reducedMotion: 'reduce' })
    if (target.login) await login(await context.newPage(), target.login)
    loggedIn.set(loginKey, context)
  }
  const page = await loggedIn.get(loginKey).newPage()
  const url = target.url ?? requireEnv(target.urlVar)
  await page.goto(url, { waitUntil: 'networkidle' })
  if (target.clickText) {
    const button = page.getByRole('button', { name: target.clickText })
    if (await button.count()) await button.first().click()
  }
  for (const { role, name } of target.clicks ?? []) {
    await page.getByRole(role, { name }).first().click()
    await page.waitForLoadState('networkidle')
  }
  if (target.scrollY) await page.evaluate((y) => window.scrollTo(0, y), target.scrollY)
  if (target.scrollTo) await page.locator(target.scrollTo).evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY))
  if (target.hide) {
    await page.evaluate((selectors) => {
      for (const el of document.querySelectorAll(selectors.join(','))) el.style.display = 'none'
    }, target.hide)
  }
  if (target.anonymize) await page.evaluate(anonymizePageSource())
  await page.waitForTimeout(1500)
  await save(await page.screenshot(), target.name)
  await page.close()
  console.log(`✓ ${target.name}`)
}

await browser.close()
