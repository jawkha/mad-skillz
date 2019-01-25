/*
 MATCH PAGE --> www.skillzone.com/:platform/:game/:match
 * Upon accepting a challenge, the user should be taken to the Match Page where they can interact with the opponent
 * There should be a Countdown Timer on the Match Page to indicate the time within which the game should be completed.
 * The user should be able to post on the Match Page the result of the completed challenge.
 * There should be a verification mechanism in place in case of a dispute. This could include making a request to the     platform API to fetch the match result data.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MatchPage extends Component {
  render() {
    const { match } = this.props.location.state

    return (
      <div>
        <h1>Match details to be displayed on this page</h1>
        <h2>
          {match.challenger.displayName} vs {match.accepter.displayName}
        </h2>
        <h2>Bet amount is {match.betAmount}</h2>
      </div>
    )
  }
}

MatchPage.propTypes = {
  location: {
    state: PropTypes.object.isRequired
  }
}

export default MatchPage
