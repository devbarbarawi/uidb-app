import { createBrowserRouter } from 'react-router'

import { AppLayout } from './components'
import { DevicePage, DevicesPage, NotFoundPage } from './pages'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <DevicesPage /> },
      { path: 'devices/:deviceId', element: <DevicePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
