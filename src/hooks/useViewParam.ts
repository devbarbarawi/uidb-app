import { useSearchParams } from 'react-router'

/** URL parameter holding the layout of the device list, e.g. `/?view=grid`. */
export const VIEW_PARAM = 'view'

export type DeviceView = 'list' | 'grid'

/**
 * The layout of the device list, kept in the URL like the search. The table (`list`) is the
 * default and leaves no parameter, so plain URLs stay short.
 */
export const useViewParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const view: DeviceView = searchParams.get(VIEW_PARAM) === 'grid' ? 'grid' : 'list'

  const setView = (nextView: DeviceView) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)

      if (nextView === 'list') {
        next.delete(VIEW_PARAM)
      } else {
        next.set(VIEW_PARAM, nextView)
      }

      return next
    })
  }

  return [view, setView] as const
}
