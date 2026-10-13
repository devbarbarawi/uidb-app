import { useDeferredValue } from 'react'

import { useGetDevicesData } from '../../api'
import { useSearchQuery } from '../../hooks'
import { matchesSearch } from '../../utils'
import { DeviceTable } from '../ListView'
import { StatusMessage } from '../StatusMessage'
import { StyledDeviceList } from './DeviceList.styles'

/** The UIDB devices matching the search, with loading, error and empty states. */
export const DeviceList = () => {
  const { data: devices, isPending, isError, refetch } = useGetDevicesData()
  const [query] = useSearchQuery()
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

  const matchingDevices = devices.filter((device) =>
    matchesSearch([device.name, device.lineName], deferredQuery),
  )

  if (matchingDevices.length === 0) {
    return <StatusMessage>No devices match “{deferredQuery}”.</StatusMessage>
  }

  return (
    <StyledDeviceList>
      <DeviceTable devices={matchingDevices} />
    </StyledDeviceList>
  )
}
