import { type Device, getDeviceImageUrl } from '../../api'
import { paths } from '../../paths'
import {
  StyledCardImage,
  StyledCardLine,
  StyledCardName,
  StyledDeviceCard,
} from './DeviceCard.styles'

export type DeviceCardProps = {
  device: Device
  /** URL parameters (`?q=…`) carried to the device page. */
  search: string
}

/** Twice the card's width, for high-density screens. */
const IMAGE_WIDTH = 440

/** One device in the grid: a card that opens the device page ("Product card" in the design). */
export const DeviceCard = ({ device, search }: DeviceCardProps) => (
  <StyledDeviceCard to={`${paths.device(device.id)}${search}`}>
    {/* Decorative: the name is in the same card. */}
    <StyledCardImage src={getDeviceImageUrl(device, IMAGE_WIDTH)} alt="" />
    <StyledCardName>{device.name}</StyledCardName>
    <StyledCardLine>{device.lineName}</StyledCardLine>
  </StyledDeviceCard>
)
