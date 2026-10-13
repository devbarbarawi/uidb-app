import { useVisibleDevices } from '../../hooks'
import { StyledDeviceCount } from './DeviceCount.styles'

const countFormat = new Intl.NumberFormat('en-US')

/**
 * How many devices match the search and filters, e.g. "698 Devices". Screen readers announce
 * the new total when it changes. Nothing is shown while the devices load.
 */
export const DeviceCount = () => {
  const visibleDevices = useVisibleDevices()

  if (!visibleDevices) {
    return null
  }

  const { length } = visibleDevices

  return (
    <StyledDeviceCount>
      {countFormat.format(length)} {length === 1 ? 'Device' : 'Devices'}
    </StyledDeviceCount>
  )
}
