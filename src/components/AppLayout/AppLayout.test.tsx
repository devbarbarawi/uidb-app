import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { AppLayout } from './AppLayout'

describe('AppLayout', () => {
  test('Should render the header and the main element', () => {
    renderWithProviders(<AppLayout />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
