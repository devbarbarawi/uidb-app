import { render, screen } from '@testing-library/react'

import { DeviceDetails } from './DeviceDetails'

const device = { id: 'u6', name: 'U6 Lite', lineName: 'UniFi', imageHash: 'abc123' }

describe('DeviceDetails', () => {
  test('Should title the article with the device name', () => {
    render(<DeviceDetails device={device} />)

    expect(screen.getByRole('heading', { level: 1, name: 'U6 Lite' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'U6 Lite' })).toBeInTheDocument()
  })

  test('Should show the device image, described by the device name', () => {
    render(<DeviceDetails device={device} />)

    expect(screen.getByRole('img', { name: 'U6 Lite' })).toHaveAttribute(
      'src',
      expect.stringContaining('w=520'),
    )
  })

  test('Should list the product line, id and name', () => {
    render(<DeviceDetails device={device} />)

    expect(screen.getAllByRole('term').map((term) => term.textContent)).toEqual([
      'Product Line',
      'ID',
      'Name',
    ])
    expect(screen.getAllByRole('definition').map((value) => value.textContent)).toEqual([
      'UniFi',
      'u6',
      'U6 Lite',
    ])
  })
})
