import arrowLeft from '../../assets/icons/arrow-left.svg'
import arrowRight from '../../assets/icons/arrow-right.svg'
import logo from '../../assets/icons/logo.svg'

/**
 * This object contains all the icons used in the design system.
 * Each icon is imported from the assets/icons directory and can
 * be accessed using its key in the icons object.
 * The keys are of type IconName, which is a union of all the icon names.
 */
export const icons = {
  arrowLeft,
  arrowRight,
  logo,
} as const

export type IconName = keyof typeof icons
