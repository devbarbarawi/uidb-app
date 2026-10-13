import { QueryClient } from '@tanstack/react-query'

/** Cache of server data shared by the whole app. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Try a failed request twice more before showing the error.
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
