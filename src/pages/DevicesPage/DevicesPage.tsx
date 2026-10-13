import { DeviceList, DeviceSearch } from '../../components'
import { StyledToolbar } from './DevicesPage.styles'

/** Home page: every UIDB device, with a search to narrow them down. */
export const DevicesPage = () => (
  <>
    <title>Devices · UIDB</title>

    <h1>UIDB APP Explorer</h1>

    <StyledToolbar>
      <DeviceSearch />
    </StyledToolbar>

    <DeviceList />
  </>
)
