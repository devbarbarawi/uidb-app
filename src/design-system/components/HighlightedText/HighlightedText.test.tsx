import { render, screen } from '@testing-library/react'

import { HighlightedText } from './HighlightedText'

describe('HighlightedText', () => {
  test('Should mark the parts matching the query', () => {
    render(
      <p>
        <HighlightedText text="Dream Router" query="dream" />
      </p>,
    )

    expect(screen.getByRole('paragraph')).toHaveTextContent('Dream Router')
    expect(screen.getByRole('mark')).toHaveTextContent('Dream')
  })

  test('Should mark nothing for an empty query', () => {
    render(
      <p>
        <HighlightedText text="Dream Router" query="" />
      </p>,
    )

    expect(screen.queryByRole('mark')).not.toBeInTheDocument()
  })
})
