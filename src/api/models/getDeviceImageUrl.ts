import { isNullOrUndefined } from '../../utils'
import type { Device } from './device'

const IMAGE_SERVICE_URL = 'https://images.svc.ui.com/'
const IMAGE_SOURCE_URL = 'https://static.ui.com/fingerprint/ui/images'

/**
 * URL of a device's default image, resized by the UI image service to `width` pixels.
 * Ask for twice the displayed size so the image stays sharp on high-density screens.
 * `undefined` when UIDB has no image for the device.
 */
export const getDeviceImageUrl = (
  device: Pick<Device, 'id' | 'imageHash'>,
  width: number,
): string | undefined => {
  if (isNullOrUndefined(device.imageHash)) {
    return undefined
  }

  const source = `${IMAGE_SOURCE_URL}/${encodeURIComponent(device.id)}/default/${encodeURIComponent(device.imageHash)}.png`
  const params = new URLSearchParams({ u: source, w: String(width), q: '75' })

  return `${IMAGE_SERVICE_URL}?${params.toString()}`
}
