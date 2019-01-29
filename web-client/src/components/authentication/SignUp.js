import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import { auth, createUserProfileDocument } from '../../firebase/firebase.config'

class SignUp extends Component {
  state = {
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { displayName, firstName, lastName, email, password } = this.state
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      createUserProfileDocument(user, { displayName, firstName, lastName })
    } catch (error) {
      // console.error('file: SignUp.jsx', 'Error creating a new user', error)
    }

    this.setState({
      displayName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
  }

  render() {
    const { displayName, firstName, lastName, email, password } = this.state

    return (
      <Form onSubmit={this.handleSubmit} size="large">
        <Form.Input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={displayName}
          onChange={this.handleChange}
        />
        <Form.Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={this.handleChange}
        />
        <Form.Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={this.handleChange}
        />
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
        <Form.Button type="submit" positive size="large">
          SIGN UP
        </Form.Button>
      </Form>
    )
  }
}

export default SignUp
