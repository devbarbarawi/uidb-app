import { screen, within } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DeviceList } from './DeviceList'

const uidbResponse = {
  devices: [
    { id: 'u6', product: { name: 'U6 Lite' }, line: { name: 'UniFi' } },
    { id: 'lte', product: { name: 'U-LTE' }, line: { name: 'UniFi LTE' } },
  ],
}

describe('DeviceList', () => {
  test('Should show a loading message while the devices load', () => {
    jest.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => undefined))

    renderWithProviders(<DeviceList />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading devices…')
  })

  test('Should list the devices once loaded', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    renderWithProviders(<DeviceList />)

    expect(await screen.findByRole('link', { name: 'U6 Lite' })).toBeInTheDocument()
  })

  test('Should explain a failure and load again on demand', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(Response.json(uidbResponse))

    const { user } = renderWithProviders(<DeviceList />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Devices could not be loaded.')
    await user.click(screen.getByRole('button', { name: 'Try again' }))

    expect(await screen.findByRole('link', { name: 'U6 Lite' })).toBeInTheDocument()
  })

  test('Should list only the devices matching the search in the URL', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    renderWithProviders(<DeviceList />, { route: '/?q=lte' })

    expect(await screen.findByRole('link', { name: 'U-LTE' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'U6 Lite' })).not.toBeInTheDocument()
  })

  test('Should say so when no device matches the search', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    renderWithProviders(<DeviceList />, { route: '/?q=toaster' })

    expect(await screen.findByText('No devices match “toaster”.')).toHaveRole('status')
  })

  test('Should show the devices as a grid of cards when the URL asks for it', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    renderWithProviders(<DeviceList />, { route: '/?view=grid' })

    const grid = await screen.findByRole('list', { name: 'Devices' })
    expect(within(grid).getAllByRole('link')).toHaveLength(uidbResponse.devices.length)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
