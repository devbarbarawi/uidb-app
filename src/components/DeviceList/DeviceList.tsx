import { useGetDevicesData } from '../../api'
import { DeviceTable } from '../ListView'
import { StatusMessage } from '../StatusMessage'
import { StyledDeviceList } from './DeviceList.styles'

/** Every UIDB device, with loading and error states. */
export const DeviceList = () => {
  const { data: devices, isPending, isError, refetch } = useGetDevicesData()

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

  return (
    <StyledDeviceList>
      <DeviceTable devices={devices} />
    </StyledDeviceList>
  )
}
