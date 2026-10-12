import styled from 'styled-components'

import { border, color, duration, space } from '../../design-system'

export const StyledAppHeader = styled.header`
  display: flex;
  gap: ${space[16]};
  align-items: center;
  justify-content: space-between;
  padding-right: ${space[32]};
  background: ${color.neutral02};
  color: ${color.text3};
`

export const StyledAppHeaderStart = styled.div`
  display: flex;
  gap: ${space[16]};
  align-items: center;
`

export const StyledHomeLink = styled.a`
  display: inline-flex;
  padding: calc(5px - ${border.width});
  border: ${border.width} solid transparent;
  color: ${color.neutral10};
  transition:
    background-color ${duration.fast},
    color ${duration.fast};

  &:hover {
    background: ${color.surface};
    color: ${color.primary};
  }

  &:focus-visible {
    border-color: ${color.primary};
    outline: none;
  }
`
