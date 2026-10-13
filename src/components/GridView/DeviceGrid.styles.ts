import styled from 'styled-components'

import { space } from '../../design-system'

export const StyledDeviceGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${space[16]};
  margin: 0;
  padding: 0;
  list-style: none;
`
