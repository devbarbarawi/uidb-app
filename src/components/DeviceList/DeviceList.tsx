import { useDeferredValue } from 'react'
import { useLocation } from 'react-router'

import { searchDevices, useGetDevicesData } from '../../api'
import { useSearchQuery } from '../../hooks'
import { DeviceTable } from '../ListView'
import { StatusMessage } from '../StatusMessage'
import { StyledDeviceList } from './DeviceList.styles'

/** The UIDB devices matching the search, with loading, error and empty states. */
export const DeviceList = () => {
  const { data: devices, isPending, isError, refetch } = useGetDevicesData()
  const [query] = useSearchQuery()
  // The device links carry the list's URL parameters, so the device page keeps the search.
  const { search } = useLocation()
  // Typing stays instant; the table catches up in the background.
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

  const matchingDevices = searchDevices(devices, deferredQuery)

  if (matchingDevices.length === 0) {
    return <StatusMessage>No devices match “{deferredQuery}”.</StatusMessage>
  }

  return (
    <StyledDeviceList>
      <DeviceTable devices={matchingDevices} search={search} />
    </StyledDeviceList>
  )
}
