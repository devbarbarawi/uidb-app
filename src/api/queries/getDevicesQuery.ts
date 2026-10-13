import { queryOptions } from '@tanstack/react-query'

import { makeRequest } from '../helpers/makeRequest'

/** Public UIDB snapshot; CORS-enabled, so the browser reads it directly. */
export const UIDB_URL = 'https://static.ui.com/fingerprint/ui/public.json'

/**
 * The GET request for every UIDB device. Resolves with the JSON exactly as UIDB sends it,
 * typed `unknown` because its shape is not guaranteed (see `useGetDevicesData`).
 */
export const getDevicesQuery = queryOptions({
  queryKey: ['devices'],
  queryFn: async (): Promise<unknown> => {
    const response = await makeRequest(UIDB_URL)

    if (!response.ok) {
      throw new Error(`Failed to fetch devices: HTTP ${String(response.status)}`)
    }

    return response.json()
  },
})
