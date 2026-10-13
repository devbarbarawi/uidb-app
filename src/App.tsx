import { QueryClientProvider } from '@tanstack/react-query'

import { AppHeader, DeviceList } from './components'
import { StyledGlobalStyles } from './design-system'
import { queryClient } from './queryClient'

export const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Design tokens, fonts and base styles of the design system. */}
    <StyledGlobalStyles />

    <AppHeader />
    <main>
      <h1>UIDB APP Explorer</h1>
      <DeviceList />
    </main>
  </QueryClientProvider>
)
