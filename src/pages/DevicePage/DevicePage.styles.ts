import { Link } from 'react-router'
import styled from 'styled-components'

import { color, space } from '../../design-system'

export const StyledBackLink = styled(Link)`
  display: inline-flex;
  gap: ${space[4]};
  align-items: center;
  margin: ${space[16]} ${space[32]} 0;
  color: ${color.primary};
  text-decoration: none;

  &:hover {
    color: ${color.primaryHover};
  }
`
