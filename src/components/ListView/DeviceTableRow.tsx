import type { Device } from '../../api'

export type DeviceTableRowProps = {
  device: Device
}

/** One device in the device table: its product line and name. */
export const DeviceTableRow = ({ device }: DeviceTableRowProps) => (
  <tr>
    <td>{device.lineName}</td>
    <td>{device.name}</td>
  </tr>
)
