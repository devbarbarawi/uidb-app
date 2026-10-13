import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { AppHeader } from './AppHeader'

describe('AppHeader', () => {
  test('Should render the header with the app name and the author', () => {
    renderWithProviders(<AppHeader />)

    const header = screen.getByRole('banner')
    expect(header).toHaveTextContent('Devices')
    expect(header).toHaveTextContent('Sameh Albarbarawi')
  })

  test('Should link the logo to the home page', () => {
    renderWithProviders(<AppHeader />)

    expect(screen.getByRole('link', { name: 'Devices home' })).toHaveAttribute('href', '/')
  })
})
