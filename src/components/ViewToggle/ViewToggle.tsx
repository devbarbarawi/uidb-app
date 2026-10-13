import { Icon } from '../../design-system'
import { useViewParam } from '../../hooks'
import { StyledToggleButton, StyledViewToggle } from './ViewToggle.styles'

/** Switches the device list between the table and the grid of cards (`?view=grid`). */
export const ViewToggle = () => {
  const [view, setView] = useViewParam()

  return (
    <StyledViewToggle role="group" aria-label="Layout">
      <StyledToggleButton
        type="button"
        aria-label="List view"
        aria-pressed={view === 'list'}
        onClick={() => {
          setView('list')
        }}
      >
        <Icon name="listView" />
      </StyledToggleButton>
      <StyledToggleButton
        type="button"
        aria-label="Grid view"
        aria-pressed={view === 'grid'}
        onClick={() => {
          setView('grid')
        }}
      >
        <Icon name="gridView" />
      </StyledToggleButton>
    </StyledViewToggle>
  )
}
