import { render, screen, within } from '@testing-library/react'

import { DeviceTable } from './DeviceTable'

const devices = [
  { id: 'u6', name: 'U6 Lite', lineName: 'UniFi' },
  { id: 'lte', name: 'UniFi LTE', lineName: 'UniFi LTE' },
]

describe('DeviceTable', () => {
  test('Should label the table and its columns', () => {
    render(<DeviceTable devices={devices} />)

    const table = screen.getByRole('table', { name: 'Devices' })
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((cell) => cell.textContent),
    ).toEqual(['Product Line', 'Name'])
  })

  test('Should render a row per device', () => {
    render(<DeviceTable devices={devices} />)

    // One header row plus one row per device.
    expect(screen.getAllByRole('row')).toHaveLength(devices.length + 1)
  })
})
