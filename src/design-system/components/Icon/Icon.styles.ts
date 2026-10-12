import styled from 'styled-components'

import { escapeCssUrl } from '../../styles'

export const StyledIcon = styled.span<{ $url: string; $size: number }>`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  /* The icon is a mask over the text colour: it follows hover and focus colours for free. */
  background-color: currentColor;
  mask: ${({ $url }) => escapeCssUrl($url)} center / contain no-repeat;
`
