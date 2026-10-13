import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DeviceJson } from './DeviceJson'

const data = { id: 'udr', product: { name: 'Dream Router' } }

describe('DeviceJson', () => {
  test('Should hide the JSON at first', () => {
    render(<DeviceJson data={data} />)

    expect(screen.getByRole('button', { name: 'See All Details as JSON' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.queryByRole('region', { name: 'Device JSON' })).not.toBeInTheDocument()
  })

  test('Should reveal the formatted record', async () => {
    const user = userEvent.setup()
    render(<DeviceJson data={data} />)

    await user.click(screen.getByRole('button', { name: 'See All Details as JSON' }))

    expect(screen.getByRole('region', { name: 'Device JSON' })).toHaveTextContent(
      '"name": "Dream Router"',
    )
    expect(screen.getByRole('button', { name: 'Hide JSON Details' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  test('Should hide the JSON again', async () => {
    const user = userEvent.setup()
    render(<DeviceJson data={data} />)

    await user.click(screen.getByRole('button', { name: 'See All Details as JSON' }))
    await user.click(screen.getByRole('button', { name: 'Hide JSON Details' }))

    expect(screen.queryByRole('region', { name: 'Device JSON' })).not.toBeInTheDocument()
  })
})
