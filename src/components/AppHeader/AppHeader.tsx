import { Icon } from '../../design-system'
import { StyledAppHeader, StyledAppHeaderStart, StyledHomeLink } from './AppHeader.styles'

/** Top bar of every page: the logo linking home, the app name and the author. */
export const AppHeader = () => (
  <StyledAppHeader>
    <StyledAppHeaderStart>
      <StyledHomeLink href="/" aria-label="Devices home">
        <Icon name="logo" size={40} />
      </StyledHomeLink>
      <p>Devices</p>
    </StyledAppHeaderStart>
    <p>Sameh Albarbarawi</p>
  </StyledAppHeader>
)
