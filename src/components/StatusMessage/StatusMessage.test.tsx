import { render, screen } from '@testing-library/react'

import { StatusMessage } from './StatusMessage'

describe('StatusMessage', () => {
  test('Should be a polite status by default', () => {
    render(<StatusMessage>Loading devices…</StatusMessage>)

    expect(screen.getByRole('status')).toHaveTextContent('Loading devices…')
  })

  test('Should be an alert for errors', () => {
    render(<StatusMessage tone="error">Devices could not be loaded.</StatusMessage>)

    expect(screen.getByRole('alert')).toHaveTextContent('Devices could not be loaded.')
  })
})
