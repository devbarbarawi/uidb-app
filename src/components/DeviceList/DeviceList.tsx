import { useDeferredValue } from 'react'
import { useLocation } from 'react-router'

import { filterDevices, useGetDevicesData } from '../../api'
import { useLineFilterParam, useSearchQuery, useViewParam } from '../../hooks'
import { DeviceGrid } from '../GridView'
import { DeviceTable } from '../ListView'
import { StatusMessage } from '../StatusMessage'
import { StyledDeviceList } from './DeviceList.styles'

/**
 * The UIDB devices matching the search and product line filter, as a table or a grid
 * (`?view=grid`), with loading, error and empty states.
 */
export const DeviceList = () => {
  const { data: devices, isPending, isError, refetch } = useGetDevicesData()
  const [query] = useSearchQuery()
  const [lines] = useLineFilterParam()
  const [view] = useViewParam()
  // The device links carry the list's URL parameters, so the device page keeps the search and
  // filters.
  const { search } = useLocation()
  // Typing stays instant; the list catches up in the background.
  const deferredQuery = useDeferredValue(query)

  if (isPending) {
    return <StatusMessage>Loading devices…</StatusMessage>
  }

  if (isError) {
    return (
      <StatusMessage tone="error">
        Devices could not be loaded.{' '}
        <button type="button" onClick={() => void refetch()}>
          Try again
        </button>
      </StatusMessage>
    )
  }

  const matchingDevices = filterDevices(devices, { query: deferredQuery, lines })

  if (matchingDevices.length === 0) {
    return <StatusMessage>No devices match your search and filters.</StatusMessage>
  }

  return (
    <StyledDeviceList>
      {view === 'grid' ? (
        <DeviceGrid devices={matchingDevices} search={search} />
      ) : (
        <DeviceTable devices={matchingDevices} search={search} />
      )}
    </StyledDeviceList>
  )
}
