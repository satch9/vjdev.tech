import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { findForbidden, hasPrivateTerms } from '../forbiddenTerms'

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? listFiles(path) : [path]
  })
}

describe.skipIf(!hasPrivateTerms)('anonymisation des sources', () => {
  it('aucun terme interdit dans src/', () => {
    const hits = listFiles('src').flatMap((file) =>
      findForbidden(readFileSync(file, 'utf8')).map((term) => `${file} : ${term}`))
    expect(hits).toEqual([])
  })
  it('aucun terme interdit dans les noms de fichiers de public/', () => {
    const hits = listFiles('public').flatMap((file) =>
      findForbidden(file).map((term) => `${file} : ${term}`))
    expect(hits).toEqual([])
  })
})
