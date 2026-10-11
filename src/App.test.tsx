import { render, screen } from '@testing-library/react'

import { App } from './App'

describe('App', () => {
  test('Should render the main element', () => {
    render(<App />)

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  test('Should title the page with a level-one heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'UIDB APP Explorer' })).toBeInTheDocument()
  })
})
