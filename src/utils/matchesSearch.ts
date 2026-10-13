/**
 * Whether `texts` match a search `query`: every word of the query must appear in one of the
 * texts, ignoring case. An empty query matches everything.
 */
export const matchesSearch = (texts: ReadonlyArray<string>, query: string): boolean => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const haystack = texts.join(' ').toLowerCase()

  return words.every((word) => haystack.includes(word))
}
