import styled from 'styled-components'

import { border, color, font, radius, space } from '../../design-system'

export const StyledDeviceJson = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space[8]};
  align-items: flex-start;
  min-width: 0;
`

export const StyledJsonToggle = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${color.primary};
  font: inherit;
  cursor: pointer;

  &:hover {
    color: ${color.primaryHover};
  }
`

export const StyledJson = styled.pre`
  width: 100%;
  margin: 0;
  padding: ${space[16]};
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border: ${border.width} solid ${color.border};
  border-radius: ${radius.m};
  background: ${color.surfaceSubtle};
  color: ${color.textDefault};
  font-family: ${font.familyMono};
  font-size: ${font.sizeCaption};
  line-height: ${font.lineHeightCaption};
`
