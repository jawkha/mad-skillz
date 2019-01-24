import React, { Component } from 'react'
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
      <form onSubmit={this.handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={displayName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
    )
  }
}

export default SignUp
