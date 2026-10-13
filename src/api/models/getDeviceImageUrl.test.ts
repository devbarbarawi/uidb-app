import { getDeviceImageUrl } from './getDeviceImageUrl'

describe('getDeviceImageUrl', () => {
  test('Should build a resized image URL from the device id and image hash', () => {
    const url = new URL(getDeviceImageUrl({ id: 'u6', imageHash: 'abc123' }, 40) ?? '')

    expect(url.origin).toBe('https://images.svc.ui.com')
    expect(url.searchParams.get('u')).toBe(
      'https://static.ui.com/fingerprint/ui/images/u6/default/abc123.png',
    )
    expect(url.searchParams.get('w')).toBe('40')
  })

  test('Should return undefined when the device has no image', () => {
    expect(getDeviceImageUrl({ id: 'u6', imageHash: undefined }, 40)).toBeUndefined()
  })
})
