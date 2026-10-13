import { useLocation } from 'react-router'

import { useGetDevicesData } from '../../api'
import { useViewParam, useVisibleDevices } from '../../hooks'
import { DeviceGrid } from '../GridView'
import { DeviceTable } from '../ListView'
import { StatusMessage } from '../StatusMessage'
import { StyledDeviceList } from './DeviceList.styles'

/**
 * The UIDB devices matching the search and product line filter, as a table or a grid
 * (`?view=grid`), with loading, error and empty states.
 */
export const DeviceList = () => {
  const { isPending, isError, refetch } = useGetDevicesData()
  const visibleDevices = useVisibleDevices()
  const [view] = useViewParam()
  // The device links carry the list's URL parameters, so the device page keeps the search and
  // filters.
  const { search } = useLocation()

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

  if (!visibleDevices?.length) {
    return <StatusMessage>No devices match your search and filters.</StatusMessage>
  }

  return (
    <StyledDeviceList>
      {view === 'grid' ? (
        <DeviceGrid devices={visibleDevices} search={search} />
      ) : (
        <DeviceTable devices={visibleDevices} search={search} />
      )}
    </StyledDeviceList>
  )
}
