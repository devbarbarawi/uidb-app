import {
  DeviceCount,
  DeviceList,
  DeviceSearch,
  ProductLineFilter,
  ViewToggle,
} from '../../components'
import {
  StyledToolbar,
  StyledToolbarEnd,
  StyledToolbarStart,
  StyledVisuallyHidden,
} from './DevicesPage.styles'

/** Home page: every UIDB device, with a search, a product line filter and a choice of layout. */
export const DevicesPage = () => (
  <>
    <title>Devices · UIDB</title>

    <StyledVisuallyHidden as="h1">Devices</StyledVisuallyHidden>

    <StyledToolbar>
      <StyledToolbarStart>
        <DeviceSearch />
        <DeviceCount />
      </StyledToolbarStart>

      <StyledToolbarEnd>
        <ViewToggle />
        <ProductLineFilter />
      </StyledToolbarEnd>
    </StyledToolbar>

    <DeviceList />
  </>
)
