import { type Device, getDeviceImageUrl } from '../../api'
import { paths } from '../../paths'
import { StyledRow, StyledRowLink, StyledThumbnail } from './DeviceTableRow.styles'

export type DeviceTableRowProps = {
  device: Device
  /** URL parameters (`?q=…`) carried to the device page. */
  search: string
}

/** Twice the 20px thumbnail, for high-density screens. */
const THUMBNAIL_WIDTH = 40

/** One device in the device table; the whole row opens the device page. */
export const DeviceTableRow = ({ device, search }: DeviceTableRowProps) => (
  <StyledRow>
    <td>
      {/* Decorative: the name is in the same row. */}
      <StyledThumbnail src={getDeviceImageUrl(device, THUMBNAIL_WIDTH)} alt="" />
    </td>
    <td>{device.lineName}</td>
    <td>
      <StyledRowLink to={`${paths.device(device.id)}${search}`}>{device.name}</StyledRowLink>
    </td>
  </StyledRow>
)
