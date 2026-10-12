import logo from '../../assets/icons/logo.svg'

/**
 * This object contains all the icons used in the design system.
 * Each icon is imported from the assets/icons directory and can
 * be accessed using its key in the icons object.
 * The keys are of type IconName, which is a union of all the icon names.
 */
export const icons = {
  logo,
} as const

export type IconName = keyof typeof icons
