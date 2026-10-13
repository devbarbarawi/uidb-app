import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { ViewToggle } from './ViewToggle'

describe('ViewToggle', () => {
  test('Should show the list view as pressed by default', () => {
    renderWithProviders(<ViewToggle />)

    expect(screen.getByRole('group', { name: 'Layout' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'List view' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Grid view' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  test('Should switch to the grid through the URL, keeping the search', async () => {
    const { router, user } = renderWithProviders(<ViewToggle />, { route: '/?q=dream' })

    await user.click(screen.getByRole('button', { name: 'Grid view' }))

    expect(router.state.location.search).toBe('?q=dream&view=grid')
    expect(screen.getByRole('button', { name: 'Grid view' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  test('Should go back to the list by removing the parameter', async () => {
    const { router, user } = renderWithProviders(<ViewToggle />, { route: '/?view=grid' })

    await user.click(screen.getByRole('button', { name: 'List view' }))

    expect(router.state.location.search).toBe('')
  })
})
