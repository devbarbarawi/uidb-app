import { useQuery } from '@tanstack/react-query'

import { toDevices } from './models'
import { getDevicesQuery } from './queries'

/**
 * The devices of the UIDB response, parsed and ready for the UI, with the request's loading
 * and error state.
 */
export const useGetDevicesData = () => useQuery({ ...getDevicesQuery, select: toDevices })
