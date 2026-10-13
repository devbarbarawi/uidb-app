import { render, screen } from '@testing-library/react'

import { DeviceTableRow } from './DeviceTableRow'

describe('DeviceTableRow', () => {
  test('Should show the product line and the name in their own cells', () => {
    render(
      <table>
        <tbody>
          <DeviceTableRow device={{ id: 'u6', name: 'U6 Lite', lineName: 'UniFi' }} />
        </tbody>
      </table>,
    )

    expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual([
      'UniFi',
      'U6 Lite',
    ])
  })
})
