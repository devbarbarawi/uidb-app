import type { Device } from '../../api'
import { HighlightedText } from '../../design-system'
import { StyledSuggestion, StyledSuggestionHint } from './DeviceSearch.styles'

export type SearchSuggestionProps = {
  id: string
  device: Device
  /** Highlighted in the device name. */
  query: string
  /** Chosen with the arrow keys; Enter opens it. */
  isActive: boolean
  onSelect: (device: Device) => void
}

/** One suggested device in the search box's list. */
export const SearchSuggestion = ({
  id,
  device,
  query,
  isActive,
  onSelect,
}: SearchSuggestionProps) => (
  // The keyboard stays in the search field (combobox with aria-activedescendant), so options
  // only need mouse handlers.
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <StyledSuggestion
    id={id}
    role="option"
    // Read as "Dream Router, UniFi": the highlight markup would otherwise break up the name.
    aria-label={`${device.name}, ${device.lineName}`}
    aria-selected={isActive}
    $isActive={isActive}
    // Keeps the focus in the search field, so the list stays open until the click completes.
    onMouseDown={(event) => {
      event.preventDefault()
    }}
    onClick={() => {
      onSelect(device)
    }}
  >
    <span>
      <HighlightedText text={device.name} query={query} />
    </span>
    <StyledSuggestionHint>{device.lineName}</StyledSuggestionHint>
  </StyledSuggestion>
)
