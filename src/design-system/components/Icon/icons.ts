import arrowLeft from '../../assets/icons/arrow-left.svg'
import arrowRight from '../../assets/icons/arrow-right.svg'
import gridView from '../../assets/icons/grid-view.svg'
import listView from '../../assets/icons/list-view.svg'
import logo from '../../assets/icons/logo.svg'
import search from '../../assets/icons/search.svg'

/**
 * This object contains all the icons used in the design system.
 * Each icon is imported from the assets/icons directory and can
 * be accessed using its key in the icons object.
 * The keys are of type IconName, which is a union of all the icon names.
 */
export const icons = {
  arrowLeft,
  arrowRight,
  gridView,
  listView,
  logo,
  search,
} as const

export type IconName = keyof typeof icons
