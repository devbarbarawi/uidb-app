import { render, screen } from '@testing-library/react'

import { AppHeader } from './AppHeader'

describe('AppHeader', () => {
  test('Should render the header with the app name and the author', () => {
    render(<AppHeader />)

    const header = screen.getByRole('banner')
    expect(header).toHaveTextContent('Devices')
    expect(header).toHaveTextContent('Sameh Albarbarawi')
  })

  test('Should link the logo to the home page', () => {
    render(<AppHeader />)

    expect(screen.getByRole('link', { name: 'Devices home' })).toHaveAttribute('href', '/')
  })
})
