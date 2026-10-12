import { render, screen } from '@testing-library/react'

import { Icon } from './Icon'

describe('Icon', () => {
  test('Should be hidden from assistive technology when it has no label', () => {
    render(<Icon name="logo" />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('Should expose its label as the accessible name', () => {
    render(<Icon name="logo" label="Ubiquiti" />)

    expect(screen.getByRole('img', { name: 'Ubiquiti' })).toBeInTheDocument()
  })

  test('Should mask the icon at the requested size in the current text colour', () => {
    render(<Icon name="logo" size={40} label="Ubiquiti" />)

    const icon = screen.getByRole('img', { name: 'Ubiquiti' })
    expect(icon).toHaveStyleRule('mask', 'url("logo.svg") center / contain no-repeat')
    expect(icon).toHaveStyleRule('width', '40px')
    expect(icon).toHaveStyleRule('background-color', 'currentColor')
  })
})
