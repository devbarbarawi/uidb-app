import { useDeferredValue } from 'react'

import { type Device, filterDevices, useGetDevicesData } from '../api'
import { useLineFilterParam } from './useLineFilterParam'
import { useSearchQuery } from './useSearchQuery'

/**
 * The devices matching the search and product line filter from the URL, or `undefined` while
 * they load. Used by everything that shows the result (the list, the count), so they always agree.
 */
export const useVisibleDevices = (): Array<Device> | undefined => {
  const { data: devices } = useGetDevicesData()
  const [query] = useSearchQuery()
  const [lines] = useLineFilterParam()
  // Typing stays instant; the results catch up in the background.
  const deferredQuery = useDeferredValue(query)

  return devices && filterDevices(devices, { query: deferredQuery, lines })
}
