import { color, cssVariableDeclarations, cssVariableName, space, tokenValues } from './tokens'

describe('cssVariableName', () => {
  test.each([
    ['color', 'primary', '--uidb-color-primary'],
    ['color', 'primaryHover', '--uidb-color-primary-hover'],
    ['space', '16', '--uidb-space-16'],
  ])('Should name %s.%s as %s', (group, key, expected) => {
    const result = cssVariableName(group, key)

    expect(result).toBe(expected)
  })
})

describe('tokens', () => {
  test('Should declare every token value as a CSS custom property', () => {
    expect(cssVariableDeclarations).toContain('--uidb-color-primary: #006fff;')
    expect(cssVariableDeclarations).toContain(
      `--uidb-font-size-body: ${tokenValues.font.sizeBody};`,
    )
  })

  test('Should reference the CSS custom properties, not the raw values', () => {
    expect(color.primary).toBe('var(--uidb-color-primary)')
    expect(space[16]).toBe('var(--uidb-space-16)')
  })
})
