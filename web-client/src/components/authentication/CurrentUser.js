import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Segment, Image, Container, Button } from 'semantic-ui-react'

import { signOut } from '../../firebase/firebase.config'
import { UserContext } from '../../providers/UserProvider'

import moment from 'moment'

const CurrentUser = ({ children }) => {
  const user = useContext(UserContext)
  const { displayName, email, photoURL, createdAt } = user
  return (
    <Container style={{ margin: '0 auto', width: '50rem' }}>
      <Segment>
        {photoURL && (
          <Image
            src={photoURL}
            alt={displayName}
            size="medium"
            circular
            centered
          />
        )}

        <Link to="/me">
          <h2>{displayName}</h2>
        </Link>
        <p>{email}</p>
        <p>{moment(createdAt.toDate()).calendar()}</p>
      </Segment>

      <div>{children}</div>
      <Button negative onClick={signOut} size="large">
        SIGN OUT
      </Button>
    </Container>
  )
}
// Prop types below were added to silence ESLint warnings
CurrentUser.propTypes = {
  children: PropTypes.node.isRequired
}

export default CurrentUser
