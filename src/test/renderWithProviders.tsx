import type { ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createTestQueryClient } from './createQueryWrapper'

type Options = {
  /** The URL the test starts at. */
  route?: string
  /** The route pattern `ui` is mounted on, e.g. `/devices/:deviceId`. */
  path?: string
}

/**
 * Renders `ui` like the app does: with a fresh query cache and an in-memory router, plus a
 * `user` to simulate clicks and typing. Navigating elsewhere renders nothing, so tests can
 * check `router.state.location`.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { route = '/', path = '/' }: Options = {},
) => {
  const queryClient = createTestQueryClient()
  const router = createMemoryRouter(
    [
      { path, element: ui },
      { path: '*', element: null },
    ],
    { initialEntries: [route] },
  )
  const user = userEvent.setup()

  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    ),
    queryClient,
    router,
    user,
  }
}
