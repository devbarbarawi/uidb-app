import { render, screen } from '@testing-library/react'

import { App } from './App'

beforeEach(() => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({ devices: [] }))
})

describe('App', () => {
  test('Should render the header, the main element and the devices page', () => {
    render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Devices' })).toBeInTheDocument()
  })
})
