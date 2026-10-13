import { useParams } from 'react-router'

import { useGetDevicesData } from '../../api'
import { DeviceDetails, DeviceNavigation, StatusMessage } from '../../components'
import { paths } from '../../paths'
import { getAdjacentItems } from '../../utils'

/** One device, found by the `deviceId` in the URL, with links to the devices around it. */
export const DevicePage = () => {
  const { deviceId } = useParams()
  const { data: devices = [], isPending, isError, refetch } = useGetDevicesData()
  const device = devices.find((candidate) => candidate.id === deviceId)
  const { previous, next } = getAdjacentItems(devices, deviceId)

  return (
    <>
      <title>{`${device?.name ?? 'Device'} · UIDB`}</title>
      <DeviceNavigation
        backHref={paths.home}
        previousHref={previous && paths.device(previous.id)}
        nextHref={next && paths.device(next.id)}
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
