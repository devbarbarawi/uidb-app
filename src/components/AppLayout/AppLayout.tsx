import { Outlet } from 'react-router'

import { AppHeader } from '../AppHeader'

export const AppLayout = () => (
  <>
    <AppHeader />

    <main>
      <Outlet />
    </main>
  </>
)
