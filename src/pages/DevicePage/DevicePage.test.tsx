import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DevicePage } from './DevicePage'

const uidbResponse = {
  devices: [{ id: 'u6', product: { name: 'U6 Lite' }, line: { name: 'UniFi' } }],
}

const renderDevicePage = (route: string) =>
  renderWithProviders(<DevicePage />, { route, path: '/devices/:deviceId' })

describe('DevicePage', () => {
  test('Should show the device from the URL', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    renderDevicePage('/devices/u6')

    expect(await screen.findByRole('heading', { level: 1, name: 'U6 Lite' })).toBeInTheDocument()
    expect(document.title).toBe('U6 Lite · UIDB')
  })

  test('Should explain when no device has the id from the URL', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    renderDevicePage('/devices/unknown')

    // The loading message is also a status, so wait for the text itself.
    expect(await screen.findByText('No device with this ID exists.')).toHaveRole('status')
  })

  test('Should go back to the device list', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    const { router, user } = renderDevicePage('/devices/u6')
    await user.click(screen.getByRole('link', { name: 'Back' }))

    expect(router.state.location.pathname).toBe('/')
  })
})
