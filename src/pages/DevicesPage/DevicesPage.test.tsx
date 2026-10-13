import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DevicesPage } from './DevicesPage'

describe('DevicesPage', () => {
  test('Should render the page and list the devices', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(Response.json({ devices: [{ id: 'u6', product: { name: 'U6 Lite' } }] }))

    renderWithProviders(<DevicesPage />)

    expect(screen.getByRole('heading', { level: 1, name: 'Devices' })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'U6 Lite' })).toBeInTheDocument()
    expect(document.title).toBe('Devices · UIDB')
  })
})
