import { DeviceList, DeviceSearch, ProductLineFilter, ViewToggle } from '../../components'
import { StyledToolbar, StyledToolbarEnd, StyledVisuallyHidden } from './DevicesPage.styles'

/** Home page: every UIDB device, with a search, a product line filter and a choice of layout. */
export const DevicesPage = () => (
  <>
    <title>Devices · UIDB</title>

    <StyledVisuallyHidden as="h1">Devices</StyledVisuallyHidden>

    <StyledToolbar>
      <DeviceSearch />
      <StyledToolbarEnd>
        <ViewToggle />
        <ProductLineFilter />
      </StyledToolbarEnd>
    </StyledToolbar>

    <DeviceList />
  </>
)
