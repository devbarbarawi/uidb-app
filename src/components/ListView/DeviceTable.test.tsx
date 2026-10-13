import { render, screen, within } from '@testing-library/react'

import { DeviceTable } from './DeviceTable'

const devices = [
  { id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: 'abc123' },
  { id: 'lte', name: 'UniFi LTE', lineName: 'UniFi LTE', imageHash: undefined },
]

describe('DeviceTable', () => {
  test('Should label the table and its columns', () => {
    render(<DeviceTable devices={devices} />)

    const table = screen.getByRole('table', { name: 'Devices' })
    const headers = within(table).getAllByRole('columnheader')
    expect(headers).toHaveLength(3)
    expect(headers[0]).toHaveAccessibleName('Image')
    expect(headers[1]).toHaveAccessibleName('Product Line')
    expect(headers[2]).toHaveAccessibleName('Name')
  })

  test('Should render a row per device', () => {
    render(<DeviceTable devices={devices} />)

    // One header row plus one row per device.
    expect(screen.getAllByRole('row')).toHaveLength(devices.length + 1)
  })
})
