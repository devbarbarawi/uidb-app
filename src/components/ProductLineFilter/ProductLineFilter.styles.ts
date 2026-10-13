import styled from 'styled-components'

import { border, color, font, radius, space } from '../../design-system'

export const StyledProductLineFilter = styled.div`
  position: relative;
`

export const StyledFilterButton = styled.button`
  display: inline-flex;
  gap: ${space[4]};
  align-items: center;
  height: 32px;
  padding: 0 ${space[8]};
  border: none;
  border-radius: ${radius.s};
  background: none;
  color: ${color.textDefault};
  cursor: pointer;

  &:hover,
  &[aria-expanded='true'] {
    background: ${color.surfaceHover};
    color: ${color.primary};
  }
`

export const StyledCount = styled.span`
  color: ${color.primary};
`

export const StyledPanel = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(100% + ${space[4]});
  right: 0;
  width: 240px;
  padding: ${space[16]};
  border-radius: ${radius.m};
  background: ${color.surface};
  box-shadow: 0 16px 32px rgb(28 30 45 / 20%);
`

export const StyledLines = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: ${space[8]};
  max-height: 320px;
  margin: 0 0 ${space[16]};
  padding: 0;
  overflow-y: auto;
  border: none;

  legend {
    margin-bottom: ${space[8]};
    padding: 0;
    color: ${color.textStrong};
    font-weight: ${font.weightBold};
  }

  label {
    display: flex;
    gap: ${space[8]};
    align-items: center;
    cursor: pointer;
  }

  input {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: ${color.primary};
  }
`

export const StyledResetButton = styled.button`
  padding: 0;
  border: ${border.width} solid transparent;
  background: none;
  color: ${color.danger};
  cursor: pointer;

  &:disabled {
    color: ${color.textDisabled};
    cursor: default;
  }
`
