/*
 GAME PAGE --> www.skillzone.com/:platform/:game
 * The user should be able to create an open challenge for a given platform game (bet amount debited from account)
 * The user should be able to see a list of all open challenges on the game page
 * The user should be able to accept a given open challenge (bet amount debited from account)
 */

import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { firestore, auth } from '../firebase/firebase.config'
import { UserContext } from '../providers/UserProvider'
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

const CurrentOpenChallengesListItem = styled.li`
  width: 60rem;
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
  static contextType = UserContext
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
    const user = this.context
    console.log('game page user', user)
    const { betAmount, game } = this.state
    const platform = this.platform
    const { uid, displayName, firstName, lastName, email, photoURL } = user

    const challenge = {
      platform,
      game,
      betAmount,
      user: {
        uid,
        displayName,
        firstName,
        lastName,
        email,
        photoURL
      },
      createdAt: new Date()
    }

    this.challengesRef.add(challenge)
    this.setState({ betAmount: 0 })
  }

  deleteChallenge = challenge => {
    return firestore
      .doc(
        `platforms/${this.platform}/games/${this.gameId}/challenges/${
          challenge.id
        }`
      )
      .delete()
  }

  acceptChallenge = challenge => {
    console.log(`${typeof challenge} -- This should do 3 things:\n1: remove the challenge from the list of open challenges, \n2: create a new match which has details about who created the challenge, who accepted it, their platform gamer IDs, the time challenge was created, the time challenge was accepted, etc. and \n
    3: add the match details to the card on Game Page which has details about the current matches in progress.`)
  }

  renderOpenChallenges = () => {
    const { openChallenges } = this.state
    return openChallenges.map(challenge => {
      return (
        <CurrentOpenChallengesListItem key={challenge.id}>
          {auth.currentUser && auth.currentUser.uid === challenge.user.uid ? (
            <div>
              You have created an open challenge for PKR {challenge.betAmount}
              <button onClick={() => this.deleteChallenge(challenge)}>
                CANCEL CHALLENGE
              </button>
            </div>
          ) : (
            <div>
              {challenge.user.displayName} challenges you to PKR{' '}
              {challenge.betAmount}
              <button onClick={() => this.acceptChallenge(challenge)}>
                ACCEPT CHALLENGE
              </button>
            </div>
          )}
        </CurrentOpenChallengesListItem>
      )
    })
  }

  render() {
    console.log('game page state', this.state)
    const coverImageUrl =
      'https://firebasestorage.googleapis.com/v0/b/mad-skillz-1839c.appspot.com/o/platforms%2Fmobile%2Fgames%2F8-ball-pool%2Fgame-assets%2Fcard-images%2F8Ball-Pool.jpg?alt=media&token=9759e23e-0f80-4568-bc94-3a6580882a57'
    return (
      <div>
        <Jumbotron>
          <Image src={coverImageUrl} alt="8 Ball Pool game banner" />
        </Jumbotron>
        <Content>
          <CenterDisplay>
            <CreateChallengeDiv>
              <h3>A container that allows you to create a challenge</h3>
              {auth.currentUser !== null ? (
                <form onSubmit={this.createChallenge}>
                  <input
                    onChange={this.handleBetInput}
                    type="number"
                    min="100"
                    step="100"
                    max="10000"
                    value={this.state.betAmount}
                    placeholder="Input the bet amount here"
                  />
                  <input type="submit" />
                </form>
              ) : (
                <p>
                  Please <Link to="/login">sign in</Link> to create a challenge.
                </p>
              )}
            </CreateChallengeDiv>
            <CurrentOpenChallengesDiv>
              <h3>A container that displays the current open challenges</h3>
              <p>
                Challenges created by the current user will have the a cancel
                button. Others will have an accept button
              </p>
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
