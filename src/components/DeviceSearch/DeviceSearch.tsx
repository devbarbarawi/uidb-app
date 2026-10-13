import { Icon } from '../../design-system'
import { useSearchQuery } from '../../hooks'
import { StyledDeviceSearch, StyledSearchField, StyledSearchIcon } from './DeviceSearch.styles'

/** Search box above the device list; the text is kept in the URL (`?q=`). */
export const DeviceSearch = () => {
  const [query, setQuery] = useSearchQuery()

  return (
    <StyledDeviceSearch role="search">
      <StyledSearchIcon>
        <Icon name="search" />
      </StyledSearchIcon>
      <StyledSearchField
        type="search"
        aria-label="Search devices"
        placeholder="Search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
        }}
      />
    </StyledDeviceSearch>
  )
}
