import { matchesSearch } from '../../utils'
import type { Device } from './device'

/** The devices whose name or product line match the search `query` (all of them when empty). */
export const searchDevices = (devices: ReadonlyArray<Device>, query: string): Array<Device> =>
  devices.filter((device) => matchesSearch([device.name, device.lineName], query))
