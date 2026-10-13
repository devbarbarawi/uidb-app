import { screen } from '@testing-library/react'

import { renderWithQueryClient } from '../../test'
import { DeviceList } from './DeviceList'

const uidbResponse = {
  devices: [{ id: 'u6', product: { name: 'U6 Lite' }, line: { name: 'UniFi' } }],
}

describe('DeviceList', () => {
  test('Should show a loading message while the devices load', () => {
    jest.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => undefined))

    renderWithQueryClient(<DeviceList />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading devices…')
  })

  test('Should list the devices once loaded', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    renderWithQueryClient(<DeviceList />)

    expect(await screen.findByRole('cell', { name: 'U6 Lite' })).toBeInTheDocument()
  })

  test('Should explain a failure and load again on demand', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(Response.json(uidbResponse))

    const { user } = renderWithQueryClient(<DeviceList />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Devices could not be loaded.')
    await user.click(screen.getByRole('button', { name: 'Try again' }))

    expect(await screen.findByRole('cell', { name: 'U6 Lite' })).toBeInTheDocument()
  })
})
