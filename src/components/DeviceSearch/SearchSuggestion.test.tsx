import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SearchSuggestion } from './SearchSuggestion'

const device = { id: 'udr', name: 'Dream Router', lineName: 'UniFi', imageHash: undefined }

const renderSuggestion = (isActive = false, onSelect = jest.fn()) =>
  render(
    <ul role="listbox" aria-label="Suggestions">
      <SearchSuggestion
        id="option-0"
        device={device}
        query="dream"
        isActive={isActive}
        onSelect={onSelect}
      />
    </ul>,
  )

describe('SearchSuggestion', () => {
  test('Should show the name with the query highlighted, and the product line', () => {
    renderSuggestion()

    expect(screen.getByRole('option', { name: 'Dream Router, UniFi' })).toBeInTheDocument()
    expect(screen.getByRole('mark')).toHaveTextContent('Dream')
  })

  test('Should report whether it is the active option', () => {
    renderSuggestion(true)

    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
  })

  test('Should select the device when clicked', async () => {
    const onSelect = jest.fn()
    renderSuggestion(false, onSelect)

    await userEvent.click(screen.getByRole('option'))

    expect(onSelect).toHaveBeenCalledWith(device)
  })
})
