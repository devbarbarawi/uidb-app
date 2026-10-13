import type { Device } from '../../api'
import { DeviceCard } from './DeviceCard'
import { StyledDeviceGrid } from './DeviceGrid.styles'

export type DeviceGridProps = {
  devices: ReadonlyArray<Device>
  /** URL parameters (`?q=…&view=grid`) carried to the device pages. */
  search: string
}

/** Devices as a grid of product cards ("Device List Grid" in the design). */
export const DeviceGrid = ({ devices, search }: DeviceGridProps) => (
  <StyledDeviceGrid aria-label="Devices">
    {devices.map((device) => (
      <li key={device.id}>
        <DeviceCard device={device} search={search} />
      </li>
    ))}
  </StyledDeviceGrid>
)
