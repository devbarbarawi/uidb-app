import type { ReactNode } from 'react'

import { StyledStatusMessage } from './StatusMessage.styles'

export type StatusMessageProps = {
  children: ReactNode
  tone?: 'info' | 'error'
}

/** A short message about the state of the page, e.g. loading or an error. */
export const StatusMessage = ({ children, tone = 'info' }: StatusMessageProps) => (
  <StyledStatusMessage role={tone === 'error' ? 'alert' : 'status'}>{children}</StyledStatusMessage>
)
