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
