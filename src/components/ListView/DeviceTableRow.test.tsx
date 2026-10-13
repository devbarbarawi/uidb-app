import { render, screen } from '@testing-library/react'

import type { Device } from '../../api'
import { DeviceTableRow } from './DeviceTableRow'

const renderRow = (device: Device) =>
  render(
    <table>
      <tbody>
        <DeviceTableRow device={device} />
      </tbody>
    </table>,
  )

describe('DeviceTableRow', () => {
  test('Should show the product line and the name in their own cells', () => {
    renderRow({ id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: 'abc123' })

    expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual([
      '',
      'UniFi',
      'U6 Lite',
    ])
  })

  test('Should show a decorative thumbnail from the image service', () => {
    renderRow({ id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: 'abc123' })

    // alt="" gives the image the `presentation` role: screen readers skip it.
    expect(screen.getByRole('presentation')).toHaveAttribute(
      'src',
      expect.stringContaining('https://images.svc.ui.com/'),
    )
  })

  test('Should show the placeholder when the device has no image', () => {
    renderRow({ id: 'lte', name: 'UniFi LTE', lineName: 'UniFi LTE', imageHash: undefined })

    expect(screen.getByRole('presentation')).toHaveAttribute('src', 'image-placeholder.png')
  })
})
