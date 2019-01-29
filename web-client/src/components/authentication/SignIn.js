import React, { Component } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

import {
  signInWithGoogle,
  signInWithEmailAndPassword
} from '../../firebase/firebase.config'

class SignIn extends Component {
  state = { email: '', password: '' }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { email, password } = this.state
    signInWithEmailAndPassword(email, password).catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      // ...
    })
    this.setState({ email: '', password: '' })
  }

  render() {
    const { email, password } = this.state

    return (
      <Form onSubmit={this.handleSubmit} size="large">
        <Form.Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <Form.Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <Form.Button type="submit" primary size="large">
          SIGN IN
        </Form.Button>
        <Button color="google plus" onClick={signInWithGoogle} size="large">
          <Icon name="google" />
          SIGN IN WITH GOOGLE
        </Button>
      </Form>
    )
  }
}

export default SignIn
