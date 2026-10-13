import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/** A fresh query cache that never retries, so every test starts clean and fails fast. */
export const createTestQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } })

/** Wrapper for `renderHook`: provides a fresh query cache. */
export const createQueryWrapper = () => {
  const queryClient = createTestQueryClient()

  const QueryWrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return QueryWrapper
}
