import type { Device } from '../../api'
import { StyledDeviceTable } from './DeviceTable.styles'
import { DeviceTableRow } from './DeviceTableRow'

export type DeviceTableProps = {
  devices: ReadonlyArray<Device>
  /** URL parameters (`?q=…`) carried to the device pages. */
  search: string
}

/** Devices as a table with one row per device ("Device List" in the UI mockup). */
export const DeviceTable = ({ devices, search }: DeviceTableProps) => (
  <StyledDeviceTable aria-label="Devices">
    <thead>
      <tr>
        <th scope="col" aria-label="Image" />
        <th scope="col">Product Line</th>
        <th scope="col">Name</th>
      </tr>
    </thead>
    <tbody>
      {devices.map((device) => (
        <DeviceTableRow key={device.id} device={device} search={search} />
      ))}
    </tbody>
  </StyledDeviceTable>
)
