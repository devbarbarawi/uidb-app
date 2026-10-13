import { type Device, getDeviceImageUrl } from '../../api'
import { StyledThumbnail } from './DeviceTableRow.styles'

export type DeviceTableRowProps = {
  device: Device
}

/** Twice the 20px thumbnail, for high-density screens. */
const THUMBNAIL_WIDTH = 40

/** One device in the device table: its thumbnail, product line and name. */
export const DeviceTableRow = ({ device }: DeviceTableRowProps) => (
  <tr>
    <td>
      {/* Decorative: the name is in the same row. */}
      <StyledThumbnail src={getDeviceImageUrl(device, THUMBNAIL_WIDTH)} alt="" />
    </td>
    <td>{device.lineName}</td>
    <td>{device.name}</td>
  </tr>
)
