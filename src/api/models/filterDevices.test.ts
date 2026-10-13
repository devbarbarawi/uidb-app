import { filterDevices } from './filterDevices'

const devices = [
  { id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: undefined },
  { id: 'lte', name: 'U-LTE', lineName: 'UniFi LTE', imageHash: undefined },
  { id: 'af', name: 'airFiber 24', lineName: 'AirFiber', imageHash: undefined },
]

const ids = (query: string, lines: ReadonlyArray<string>) =>
  filterDevices(devices, { query, lines }).map((device) => device.id)

describe('filterDevices', () => {
  test('Should keep every device without a search or selected lines', () => {
    expect(ids('', [])).toEqual(['u6', 'lte', 'af'])
  })

  test('Should keep the devices of the selected product lines', () => {
    expect(ids('', ['UniFi', 'AirFiber'])).toEqual(['u6', 'af'])
  })

  test('Should combine the search with the selected product lines', () => {
    expect(ids('u', ['UniFi LTE'])).toEqual(['lte'])
  })
})
