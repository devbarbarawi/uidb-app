import type { ReactElement } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createTestQueryClient } from './createQueryWrapper'

/** Renders `ui` with a fresh query cache, plus a `user` to simulate clicks and typing. */
export const renderWithQueryClient = (ui: ReactElement) => {
  const queryClient = createTestQueryClient()
  const user = userEvent.setup()

  return {
    ...render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>),
    queryClient,
    user,
  }
}
