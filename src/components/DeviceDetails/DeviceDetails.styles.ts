import styled from 'styled-components'

import { color, font, Image, radius, space } from '../../design-system'

export const StyledDeviceDetails = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: ${space[32]};
  justify-content: center;
  padding: ${space[32]};
`

export const StyledDeviceImage = styled(Image)`
  width: 260px;
  height: 260px;
  padding: ${space[16]};
  border-radius: ${radius.m};
  background: ${color.surfaceSubtle};
  object-fit: contain;
`

export const StyledDeviceInfo = styled.div`
  display: flex;
  flex: 0 1 320px;
  flex-direction: column;
  gap: ${space[16]};
`

export const StyledDeviceName = styled.h1`
  color: ${color.textStrong};
  font-size: ${font.sizeHeading};
  font-weight: ${font.weightBold};
  line-height: ${font.lineHeightHeading};
`

export const StyledDeviceLine = styled.p`
  color: ${color.textMuted};
`

export const StyledSpecs = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${space[8]} ${space[16]};
  margin: 0;

  dt {
    color: ${color.textStrong};
  }

  dd {
    margin: 0;
    color: ${color.textMuted};
    text-align: end;
    overflow-wrap: anywhere;
  }
`
