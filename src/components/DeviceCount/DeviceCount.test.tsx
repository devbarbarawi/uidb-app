import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DeviceCount } from './DeviceCount'

const uidbResponse = {
  devices: [
    { id: 'udr', product: { name: 'Dream Router' }, line: { name: 'UniFi' } },
    { id: 'udm', product: { name: 'Dream Machine' }, line: { name: 'UniFi' } },
    { id: 'lte', product: { name: 'U-LTE' }, line: { name: 'UniFi LTE' } },
  ],
}

const renderCount = (route = '/') => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

  return renderWithProviders(<DeviceCount />, { route })
}

describe('DeviceCount', () => {
  test('Should count every device without a search or filter', async () => {
    renderCount()

    expect(await screen.findByRole('status')).toHaveTextContent('3 Devices')
  })

  test('Should count only the devices matching the search', async () => {
    renderCount('/?q=dream')

    expect(await screen.findByRole('status')).toHaveTextContent('2 Devices')
  })

  test('Should count only the selected product lines, in the singular for one', async () => {
    renderCount('/?line=UniFi+LTE')

    expect(await screen.findByRole('status')).toHaveTextContent('1 Device')
  })

  test('Should show nothing while the devices load', () => {
    jest.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => undefined))

    renderWithProviders(<DeviceCount />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
