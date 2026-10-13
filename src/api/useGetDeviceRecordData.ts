import { useQuery } from '@tanstack/react-query'

import { toDeviceRecord } from './models'
import { getDevicesQuery } from './queries'

/**
 * One device's UIDB record, untouched, with the request's loading and error state. Shares the
 * cached devices request, so it never fetches twice.
 */
export const useGetDeviceRecordData = (deviceId: string | undefined) =>
  useQuery({ ...getDevicesQuery, select: (response) => toDeviceRecord(response, deviceId) })
