import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { DeviceSearch } from './DeviceSearch'

describe('DeviceSearch', () => {
  test('Should be a labelled search field inside a search landmark', () => {
    renderWithProviders(<DeviceSearch />)

    expect(screen.getByRole('search')).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: 'Search devices' })).toBeInTheDocument()
  })

  test('Should show the search from the URL', () => {
    renderWithProviders(<DeviceSearch />, { route: '/?q=dream' })

    expect(screen.getByRole('searchbox')).toHaveValue('dream')
  })

  test('Should keep the search in the URL without adding history entries', async () => {
    const { router, user } = renderWithProviders(<DeviceSearch />)

    await user.type(screen.getByRole('searchbox'), 'u6')

    expect(router.state.location.search).toBe('?q=u6')
    expect(router.state.historyAction).toBe('REPLACE')
  })

  test('Should remove the parameter when the search is cleared', async () => {
    const { router, user } = renderWithProviders(<DeviceSearch />, { route: '/?q=u6' })

    await user.clear(screen.getByRole('searchbox'))

    expect(router.state.location.search).toBe('')
  })
})
