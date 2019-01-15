import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { signOut } from '../../firebase/firebase.config'
import { UserContext } from '../../providers/UserProvider'

import moment from 'moment'

const CurrentUser = ({ children }) => {
  const user = useContext(UserContext)
  const { displayName, email, photoURL, createdAt } = user
  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="CurrentUser--information">
          <Link to="/profile">
            <h2>{displayName}</h2>
          </Link>
          <p className="email">{email}</p>
          <p className="created-at">{moment(createdAt.toDate()).calendar()}</p>
        </div>
      </div>
      <div>
        <div>{children}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  )
}
// Prop types below were added to silence ESLint warnings
CurrentUser.propTypes = {
  children: PropTypes.node.isRequired
}

export default CurrentUser
