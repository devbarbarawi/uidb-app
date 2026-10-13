import { useLocation, useParams } from 'react-router'

import { searchDevices, useGetDevicesData } from '../../api'
import { DeviceDetails, DeviceNavigation, StatusMessage } from '../../components'
import { useSearchQuery } from '../../hooks'
import { paths } from '../../paths'
import { getAdjacentItems } from '../../utils'

/**
 * One device, found by the `deviceId` in the URL. Back returns to the list with the same search,
 * and previous/next step through the devices matching that search.
 */
export const DevicePage = () => {
  const { deviceId } = useParams()
  const { search } = useLocation()
  const [query] = useSearchQuery()
  const { data: devices = [], isPending, isError, refetch } = useGetDevicesData()
  const device = devices.find((candidate) => candidate.id === deviceId)
  const { previous, next } = getAdjacentItems(searchDevices(devices, query), deviceId)

  return (
    <>
      <title>{`${device?.name ?? 'Device'} · UIDB`}</title>
      <DeviceNavigation
        backHref={`${paths.home}${search}`}
        previousHref={previous && `${paths.device(previous.id)}${search}`}
        nextHref={next && `${paths.device(next.id)}${search}`}
      />
      {isPending ? (
        <StatusMessage>Loading device…</StatusMessage>
      ) : isError ? (
        <StatusMessage tone="error">
          The device could not be loaded.{' '}
          <button type="button" onClick={() => void refetch()}>
            Try again
          </button>
        </StatusMessage>
      ) : device ? (
        <DeviceDetails device={device} />
      ) : (
        <StatusMessage>No device with this ID exists.</StatusMessage>
      )}
    </>
  )
}
