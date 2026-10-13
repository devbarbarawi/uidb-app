import { StyledMatch } from './HighlightedText.styles'
import { splitByMatches } from './splitByMatches'

export type HighlightedTextProps = {
  text: string
  /** Words of the query are highlighted wherever they appear in `text`. */
  query: string
}

/** Text with the words of a search query highlighted. */
export const HighlightedText = ({ text, query }: HighlightedTextProps) =>
  splitByMatches(text, query).map((part, index) =>
    part.isMatch ? (
      // The parts never reorder, so their position is a stable key.
      <StyledMatch key={index}>{part.text}</StyledMatch>
    ) : (
      part.text
    ),
  )
