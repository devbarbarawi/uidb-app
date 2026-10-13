import styled from 'styled-components'

import { border, color, radius, space } from '../../design-system'

export const StyledDeviceSearch = styled.div`
  position: relative;
  width: 320px;
  max-width: 100%;
`

/** Places the decorative search icon inside the field. */
export const StyledSearchIcon = styled.span`
  position: absolute;
  top: 6px;
  left: ${space[8]};
  display: flex;
  color: ${color.icon};
  pointer-events: none;
`

export const StyledSearchField = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 ${space[8]} 0 32px;
  border: ${border.width} solid transparent;
  border-radius: ${radius.s};
  background: ${color.input};
  color: ${color.textStrong};

  &::placeholder {
    color: ${color.textMuted};
  }

  &:hover {
    background: ${color.surfaceHover};
  }

  &:focus-visible {
    border-color: ${color.primary};
    outline: none;
  }
`
export const StyledSuggestions = styled.ul`
  position: absolute;
  z-index: 1;
  top: calc(100% + ${space[4]});
  right: 0;
  left: 0;
  margin: 0;
  padding: ${space[4]} 0;
  border-radius: ${radius.m};
  background: ${color.surface};
  box-shadow: 0 16px 32px rgb(28 30 45 / 20%);
  list-style: none;
`

export const StyledSuggestion = styled.li<{ $isActive: boolean }>`
  display: flex;
  gap: ${space[8]};
  justify-content: space-between;
  padding: ${space[4]} ${space[8]};
  background: ${({ $isActive }) => ($isActive ? color.surfaceHover : 'transparent')};
  color: ${color.textStrong};
  cursor: pointer;

  &:hover {
    background: ${color.surfaceHover};
  }
`

export const StyledSuggestionHint = styled.span`
  flex-shrink: 0;
  color: ${color.textMuted};
`
