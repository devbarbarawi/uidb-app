import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DevicePage } from './DevicePage'

const uidbResponse = {
  devices: [
    { id: 'u6', product: { name: 'U6 Lite' }, line: { name: 'UniFi' } },
    { id: 'udr', product: { name: 'Dream Router' }, line: { name: 'UniFi' } },
  ],
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

  test('Should show every field of the UIDB record as JSON', async () => {
    const devices = [{ ...uidbResponse.devices[0], sysid: 'a652' }]
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({ devices }))

    const { user } = renderDevicePage('/devices/u6')
    await user.click(await screen.findByRole('button', { name: 'See All Details as JSON' }))

    expect(screen.getByRole('region', { name: 'Device JSON' })).toHaveTextContent('"sysid": "a652"')
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

  test('Should step to the next and previous device', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

    const { router, user } = renderDevicePage('/devices/u6')
    await user.click(await screen.findByRole('link', { name: 'Next device' }))

    expect(router.state.location.pathname).toBe('/devices/udr')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Dream Router' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Next device' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Previous device' }))

    expect(router.state.location.pathname).toBe('/devices/u6')
  })

  test('Should keep the search when going back and step only through matching devices', async () => {
    const devices = [
      ...uidbResponse.devices,
      { id: 'udm', product: { name: 'Dream Machine' }, line: { name: 'UniFi' } },
    ]
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({ devices }))

    renderDevicePage('/devices/udr?q=dream')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Dream Router' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/?q=dream')
    // U6 Lite does not match "dream", so Dream Router is the first match: no previous device.
    expect(screen.queryByRole('link', { name: 'Previous device' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Next device' })).toHaveAttribute(
      'href',
      '/devices/udm?q=dream',
    )
  })
})
