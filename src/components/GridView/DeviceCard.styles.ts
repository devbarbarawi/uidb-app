import { Link } from 'react-router'
import styled from 'styled-components'

import { border, color, duration, font, Image, radius, space } from '../../design-system'

export const StyledCardImage = styled(Image)`
  width: 100%;
  height: 100px;
  padding: ${space[8]};
  background: ${color.surfaceSubtle};
  object-fit: contain;
  transition: background-color ${duration.fast};
`

export const StyledDeviceCard = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: ${border.width} solid ${color.border};
  border-radius: ${radius.m};
  color: inherit;
  text-decoration: none;

  &:hover ${StyledCardImage} {
    background: ${color.surfaceHover};
  }

  &:focus-visible {
    border-color: ${color.primary};
    outline: none;
  }
`

export const StyledCardName = styled.span`
  padding: ${space[8]} ${space[8]} ${space[4]};
  color: ${color.textStrong};
`

export const StyledCardLine = styled.span`
  /* Shown as a badge over the image, as in the design; read after the name. */
  position: absolute;
  top: ${space[4]};
  right: ${space[4]};
  padding: 0 ${space[4]};
  border-radius: ${radius.s};
  background: ${color.surface};
  color: ${color.primary};
  font-size: ${font.sizeCaption};
  line-height: ${font.lineHeightCaption};
`
