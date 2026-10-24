import { describe, it, expect } from 'vitest'
// @ts-expect-error module JS sans types
import { anonymizeText } from '../../scripts/anonymize.mjs'
import { hasPrivateTerms, privateTerms } from '../forbiddenTerms'

const cases: [string, string][] = privateTerms?.anonymizeCases ?? []

describe.skipIf(!hasPrivateTerms)('anonymizeText', () => {
  it.each(cases)('%s → %s', (input, expected) => {
    expect(anonymizeText(input)).toBe(expected)
  })
})
