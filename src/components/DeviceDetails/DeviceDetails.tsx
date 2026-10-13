import { type Device, getDeviceImageUrl } from '../../api'
import {
  StyledDeviceDetails,
  StyledDeviceImage,
  StyledDeviceInfo,
  StyledDeviceLine,
  StyledDeviceName,
  StyledSpecs,
} from './DeviceDetails.styles'

export type DeviceDetailsProps = {
  device: Device
}

/** Twice the 260px image, for high-density screens. */
const IMAGE_WIDTH = 520

/** A device's image, name and details ("Device" page in the design). */
export const DeviceDetails = ({ device }: DeviceDetailsProps) => (
  <StyledDeviceDetails aria-labelledby="device-name">
    <StyledDeviceImage
      src={getDeviceImageUrl(device, IMAGE_WIDTH)}
      alt={device.name}
      loading="eager"
    />
    <StyledDeviceInfo>
      <div>
        <StyledDeviceName id="device-name">{device.name}</StyledDeviceName>
        <StyledDeviceLine>{device.lineName}</StyledDeviceLine>
      </div>
      <StyledSpecs>
        <dt>Product Line</dt>
        <dd>{device.lineName}</dd>
        <dt>ID</dt>
        <dd>{device.id}</dd>
        <dt>Name</dt>
        <dd>{device.name}</dd>
      </StyledSpecs>
    </StyledDeviceInfo>
  </StyledDeviceDetails>
)
