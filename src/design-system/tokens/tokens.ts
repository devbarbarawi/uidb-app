/**
 * UIDB design tokens, transcribed from the Figma style guide.
 *
 * `tokenValues` is the single source of truth. `<StyledGlobalStyles>` publishes it as CSS custom
 * properties (`--uidb-color-primary`), and `tokens` holds typed references to those properties
 * (`var(--uidb-color-primary)`), so styles stay themeable at runtime.
 */
export const tokenValues = {
  color: {
    primary: '#006fff',
    primaryHover: '#0059cc',
    danger: '#f03a3e',
    textStrong: 'rgb(0 0 0 / 85%)',
    textDefault: 'rgb(0 0 0 / 65%)',
    textMuted: 'rgb(0 0 0 / 45%)',
    textDisabled: '#bdbdbd',
    surface: '#ffffff',
    surfaceSubtle: '#f9fafa',
    surfaceHover: '#f4f5f6',
    input: '#f6f6f8',
    border: '#ededf0',
    icon: '#838691',
    neutral02: '#f4f5f6',
    neutral10: '#50565e',
    text3: '#808893',
  },
  font: {
    family: "'UI Sans', 'Lato', system-ui, -apple-system, 'Segoe UI', sans-serif",
    weightRegular: '400',
    weightBold: '700',
    sizeCaption: '12px',
    lineHeightCaption: '16px',
    sizeBody: '14px',
    lineHeightBody: '20px',
    sizeHeading: '20px',
    lineHeightHeading: '28px',
  },
  space: {
    4: '4px',
    8: '8px',
    16: '16px',
    32: '32px',
  },
  radius: {
    s: '4px',
    m: '8px',
  },
  border: {
    width: '1px',
  },
  duration: {
    fast: '120ms',
  },
} as const

type TokenValues = typeof tokenValues
type TokenGroup = keyof TokenValues
type TokenReferences = {
  readonly [Group in TokenGroup]: { readonly [Key in keyof TokenValues[Group]]: string }
}

const toKebabCase = (name: string) => name.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase()

/** CSS custom property of a token, e.g. `--uidb-color-primary-hover`. */
export const cssVariableName = (group: string, key: string) =>
  `--uidb-${toKebabCase(group)}-${toKebabCase(key)}`

const groups = Object.entries(tokenValues) as Array<[TokenGroup, Record<string, string>]>

/** `:root` declarations of every token, injected by `<StyledGlobalStyles>`. */
export const cssVariableDeclarations = groups
  .flatMap(([group, values]) =>
    Object.entries(values).map(([key, value]) => `${cssVariableName(group, key)}: ${value};`),
  )
  .join('\n')

/** Typed `var(--uidb-…)` references, for use in styled-components. */
export const tokens = Object.fromEntries(
  groups.map(([group, values]) => [
    group,
    Object.fromEntries(
      Object.keys(values).map((key) => [key, `var(${cssVariableName(group, key)})`]),
    ),
  ]),
) as TokenReferences

export const { border, color, duration, font, radius, space } = tokens
