import { escapeCssUrl } from './escapeCssUrl'

describe('escapeCssUrl', () => {
  test('Should wrap a URL in a double-quoted url()', () => {
    expect(escapeCssUrl('/assets/logo.svg')).toBe('url("/assets/logo.svg")')
  })

  test('Should keep the single quotes of inlined SVG data URIs', () => {
    const dataUri = "data:image/svg+xml,%3csvg%20fill='none'%3e%3c/svg%3e"

    expect(escapeCssUrl(dataUri)).toBe(`url("${dataUri}")`)
  })

  test('Should escape double quotes, backslashes and newlines', () => {
    expect(escapeCssUrl('a"b\\c\nd')).toBe('url("a\\"b\\\\c\\a d")')
  })
})
