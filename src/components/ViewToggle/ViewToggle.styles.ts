import styled from 'styled-components'

import { color, duration, radius } from '../../design-system'

export const StyledViewToggle = styled.div`
  display: flex;
`

export const StyledToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: ${radius.s};
  background: none;
  color: ${color.icon};
  cursor: pointer;
  transition: color ${duration.fast};

  &:hover {
    color: ${color.primary};
  }

  /* The current layout: blue on a light background, as in the design. */
  &[aria-pressed='true'] {
    background: ${color.surfaceHover};
    color: ${color.primary};
  }
`
