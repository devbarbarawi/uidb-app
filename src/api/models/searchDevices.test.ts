import { searchDevices } from './searchDevices'

const devices = [
  { id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: undefined },
  { id: 'lte', name: 'U-LTE', lineName: 'UniFi LTE', imageHash: undefined },
]

describe('searchDevices', () => {
  test('Should keep the devices matching the name or the product line', () => {
    expect(searchDevices(devices, 'lite').map((device) => device.id)).toEqual(['u6'])
    expect(searchDevices(devices, 'lte').map((device) => device.id)).toEqual(['lte'])
  })

  test('Should keep every device when the search is empty', () => {
    expect(searchDevices(devices, '')).toEqual(devices)
  })
})
