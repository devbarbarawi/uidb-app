import { Icon } from '../../design-system'
import { paths } from '../../paths'
import { StyledAppHeader, StyledAppHeaderStart, StyledHomeLink } from './AppHeader.styles'

/** Top bar of every page: the logo linking home, the app name and the author. */
export const AppHeader = () => (
  <StyledAppHeader>
    <StyledAppHeaderStart>
      <StyledHomeLink to={paths.home} aria-label="Devices home">
        <Icon name="logo" size={40} />
      </StyledHomeLink>
      <p>Devices</p>
    </StyledAppHeaderStart>
    <p>Sameh Albarbarawi</p>
  </StyledAppHeader>
)
