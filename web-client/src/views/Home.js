/*
 HOME PAGE www.skillzone.com
 * The user should be able to see all the games available for a given platform
 * The user should be able to visit a game page on clicking the game card on home page
*/

import React, { Component } from 'react'

import HomeBanner from '../components/HomeBanner'
import PlatformSelection from '../components/PlatformSelection'

class Home extends Component {
  state = {}
  render() {
    return (
      <div>
        <HomeBanner />
        <PlatformSelection />
      </div>
    )
  }
}

export default Home
