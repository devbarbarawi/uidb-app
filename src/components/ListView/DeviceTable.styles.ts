import styled from 'styled-components'

import { border, color, font, space } from '../../design-system'

export const StyledDeviceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    /* The bottom border sits inside the 32px row, as in the design. */
    padding: ${space[6]} ${space[8]} calc(${space[6]} - ${border.width});
    overflow: hidden;
    border-bottom: ${border.width} solid ${color.border};
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    color: ${color.textStrong};
    font-weight: ${font.weightBold};
  }

  td:last-child {
    color: ${color.textMuted};
  }

  tbody tr:hover {
    background: ${color.surfaceHover};
  }
`
