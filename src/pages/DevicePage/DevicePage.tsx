import { useParams } from 'react-router'

import { useGetDevicesData } from '../../api'
import { DeviceDetails, StatusMessage } from '../../components'
import { Icon } from '../../design-system'
import { paths } from '../../paths'
import { StyledBackLink } from './DevicePage.styles'

/** One device, found by the `deviceId` in the URL. */
export const DevicePage = () => {
  const { deviceId } = useParams()
  const { data: devices, isPending, isError, refetch } = useGetDevicesData()
  const device = devices?.find((candidate) => candidate.id === deviceId)

  return (
    <>
      <title>{`${device?.name ?? 'Device'} · UIDB`}</title>
      <nav aria-label="Device navigation">
        <StyledBackLink to={paths.home}>
          <Icon name="arrowLeft" />
          Back
        </StyledBackLink>
      </nav>
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
