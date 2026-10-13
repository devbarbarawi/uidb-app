import styled from 'styled-components'

import { border, color, radius, space } from '../../design-system'

export const StyledDeviceSearch = styled.div`
  position: relative;
  width: 320px;
  max-width: 100%;
`

/** Places the decorative search icon inside the field. */
export const StyledSearchIcon = styled.span`
  position: absolute;
  top: 6px;
  left: ${space[8]};
  display: flex;
  color: ${color.icon};
  pointer-events: none;
`

export const StyledSearchField = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 ${space[8]} 0 32px;
  border: ${border.width} solid transparent;
  border-radius: ${radius.s};
  background: ${color.input};
  color: ${color.textStrong};

  &::placeholder {
    color: ${color.textMuted};
  }

  &:hover {
    background: ${color.surfaceHover};
  }

  &:focus-visible {
    border-color: ${color.primary};
    outline: none;
  }
`
