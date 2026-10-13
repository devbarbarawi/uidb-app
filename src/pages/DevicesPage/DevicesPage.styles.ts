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
