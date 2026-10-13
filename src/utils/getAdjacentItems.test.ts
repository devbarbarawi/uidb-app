import { getAdjacentItems } from './getAdjacentItems'

const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]

describe('getAdjacentItems', () => {
  test('Should return the items before and after', () => {
    expect(getAdjacentItems(items, 'b')).toEqual({ previous: { id: 'a' }, next: { id: 'c' } })
  })

  test('Should have no previous item at the start and no next item at the end', () => {
    expect(getAdjacentItems(items, 'a').previous).toBeUndefined()
    expect(getAdjacentItems(items, 'c').next).toBeUndefined()
  })

  test('Should have neither when the id is not in the list', () => {
    expect(getAdjacentItems(items, 'unknown')).toEqual({ previous: undefined, next: undefined })
  })
})
