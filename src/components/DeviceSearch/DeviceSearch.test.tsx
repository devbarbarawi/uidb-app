import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DeviceSearch } from './DeviceSearch'

const uidbResponse = {
  devices: [
    { id: 'udr', product: { name: 'Dream Router' }, line: { name: 'UniFi' } },
    { id: 'udm', product: { name: 'Dream Machine' }, line: { name: 'UniFi' } },
    { id: 'u6', product: { name: 'U6 Lite' }, line: { name: 'UniFi' } },
  ],
}

const renderSearch = (route = '/') => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

  return renderWithProviders(<DeviceSearch />, { route })
}

describe('DeviceSearch', () => {
  test('Should be a labelled search field inside a search landmark', () => {
    renderSearch()

    expect(screen.getByRole('search')).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Search devices' })).toBeInTheDocument()
  })

  test('Should show the search from the URL', () => {
    renderSearch('/?q=dream')

    expect(screen.getByRole('combobox')).toHaveValue('dream')
  })

  test('Should keep the search in the URL without adding history entries', async () => {
    const { router, user } = renderSearch()

    await user.type(screen.getByRole('combobox'), 'u6')

    expect(router.state.location.search).toBe('?q=u6')
    expect(router.state.historyAction).toBe('REPLACE')
  })

  test('Should remove the parameter when the search is cleared', async () => {
    const { router, user } = renderSearch('/?q=u6')

    await user.clear(screen.getByRole('combobox'))

    expect(router.state.location.search).toBe('')
  })

  test('Should suggest the matching devices while typing', async () => {
    const { user } = renderSearch()

    await user.type(screen.getByRole('combobox'), 'dream')

    const listbox = await screen.findByRole('listbox', { name: 'Device suggestions' })
    expect(listbox).toBeInTheDocument()
    expect(
      screen.getAllByRole('option').map((option) => option.getAttribute('aria-label')),
    ).toEqual(['Dream Router, UniFi', 'Dream Machine, UniFi'])
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
  })

  test('Should open the device chosen with the keyboard, keeping the search', async () => {
    const { router, user } = renderSearch()

    await user.type(screen.getByRole('combobox'), 'dream')
    await screen.findByRole('listbox')
    await user.keyboard('{ArrowDown}{ArrowDown}')

    expect(screen.getByRole('option', { name: 'Dream Machine, UniFi' })).toHaveAttribute(
      'aria-selected',
      'true',
    )

    await user.keyboard('{Enter}')

    expect(router.state.location.pathname).toBe('/devices/udm')
    expect(router.state.location.search).toBe('?q=dream')
  })

  test('Should open the device chosen with the mouse', async () => {
    const { router, user } = renderSearch()

    await user.type(screen.getByRole('combobox'), 'lite')
    await user.click(await screen.findByRole('option', { name: 'U6 Lite, UniFi' }))

    expect(router.state.location.pathname).toBe('/devices/u6')
  })

  test('Should close the suggestions with Escape', async () => {
    const { user } = renderSearch()

    await user.type(screen.getByRole('combobox'), 'dream')
    await screen.findByRole('listbox')
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveValue('dream')
  })
})
