import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { NotFoundPage } from './NotFoundPage'

describe('NotFoundPage', () => {
  test('Should explain the problem and link back to the devices', () => {
    renderWithProviders(<NotFoundPage />)

    expect(screen.getByRole('status')).toHaveTextContent('This page does not exist.')
    expect(screen.getByRole('link', { name: 'Back to all devices' })).toHaveAttribute('href', '/')
  })
})
