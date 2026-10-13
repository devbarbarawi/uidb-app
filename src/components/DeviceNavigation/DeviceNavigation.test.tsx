import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DeviceNavigation } from './DeviceNavigation'

describe('DeviceNavigation', () => {
  test('Should link back to the list and to the previous and next devices', () => {
    renderWithProviders(
      <DeviceNavigation backHref="/" previousHref="/devices/a" nextHref="/devices/c" />,
    )

    const navigation = screen.getByRole('navigation', { name: 'Device navigation' })
    expect(navigation).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Previous device' })).toHaveAttribute(
      'href',
      '/devices/a',
    )
    expect(screen.getByRole('link', { name: 'Next device' })).toHaveAttribute('href', '/devices/c')
  })

  test('Should offer no previous or next link at the ends of the list', () => {
    renderWithProviders(
      <DeviceNavigation backHref="/" previousHref={undefined} nextHref={undefined} />,
    )

    expect(screen.queryByRole('link', { name: 'Previous device' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Next device' })).not.toBeInTheDocument()
  })
})
