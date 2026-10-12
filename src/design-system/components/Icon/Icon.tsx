import { StyledIcon } from './Icon.styles'
import { type IconName, icons } from './icons'

export type IconProps = {
  name: IconName
  /** Width and height in pixels. */
  size?: number
  /** Accessible name. Omit it for decorative icons, e.g. next to visible text. */
  label?: string
}

/** Monochrome icon in the current text colour. */
export const Icon = ({ name, size = 20, label }: IconProps) => (
  <StyledIcon
    role="img"
    aria-label={label}
    aria-hidden={label ? undefined : true}
    $url={icons[name]}
    $size={size}
  />
)
