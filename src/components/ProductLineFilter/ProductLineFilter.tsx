import { useEffect, useId, useRef, useState } from 'react'

import { getProductLines, useGetDevicesData } from '../../api'
import { useLineFilterParam } from '../../hooks'
import {
  StyledCount,
  StyledFilterButton,
  StyledLines,
  StyledPanel,
  StyledProductLineFilter,
  StyledResetButton,
} from './ProductLineFilter.styles'

/**
 * "Filter" button opening a list of product lines to check. The selection is kept in the URL
 * (`?line=…`); Escape or a click outside closes the list.
 */
export const ProductLineFilter = () => {
  const { data: devices = [] } = useGetDevicesData()
  const [lines, setLines] = useLineFilterParam()
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // While open, close on Escape (returning focus to the button) or on a click outside.
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  const toggleLine = (line: string, isChecked: boolean) => {
    setLines(isChecked ? [...lines, line] : lines.filter((selected) => selected !== line))
  }

  return (
    <StyledProductLineFilter ref={containerRef}>
      <StyledFilterButton
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={lines.length > 0 ? `Filter, ${String(lines.length)} selected` : undefined}
        onClick={() => {
          setIsOpen((open) => !open)
        }}
      >
        Filter
        {lines.length > 0 ? <StyledCount aria-hidden="true">{lines.length}</StyledCount> : null}
      </StyledFilterButton>
      {isOpen ? (
        <StyledPanel id={panelId}>
          <StyledLines>
            <legend>Product line</legend>
            {getProductLines(devices).map((line) => (
              <label key={line}>
                <input
                  type="checkbox"
                  checked={lines.includes(line)}
                  onChange={(event) => {
                    toggleLine(line, event.target.checked)
                  }}
                />
                {line}
              </label>
            ))}
          </StyledLines>
          <StyledResetButton
            type="button"
            disabled={lines.length === 0}
            onClick={() => {
              setLines([])
            }}
          >
            Reset
          </StyledResetButton>
        </StyledPanel>
      ) : null}
    </StyledProductLineFilter>
  )
}
