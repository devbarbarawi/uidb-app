import { isNullOrUndefined } from '../../utils'
import type { Device } from './device'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && !isNullOrUndefined(value) && !Array.isArray(value)

const readText = (value: unknown) =>
  typeof value === 'string' && value.trim() !== '' ? value : undefined

/** One UIDB record as a `Device`, or `undefined` when it has no usable id. */
export const toDevice = (record: unknown): Device | undefined => {
  if (!isRecord(record)) {
    return undefined
  }

  const id = readText(record.id)
  if (isNullOrUndefined(id)) {
    return undefined
  }

  const product = isRecord(record.product) ? record.product : {}
  const line = isRecord(record.line) ? record.line : {}
  const images = isRecord(record.images) ? record.images : {}

  return {
    id,
    name: readText(product.name) ?? 'Unnamed device',
    lineName: readText(line.name) ?? 'Unknown',
    imageHash: readText(images.default),
  }
}

/**
 * Devices of a UIDB response (`{ devices: [...] }`). The schema is not guaranteed, so records
 * without an id are skipped instead of failing the whole list.
 */
export const toDevices = (response: unknown): Array<Device> => {
  const records: ReadonlyArray<unknown> | undefined =
    isRecord(response) && Array.isArray(response.devices) ? response.devices : undefined

  if (isNullOrUndefined(records)) {
    throw new Error('UIDB returned data in an unexpected format.')
  }

  return records.map(toDevice).filter((device) => !isNullOrUndefined(device))
}

/**
 * The UIDB record with this id, exactly as UIDB sends it (every field, including the ones the
 * UI does not use), or `undefined` when there is none.
 */
export const toDeviceRecord = (response: unknown, id: string | undefined): unknown => {
  const records: ReadonlyArray<unknown> =
    isRecord(response) && Array.isArray(response.devices) ? response.devices : []

  return records.find((record) => isRecord(record) && record.id === id)
}
