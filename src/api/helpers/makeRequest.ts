export type RequestOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>
}

/**
 * The app's single way to call a server, so shared defaults (like the JSON `Accept` header)
 * live in one place. Resolves with the `Response`; callers check `response.ok`.
 */
export const makeRequest = (url: string, { headers, ...options }: RequestOptions = {}) =>
  fetch(url, { ...options, headers: { Accept: 'application/json', ...headers } })
