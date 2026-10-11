import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import { StyledGlobalStyles } from './StyledGlobalStyles'

/**
 * CSS that styled-components generates for an element.
 */
const collectCss = (element: ReactElement) => {
  const sheet = new ServerStyleSheet()

  try {
    renderToStaticMarkup(sheet.collectStyles(element))

    return sheet.getStyleTags()
  } finally {
    sheet.seal()
  }
}

describe('StyledGlobalStyles', () => {
  test('Should declare the design tokens as CSS custom properties', () => {
    expect(collectCss(<StyledGlobalStyles />)).toContain('--uidb-color-primary:#006fff;')
  })

  test('Should apply the base typography to the body', () => {
    expect(collectCss(<StyledGlobalStyles />)).toContain('font-family:var(--uidb-font-family);')
  })
})
