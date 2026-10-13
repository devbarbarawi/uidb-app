import styled from 'styled-components'

import { space } from '../../design-system'

export const StyledToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space[16]};
  align-items: center;
  justify-content: space-between;
  padding: ${space[16]} ${space[32]} 0;
`

export const StyledToolbarStart = styled.div`
  display: flex;
  flex: 1 1 320px;
  gap: ${space[16]};
  align-items: center;
`

export const StyledToolbarEnd = styled.div`
  display: flex;
  gap: ${space[8]};
  align-items: center;
`

/** Hidden on screen, still read by screen readers. */
export const StyledVisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`
