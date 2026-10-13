import { useId, useState } from 'react'

import { StyledDeviceJson, StyledJson, StyledJsonToggle } from './DeviceJson.styles'

export type DeviceJsonProps = {
  /** The untouched UIDB record. */
  data: unknown
}

/** A disclosure revealing the complete UIDB record, including fields the UI does not use. */
export const DeviceJson = ({ data }: DeviceJsonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const jsonId = useId()

  return (
    <StyledDeviceJson>
      <StyledJsonToggle
        type="button"
        aria-expanded={isOpen}
        aria-controls={jsonId}
        onClick={() => {
          setIsOpen((open) => !open)
        }}
      >
        {isOpen ? 'Hide JSON Details' : 'See All Details as JSON'}
      </StyledJsonToggle>
      <StyledJson id={jsonId} hidden={!isOpen} role="region" aria-label="Device JSON">
        <code>{JSON.stringify(data, null, 2)}</code>
      </StyledJson>
    </StyledDeviceJson>
  )
}
