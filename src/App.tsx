import { AppHeader } from './components'
import { StyledGlobalStyles } from './design-system'

export const App = () => (
  <>
    {/* Design tokens, fonts and base styles of the design system. */}
    <StyledGlobalStyles />

    <AppHeader />
    <main>
      <h1>UIDB APP Explorer</h1>
    </main>
  </>
)
