/*
 USER PROFILE PAGE www.skillzone.com/users/:user
 * The user can update information about their Profile such as contact details, display name, profile or cover pictures, etc.
 * The profile page should show a summary of all the games the user has played and their winnings/losses
 * Other users can also visit another profile page where a subset of the information will be displayed and they won't be able to edit anything.
 */

import React, { Component } from 'react'
import { Segment, Form, Image, Header, Container } from 'semantic-ui-react'

import { auth, firestore, storage } from '../firebase/firebase.config'
import { UserContext } from '../providers/UserProvider'

class UserProfile extends Component {
  static contextType = UserContext
  state = {
    displayName: ''
  }
  imageInput = null

  get uid() {
    return auth.currentUser.uid
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`)
  }

  get file() {
    return this.imageInput && this.imageInput.files[0]
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { displayName } = this.state
    if (displayName) {
      this.userRef.update({ displayName })
    }
    if (this.file) {
      storage
        .ref()
        .child('user-profiles')
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => this.userRef.update({ photoURL }))
    }
  }
  render() {
    const { displayName } = this.state
    const user = this.context
    const square = { width: 175, height: 175 }
    return (
      <Container style={{ margin: '0 auto', width: '70rem' }}>
        <div>
          <Segment>
            {user && user.photoURL ? (
              <Image src={user.photoURL} size="medium" circular />
            ) : (
              <Segment circular style={square}>
                <Header as="h2">.</Header>
              </Segment>
            )}
          </Segment>

          <Form onSubmit={this.handleSubmit} size="large">
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First name"
                placeholder={user.firstName}
                readOnly
              />
              <Form.Input
                fluid
                label="Last name"
                placeholder={user.lastName}
                readOnly
              />
            </Form.Group>
            <Form.Input
              type="text"
              name="email"
              placeholder={user.email}
              readOnly
            />
            <Form.Input
              type="text"
              name="displayName"
              value={displayName}
              onChange={this.handleChange}
              placeholder="Display Name"
            />
            <Form.Input
              type="file"
              // icon="file image outline"
              accept="image/png, image/jpeg"
              multiple="false"
              ref={ref => (this.imageInput = ref)}
            />
            <Form.Button positive type="submit">
              UPDATE
            </Form.Button>
          </Form>
        </div>
      </Container>
    )
  }
}

export default UserProfile
