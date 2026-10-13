import { Link } from 'react-router'
import styled from 'styled-components'

import { Image } from '../../design-system'

export const StyledRow = styled.tr`
  /* Anchors the link's click area below. */
  position: relative;
`

export const StyledThumbnail = styled(Image)`
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  object-fit: contain;
`

export const StyledRowLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  /* Stretches the click area over the whole row; the link stays in the name cell. */
  &::after {
    position: absolute;
    inset: 0;
    content: '';
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::after {
    outline: 1px solid currentColor;
  }
`
