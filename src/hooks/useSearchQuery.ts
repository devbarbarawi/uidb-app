import { useSearchParams } from 'react-router'

/** URL parameter holding the search text, e.g. `/?q=dream`. */
export const SEARCH_PARAM = 'q'

/**
 * The search text, kept in the URL so a search can be reloaded.
 * Typing replaces the current history entry instead of adding one per keystroke.
 */
export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get(SEARCH_PARAM) ?? ''

  const setQuery = (nextQuery: string) => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current)

        if (nextQuery === '') {
          next.delete(SEARCH_PARAM)
        } else {
          next.set(SEARCH_PARAM, nextQuery)
        }

        return next
      },
      { replace: true },
    )
  }

  return [query, setQuery] as const
}
