import { Link } from 'react-router'
import styled, { css } from 'styled-components'

import { border, color, duration, radius, space } from '../../design-system'

export const StyledDeviceNavigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space[16]} ${space[32]} 0;
`

export const StyledBackLink = styled(Link)`
  display: inline-flex;
  gap: ${space[4]};
  align-items: center;
  color: ${color.primary};
  text-decoration: none;

  &:hover {
    color: ${color.primaryHover};
  }
`

export const StyledPager = styled.div`
  display: flex;
  gap: ${space[4]};
`

/** Shared by the arrow links and the end-of-list placeholders. */
const pagerItem = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: ${border.width} solid ${color.border};
  border-radius: ${radius.s};
`

export const StyledPagerLink = styled(Link)`
  ${pagerItem}
  color: ${color.icon};
  transition: color ${duration.fast};

  &:hover {
    color: ${color.primary};
  }
`

/** Takes the place of a link at either end of the list, so the arrows keep their position. */
export const StyledPagerEnd = styled.span`
  ${pagerItem}
  color: ${color.textDisabled};
`
