import { screen, within } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DeviceGrid } from './DeviceGrid'

const devices = [
  { id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: undefined },
  { id: 'lte', name: 'U-LTE', lineName: 'UniFi LTE', imageHash: undefined },
]

describe('DeviceGrid', () => {
  test('Should list a card per device', () => {
    renderWithProviders(<DeviceGrid devices={devices} search="" />)

    const list = screen.getByRole('list', { name: 'Devices' })
    expect(within(list).getAllByRole('listitem')).toHaveLength(devices.length)
    expect(within(list).getAllByRole('link')).toHaveLength(devices.length)
  })
})
