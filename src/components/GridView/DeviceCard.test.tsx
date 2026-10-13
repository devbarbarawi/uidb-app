import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DeviceCard } from './DeviceCard'

const device = { id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: 'abc123' }

describe('DeviceCard', () => {
  test('Should link to the device page, keeping the list state', () => {
    renderWithProviders(<DeviceCard device={device} search="?q=lite&view=grid" />)

    expect(screen.getByRole('link', { name: 'U6 Lite UniFi' })).toHaveAttribute(
      'href',
      '/devices/u6?q=lite&view=grid',
    )
  })

  test('Should show a decorative product image', () => {
    renderWithProviders(<DeviceCard device={device} search="" />)

    expect(screen.getByRole('presentation')).toHaveAttribute(
      'src',
      expect.stringContaining('w=440'),
    )
  })
})
