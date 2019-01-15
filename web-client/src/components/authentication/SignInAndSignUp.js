import React, { Component } from 'react'

import SignIn from './SignIn'
import SignUp from './SignUp'

class SignInAndSignUp extends Component {
  state = {
    displayForm: 'signIn'
  }

  handleClick = e => {
    const { name } = e.target
    this.setState({ displayForm: name })
  }

  render() {
    return (
      <div>
        <button name="signIn" onClick={this.handleClick}>
          Sign In
        </button>
        <button name="signUp" onClick={this.handleClick}>
          Sign Up
        </button>
        {this.state.displayForm === 'signIn' && <SignIn />}
        {this.state.displayForm === 'signUp' && <SignUp />}
      </div>
    )
  }
}

export default SignInAndSignUp
