import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'

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
      <Container
        style={{ width: '50rem', margin: '5rem auto', padding: '2rem' }}
      >
        <Button.Group fluid attached="top" size="large">
          <Button primary name="signIn" onClick={this.handleClick}>
            SIGN IN
          </Button>
          <Button positive name="signUp" onClick={this.handleClick}>
            SIGN UP
          </Button>
        </Button.Group>
        {this.state.displayForm === 'signIn' && <SignIn />}
        {this.state.displayForm === 'signUp' && <SignUp />}
      </Container>
    )
  }
}

export default SignInAndSignUp
