import { Icon } from '../../design-system'
import { isNullOrUndefined } from '../../utils'
import {
  StyledBackLink,
  StyledDeviceNavigation,
  StyledPager,
  StyledPagerEnd,
  StyledPagerLink,
} from './DeviceNavigation.styles'

export type DeviceNavigationProps = {
  backHref: string
  /** `undefined` on the first device. */
  previousHref: string | undefined
  /** `undefined` on the last device. */
  nextHref: string | undefined
}

/** Back to the list, and the previous and next device. */
export const DeviceNavigation = ({ backHref, previousHref, nextHref }: DeviceNavigationProps) => (
  <StyledDeviceNavigation aria-label="Device navigation">
    <StyledBackLink to={backHref}>
      <Icon name="arrowLeft" />
      Back
    </StyledBackLink>

    <StyledPager>
      {isNullOrUndefined(previousHref) ? (
        <StyledPagerEnd aria-hidden="true">
          <Icon name="arrowLeft" />
        </StyledPagerEnd>
      ) : (
        <StyledPagerLink to={previousHref} aria-label="Previous device">
          <Icon name="arrowLeft" />
        </StyledPagerLink>
      )}

      {isNullOrUndefined(nextHref) ? (
        <StyledPagerEnd aria-hidden="true">
          <Icon name="arrowRight" />
        </StyledPagerEnd>
      ) : (
        <StyledPagerLink to={nextHref} aria-label="Next device">
          <Icon name="arrowRight" />
        </StyledPagerLink>
      )}
    </StyledPager>
  </StyledDeviceNavigation>
)
