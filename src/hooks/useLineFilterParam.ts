import { useSearchParams } from 'react-router'

/** URL parameter holding a selected product line; repeated for several, e.g. `?line=UniFi`. */
export const LINE_PARAM = 'line'

/** The product lines selected in the filter, kept in the URL like the search and the layout. */
export const useLineFilterParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const lines = searchParams.getAll(LINE_PARAM)

  const setLines = (nextLines: ReadonlyArray<string>) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete(LINE_PARAM)

      for (const line of nextLines) {
        next.append(LINE_PARAM, line)
      }

      return next
    })
  }

  return [lines, setLines] as const
}
