import { toDevice, toDevices } from './toDevices'

describe('toDevice', () => {
  test('Should read the id, product name and product line', () => {
    const record = { id: 'u6', product: { name: 'U6 Lite' }, line: { name: 'UniFi' } }

    expect(toDevice(record)).toEqual({ id: 'u6', name: 'U6 Lite', lineName: 'UniFi' })
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
