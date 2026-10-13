/** URLs of the app's pages, so links and routes never drift apart. */
export const paths = {
  home: '/',
  device: (deviceId: string) => `/devices/${encodeURIComponent(deviceId)}`,
} as const
