export type TextPart = {
  text: string
  /** Whether this part matches one of the search words. */
  isMatch: boolean
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Splits `text` into the parts that match a word of `query` (ignoring case) and the rest. */
export const splitByMatches = (text: string, query: string): Array<TextPart> => {
  const words = query.split(/\s+/).filter(Boolean).map(escapeRegExp)

  if (words.length === 0) {
    return [{ text, isMatch: false }]
  }

  // A capturing group keeps the matches in the result, at the odd indexes.
  return text
    .split(new RegExp(`(${words.join('|')})`, 'gi'))
    .map((part, index) => ({ text: part, isMatch: index % 2 === 1 }))
    .filter((part) => part.text !== '')
}
