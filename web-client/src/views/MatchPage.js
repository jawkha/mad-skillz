/*
 MATCH PAGE --> www.skillzone.com/:platform/:game/:match
 * Upon accepting a challenge, the user should be taken to the Match Page where they can interact with the opponent
 * There should be a Countdown Timer on the Match Page to indicate the time within which the game should be completed.
 * The user should be able to post on the Match Page the result of the completed challenge.
 * There should be a verification mechanism in place in case of a dispute. This could include making a request to the platform API to fetch the match result data.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment, Rail, Image, Icon } from 'semantic-ui-react'

class MatchPage extends Component {
  render() {
    const { match } = this.props.location.state

    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Segment textAlign="center" padded="very">
            <Segment>
              <Icon name="winner" size="massive" color="yellow" />
              <h1>PKR {match.betAmount}</h1>
            </Segment>
            <Segment>
              <h1>IN PROGRESS</h1>
              <h1>0 - 0</h1>
            </Segment>
            <Rail position="left">
              <Segment>
                <Image src={match.challenger.photoURL} size="medium" circular />
                <h1>{match.challenger.displayName}</h1>
              </Segment>
            </Rail>

            <Rail position="right">
              <Segment>
                <Image src={match.accepter.photoURL} size="medium" circular />
                <h1>{match.accepter.displayName}</h1>
              </Segment>
            </Rail>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

MatchPage.propTypes = {
  location: {
    state: PropTypes.object.isRequired
  }
}

export default MatchPage
