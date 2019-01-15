import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { auth, createUserProfileDocument } from '../firebase/firebase.config'

export const UserContext = createContext()

class UserProvider extends Component {
  state = {
    user: null
  }

  unsubscribeFromAuth = null

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth)
      // console.log({ user })
      this.setState({ user })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth()
  }

  render() {
    const { user } = this.state
    const { children } = this.props
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
  }
}
// Prop types below were added to silence ESLint warnings
UserProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default UserProvider
