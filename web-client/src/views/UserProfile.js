/*
 USER PROFILE PAGE www.skillzone.com/users/:user
 * The user can update information about their Profile such as contact details, display name, profile or cover pictures, etc.
 * The profile page should show a summary of all the games the user has played and their winnings/losses
 * Other users can also visit another profile page where a subset of the information will be displayed and they won't be able to edit anything.
 */

import React, { Component } from 'react'
import { auth, firestore, storage } from '../firebase/firebase.config'

class UserProfile extends Component {
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
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            placeholder="Display Name"
          />
          <input type="file" ref={ref => (this.imageInput = ref)} />
          <input type="submit" value="Update" />
        </form>
      </section>
    )
  }
}

export default UserProfile
