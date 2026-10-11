import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'

import { createGlobalStyle } from 'styled-components'

import { color, cssVariableDeclarations, font } from '../tokens'

/**
 * Design tokens (as CSS custom properties), fonts and a minimal base.
 */
export const StyledGlobalStyles = createGlobalStyle`
  :root {
    ${cssVariableDeclarations}
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100dvh;
    background: ${color.surface};
    color: ${color.textDefault};
    font-family: ${font.family};
    font-size: ${font.sizeBody};
    line-height: ${font.lineHeightBody};
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  :focus-visible {
    outline: 1px solid ${color.primary};
  }
`
