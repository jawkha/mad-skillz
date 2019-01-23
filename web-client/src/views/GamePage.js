/*
 GAME PAGE --> www.skillzone.com/:platform/:game
 * The user should be able to create an open challenge for a given platform game (bet amount debited from account)
 * The user should be able to see a list of all open challenges on the game page
 * The user should be able to accept a given open challenge (bet amount debited from account)
 */

import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { firestore, auth } from '../firebase/firebase.config'
import { collectIdsAndDocs } from '../utils'

const Jumbotron = styled.div`
  width: 100vw;
  height: 10rem;
`

const Image = styled.img`
  height: 10rem;
`
const Content = styled.div`
  display: flex;
`

const CenterDisplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28rem;
`

const CreateChallengeDiv = styled.div`
  width: 70rem;
  height: 10rem;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`

const CurrentOpenChallengesDiv = styled.div`
  width: 70rem;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`

// const RecentGameResultsDiv = styled.div`
//   width: 70rem;
//   margin: 2rem auto;
//   padding: 3rem;
//   box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
// `

// const GamesInProgressDiv = styled.div`
//   width: 70rem;
//   margin: 2rem auto;
//   padding: 3rem;
//   box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
// `

// const ChatWindow = styled.div`
//   width: 20rem;
//   margin: 3rem;
//   box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
// `

class GamePage extends Component {
  state = {
    openChallenges: [],
    betAmount: 0
  }

  get platform() {
    return this.props.match.params.platform
  }

  get gameId() {
    return this.props.location.state.game.id
  }

  get gameRef() {
    return firestore.doc(`platforms/${this.platform}/games/${this.gameId}`)
  }

  get challengesRef() {
    return firestore.collection(
      `platforms/${this.platform}/games/${this.gameId}/challenges`
    )
  }

  unsubscribeFromGame = null
  unsubscribeFromChallenges = null

  componentDidMount = async () => {
    this.unsubscribeFromGame = this.gameRef.onSnapshot(snapshot => {
      const game = collectIdsAndDocs(snapshot)
      this.setState({ game })
    })

    this.unsubscribeFromChallenges = this.challengesRef.onSnapshot(snapshot => {
      const openChallenges = snapshot.docs.map(collectIdsAndDocs)
      this.setState({ openChallenges })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromGame()
    this.unsubscribeFromChallenges()
  }

  handleBetInput = event => {
    const betAmount = event.target.value
    this.setState({ betAmount })
  }

  createChallenge = event => {
    event.preventDefault()
    const { betAmount } = this.state
    const { uid, displayName, email, photoURL } = auth.currentUser

    const challenge = {
      betAmount,
      user: {
        uid,
        displayName,
        email,
        photoURL
      },
      createdAt: new Date()
    }

    this.challengesRef.add(challenge)
    this.setState({ betAmount: 0 })
  }

  renderOpenChallenges = () => {
    const { openChallenges } = this.state
    return openChallenges.map(challenge => {
      return (
        <li key={challenge.id}>{`${
          challenge.user.displayName
        } challenges you to ${challenge.betAmount}`}</li>
      )
    })
  }

  render() {
    console.log('game page state', this.state)
    return (
      <div>
        <Jumbotron>
          <Image
            src="../static/images/game_page/fortnite-cover.jpg"
            alt="Fortnite game banner"
          />
        </Jumbotron>
        <Content>
          <CenterDisplay>
            <CreateChallengeDiv>
              <h3>A container that allows you to create a challenge</h3>
              <form onSubmit={this.createChallenge}>
                <input
                  onChange={this.handleBetInput}
                  type="number"
                  min="1000"
                  step="100"
                  max="10000"
                  value={this.state.betAmount}
                  placeholder="Input the bet amount here"
                />
                <input type="submit" />
              </form>
            </CreateChallengeDiv>
            <CurrentOpenChallengesDiv>
              <h3>A container that displays the current open challenges</h3>
              <ul>
                {this.state.openChallenges && this.renderOpenChallenges()}
              </ul>
            </CurrentOpenChallengesDiv>
            {/* <RecentGameResultsDiv>
              A container that displays the results of last few played games
            </RecentGameResultsDiv>
            <GamesInProgressDiv>
              A container that displays the current number of games that are in
              progress
            </GamesInProgressDiv> */}
          </CenterDisplay>
          {/* <ChatWindow>List of gamers in the Game Room</ChatWindow> */}
        </Content>
      </div>
    )
  }
}

GamePage.propTypes = {
  location: {
    state: PropTypes.object.isRequired
  },
  match: {
    params: {
      platform: PropTypes.string.isRequired,
      game: PropTypes.string.isRequired
    }
  }
}

export default GamePage
