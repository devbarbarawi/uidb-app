import { fireEvent, render, screen } from '@testing-library/react'

import { Image } from './Image'

describe('Image', () => {
  test('Should show the image with its alternative text', () => {
    render(<Image src="/u6.png" alt="U6 Lite" />)

    expect(screen.getByRole('img', { name: 'U6 Lite' })).toHaveAttribute('src', '/u6.png')
  })

  test('Should show the placeholder when there is no source', () => {
    render(<Image src={undefined} alt="U6 Lite" />)

    expect(screen.getByRole('img', { name: 'U6 Lite' })).toHaveAttribute(
      'src',
      'image-placeholder.png',
    )
  })

  test('Should switch to the placeholder when the image fails to load', () => {
    render(<Image src="/missing.png" alt="U6 Lite" />)
    const image = screen.getByRole('img', { name: 'U6 Lite' })

    fireEvent.error(image)

    expect(image).toHaveAttribute('src', 'image-placeholder.png')
  })
})
