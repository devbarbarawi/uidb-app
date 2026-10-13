import { type Device, getDeviceImageUrl } from '../../api'
import { paths } from '../../paths'
import { StyledRow, StyledRowLink, StyledThumbnail } from './DeviceTableRow.styles'

export type DeviceTableRowProps = {
  device: Device
}

/** Twice the 20px thumbnail, for high-density screens. */
const THUMBNAIL_WIDTH = 40

/** One device in the device table; the whole row opens the device page. */
export const DeviceTableRow = ({ device }: DeviceTableRowProps) => (
  <StyledRow>
    <td>
      {/* Decorative: the name is in the same row. */}
      <StyledThumbnail src={getDeviceImageUrl(device, THUMBNAIL_WIDTH)} alt="" />
    </td>
    <td>{device.lineName}</td>
    <td>
      <StyledRowLink to={paths.device(device.id)}>{device.name}</StyledRowLink>
    </td>
  </StyledRow>
)
