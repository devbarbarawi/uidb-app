import type { Device } from './device'

/** The product lines of `devices`, each once, in alphabetical order. */
export const getProductLines = (devices: ReadonlyArray<Device>): Array<string> =>
  [...new Set(devices.map((device) => device.lineName))].toSorted((a, b) => a.localeCompare(b))
