import { render, screen } from '@testing-library/react'

import { App } from './App'

beforeEach(() => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({ devices: [] }))
})

describe('App', () => {
  test('Should render the main element', () => {
    render(<App />)

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  test('Should title the page with a level-one heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'UIDB APP Explorer' })).toBeInTheDocument()
  })

  test('Should render the header', () => {
    render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
