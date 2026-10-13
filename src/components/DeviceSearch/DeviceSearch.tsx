import { type KeyboardEvent, useId, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { type Device, searchDevices, useGetDevicesData } from '../../api'
import { Icon } from '../../design-system'
import { useSearchQuery } from '../../hooks'
import { paths } from '../../paths'
import {
  StyledDeviceSearch,
  StyledSearchField,
  StyledSearchIcon,
  StyledSuggestions,
} from './DeviceSearch.styles'
import { SearchSuggestion } from './SearchSuggestion'

const MAX_SUGGESTIONS = 8

/**
 * Search box above the device list; the text is kept in the URL (`?q=`). While typing, it
 * suggests matching devices to open directly (an ARIA combobox: arrow keys, Enter, Escape).
 */
export const DeviceSearch = () => {
  const [query, setQuery] = useSearchQuery()
  const { data: devices = [] } = useGetDevicesData()
  const { search } = useLocation()
  const navigate = useNavigate()
  const listboxId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const suggestions =
    query.trim() === '' ? [] : searchDevices(devices, query).slice(0, MAX_SUGGESTIONS)
  const isExpanded = isOpen && suggestions.length > 0
  const activeSuggestion = isExpanded ? suggestions[activeIndex] : undefined
  const optionId = (index: number) => `${listboxId}-${String(index)}`

  const close = () => {
    setIsOpen(false)
    setActiveIndex(-1)
  }

  const openDevice = (device: Device) => {
    close()
    void navigate(`${paths.device(device.id)}${search}`)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, -1))
    } else if (event.key === 'Enter' && activeSuggestion) {
      event.preventDefault()
      openDevice(activeSuggestion)
    } else if (event.key === 'Escape' && isExpanded) {
      // Close the list first; a second Escape clears the field, as browsers do by default.
      event.preventDefault()
      close()
    }
  }

  return (
    <StyledDeviceSearch role="search">
      <StyledSearchIcon>
        <Icon name="search" />
      </StyledSearchIcon>
      <StyledSearchField
        type="search"
        role="combobox"
        aria-label="Search devices"
        aria-autocomplete="list"
        aria-expanded={isExpanded}
        aria-controls={listboxId}
        aria-activedescendant={activeSuggestion ? optionId(activeIndex) : undefined}
        placeholder="Search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setIsOpen(true)
          setActiveIndex(-1)
        }}
        onKeyDown={handleKeyDown}
        onBlur={close}
      />
      {isExpanded ? (
        <StyledSuggestions id={listboxId} role="listbox" aria-label="Device suggestions">
          {suggestions.map((device, index) => (
            <SearchSuggestion
              key={device.id}
              id={optionId(index)}
              device={device}
              query={query}
              isActive={index === activeIndex}
              onSelect={openDevice}
            />
          ))}
        </StyledSuggestions>
      ) : null}
    </StyledDeviceSearch>
  )
}
