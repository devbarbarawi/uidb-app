import { isNullOrUndefined } from './isNullOrUndefined'

describe('isNullOrUndefined', () => {
  test.each([[undefined], [null]])('Should be true for %p', (value) => {
    expect(isNullOrUndefined(value)).toBe(true)
  })

  test.each([[0], [''], [false], [Number.NaN], [{}]])('Should be false for %p', (value) => {
    expect(isNullOrUndefined(value)).toBe(false)
  })
})
