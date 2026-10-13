import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../test'
import { ProductLineFilter } from './ProductLineFilter'

const uidbResponse = {
  devices: [
    { id: 'u6', product: { name: 'U6 Lite' }, line: { name: 'UniFi' } },
    { id: 'lte', product: { name: 'U-LTE' }, line: { name: 'UniFi LTE' } },
    { id: 'af', product: { name: 'airFiber 24' }, line: { name: 'AirFiber' } },
  ],
}

const renderFilter = (route = '/') => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(uidbResponse))

  return renderWithProviders(<ProductLineFilter />, { route })
}

describe('ProductLineFilter', () => {
  test('Should open a list of every product line from the button', async () => {
    const { user } = renderFilter()

    const button = screen.getByRole('button', { name: 'Filter' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('group', { name: 'Product line' })).toBeInTheDocument()
    expect(await screen.findAllByRole('checkbox')).toHaveLength(3)
    expect(screen.getByRole('checkbox', { name: 'AirFiber' })).not.toBeChecked()
  })

  test('Should keep the checked product lines in the URL', async () => {
    const { router, user } = renderFilter('/?q=u')

    await user.click(screen.getByRole('button', { name: 'Filter' }))
    await user.click(await screen.findByRole('checkbox', { name: 'UniFi LTE' }))

    expect(router.state.location.search).toBe('?q=u&line=UniFi+LTE')
    expect(screen.getByRole('button', { name: 'Filter, 1 selected' })).toBeInTheDocument()
  })

  test('Should show the selection from the URL and reset it', async () => {
    const { router, user } = renderFilter('/?line=UniFi&line=AirFiber')

    await user.click(screen.getByRole('button', { name: 'Filter, 2 selected' }))

    expect(await screen.findByRole('checkbox', { name: 'UniFi' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'AirFiber' })).toBeChecked()

    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(router.state.location.search).toBe('')
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled()
  })

  test('Should close with Escape and give the focus back to the button', async () => {
    const { user } = renderFilter()

    await user.click(screen.getByRole('button', { name: 'Filter' }))
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('group', { name: 'Product line' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveFocus()
  })
})
