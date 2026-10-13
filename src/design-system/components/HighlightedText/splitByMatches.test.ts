import { splitByMatches } from './splitByMatches'

describe('splitByMatches', () => {
  test('Should mark every word of the query, ignoring case', () => {
    expect(splitByMatches('Dream Router', 'dream rou')).toEqual([
      { text: 'Dream', isMatch: true },
      { text: ' ', isMatch: false },
      { text: 'Rou', isMatch: true },
      { text: 'ter', isMatch: false },
    ])
  })

  test('Should return the whole text unmarked for an empty query', () => {
    expect(splitByMatches('Dream Router', '  ')).toEqual([{ text: 'Dream Router', isMatch: false }])
  })

  test('Should treat special characters in the query as plain text', () => {
    expect(splitByMatches('U6+ (Pro)', '(pro)')).toEqual([
      { text: 'U6+ ', isMatch: false },
      { text: '(Pro)', isMatch: true },
    ])
  })
})
