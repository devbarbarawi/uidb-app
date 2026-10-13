import { Link } from 'react-router'

import { StatusMessage } from '../../components'
import { paths } from '../../paths'

/** Shown for any URL that matches no page. */
export const NotFoundPage = () => (
  <>
    <title>Page not found · UIDB</title>
    <StatusMessage>
      This page does not exist. <Link to={paths.home}>Back to all devices</Link>
    </StatusMessage>
  </>
)
