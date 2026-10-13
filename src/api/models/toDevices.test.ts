import { toDevice, toDeviceRecord, toDevices } from './toDevices'

describe('toDevice', () => {
  test('Should read the id, product name, product line and image hash', () => {
    const record = {
      id: 'u6',
      product: { name: 'U6 Lite' },
      line: { name: 'UniFi' },
      images: { default: 'abc123' },
    }

    expect(toDevice(record)).toEqual({
      id: 'u6',
      name: 'U6 Lite',
      lineName: 'UniFi',
      imageHash: 'abc123',
    })
  })

  test('Should fall back to readable defaults for missing fields', () => {
    expect(toDevice({ id: 'u6' })).toEqual({
      id: 'u6',
      name: 'Unnamed device',
      lineName: 'Unknown',
    })
  })

  test.each([[null], ['u6'], [{ product: { name: 'U6 Lite' } }], [{ id: '  ' }]])(
    'Should skip a record without a usable id: %p',
    (record) => {
      expect(toDevice(record)).toBeUndefined()
    },
  )
})

describe('toDevices', () => {
  test('Should keep the valid devices of a UIDB response', () => {
    const payload = { devices: [{ id: 'u6' }, { name: 'no id' }, { id: 'udr' }] }

    expect(toDevices(payload).map((device) => device.id)).toEqual(['u6', 'udr'])
  })

  test('Should reject a response without a devices list', () => {
    expect(() => toDevices({ items: [] })).toThrow('UIDB returned data in an unexpected format.')
  })
})

describe('toDeviceRecord', () => {
  const record = { id: 'u6', product: { name: 'U6 Lite' }, sysid: 'a652' }

  test('Should return the whole record with the id, untouched', () => {
    expect(toDeviceRecord({ devices: [{ id: 'udr' }, record] }, 'u6')).toBe(record)
  })

  test.each([
    [{ devices: [{ id: 'udr' }] }, 'u6'],
    [{ items: [record] }, 'u6'],
    [{ devices: [record] }, undefined],
  ])('Should return undefined when there is no such record: %p, %p', (response, id) => {
    expect(toDeviceRecord(response, id)).toBeUndefined()
  })
})
