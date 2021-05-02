import React from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'

const LinkWithState = ({ children, state, ...rest }) => (
  <Location>
    {({ location }) => (
      //make sure user's state is not overwritten
      <Link
        {...rest}
        state={{ prevUrl: location.href, currentUrl: location.href, ...state }}
      >
        {children}
      </Link>
    )}
  </Location>
)

export { LinkWithState as Link }
NavLink.propTypes = {
  // bla: PropTypes.string,
}

NavLink.defaultProps = {
  // bla: 'test',
}

export default LinkWithState
