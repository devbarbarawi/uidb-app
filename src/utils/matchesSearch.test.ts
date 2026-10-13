import { matchesSearch } from './matchesSearch'

const texts = ['Dream Router', 'UniFi']

describe('matchesSearch', () => {
  test('Should match everything when the query is empty', () => {
    expect(matchesSearch(texts, '   ')).toBe(true)
  })

  test('Should ignore case', () => {
    expect(matchesSearch(texts, 'DREAM')).toBe(true)
  })

  test('Should need every word, in any of the texts', () => {
    expect(matchesSearch(texts, 'unifi router')).toBe(true)
    expect(matchesSearch(texts, 'unifi switch')).toBe(false)
  })
})
