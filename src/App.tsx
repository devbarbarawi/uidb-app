import { RouterProvider } from 'react-router/dom'
import { QueryClientProvider } from '@tanstack/react-query'

import { StyledGlobalStyles } from './design-system'
import { queryClient } from './queryClient'
import { router } from './router'

export const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Design tokens, fonts and base styles of the design system. */}
    <StyledGlobalStyles />

    <RouterProvider router={router} />
  </QueryClientProvider>
)
