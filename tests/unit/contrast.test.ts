import { describe, it, expect } from 'vitest'
// @ts-expect-error config JS sans types
import config from '../../tailwind.config.js'

const colors = config.theme.extend.colors as Record<string, string>

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function ratio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('contraste AA (4,5:1) du texte sur papier', () => {
  for (const name of ['night', 'slate', 'ink', 'lagonDeep', 'pencil']) {
    it(`${name} sur papier`, () => {
      expect(ratio(colors[name], colors.paper)).toBeGreaterThanOrEqual(4.5)
    })
  }
})
