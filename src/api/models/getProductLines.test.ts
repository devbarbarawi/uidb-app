import { getProductLines } from './getProductLines'

describe('getProductLines', () => {
  test('Should list each product line once, alphabetically', () => {
    const devices = [
      { id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: undefined },
      { id: 'af', name: 'airFiber 24', lineName: 'AirFiber', imageHash: undefined },
      { id: 'udr', name: 'Dream Router', lineName: 'UniFi', imageHash: undefined },
    ]

    expect(getProductLines(devices)).toEqual(['AirFiber', 'UniFi'])
  })
})
