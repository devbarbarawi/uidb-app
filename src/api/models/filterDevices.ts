import type { Device } from './device'
import { searchDevices } from './searchDevices'

export type DeviceFilters = {
  /** Search text; empty matches every device. */
  query: string
  /** Selected product lines; empty means every line. */
  lines: ReadonlyArray<string>
}

/** The devices matching both the search and the selected product lines. */
export const filterDevices = (
  devices: ReadonlyArray<Device>,
  { query, lines }: DeviceFilters,
): Array<Device> =>
  searchDevices(devices, query).filter(
    (device) => lines.length === 0 || lines.includes(device.lineName),
  )
