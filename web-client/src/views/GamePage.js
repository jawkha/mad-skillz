/*
 GAME PAGE --> www.skillzone.com/:platform/:game
 * The user should be able to create an open challenge for a given platform game (bet amount debited from account)
 * The user should be able to see a list of all open challenges on the game page
 * The user should be able to accept a given open challenge (bet amount debited from account)
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  Jumbotron,
  Image,
  Content,
  CenterDisplay,
  CreateChallengeDiv,
  CurrentOpenChallengesDiv,
  CurrentOpenChallengesListItem,
  GamesInProgressDiv,
  GamesInProgressListItem
} from './../components/custom-styled-components/CustomStyledComponents'
import { firestore, auth } from '../firebase/firebase.config'
import { UserContext } from '../providers/UserProvider'
import { collectIdsAndDocs } from '../utils'

class GamePage extends Component {
  static contextType = UserContext
  state = {
    openChallenges: [],
    matchesInProgress: [],
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

  get matchesRef() {
    return firestore.collection(
      `platforms/${this.platform}/games/${this.gameId}/matches`
    )
  }

  // get openChallengesRef() {
  //   return firestore
  //     .collection(`platforms/${this.platform}/games/${this.gameId}/challenges`)
  //     .where('accepted', '==', false)
  // }

  unsubscribeFromGame = null
  unsubscribeFromChallenges = null
  unsubscribeFromMatches = null

  componentDidMount = async () => {
    this.unsubscribeFromGame = this.gameRef.onSnapshot(snapshot => {
      const game = collectIdsAndDocs(snapshot)
      this.setState({ game })
    })

    this.unsubscribeFromChallenges = this.challengesRef
      .where('accepted', '==', false)
      .onSnapshot(snapshot => {
        const openChallenges = snapshot.docs.map(collectIdsAndDocs)
        this.setState({ openChallenges })
      })

    this.unsubscribeFromMatches = this.matchesRef.onSnapshot(snapshot => {
      const matchesInProgress = snapshot.docs.map(collectIdsAndDocs)
      this.setState({ matchesInProgress })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromGame()
    this.unsubscribeFromChallenges()
    this.unsubscribeFromMatches()
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
      createdAt: new Date(),
      accepted: false
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

  acceptChallenge = async challenge => {
    const user = this.context
    console.log(`${typeof challenge} -- This should do 3 things:\n1: remove the challenge from the list of open challenges by setting the accepted attribute of the challenge to true, \n2: create a new match which has details about who created the challenge, who accepted it, their platform gamer IDs, the time challenge was created, the time challenge was accepted, etc. and \n
    3: add the match details to the card on Game Page which has details about the current matches in progress.`)
    await firestore
      .doc(
        `platforms/${this.platform}/games/${this.gameId}/challenges/${
          challenge.id
        }`
      )
      .update({ accepted: true })

    await firestore
      .collection(`platforms/${this.platform}/games/${this.gameId}/matches`)
      .doc(challenge.id)
      .set({
        platform: challenge.platform,
        game: challenge.game,
        betAmount: challenge.betAmount,
        challenger: challenge.user,
        accepter: user,
        completed: false,
        score: {
          challenger: null,
          accepter: null
        },
        winner: null,
        disputed: false
      })

    await console.log(
      'GamePage.js: called from Line 169',
      challenge.platform,
      challenge.game.slug,
      challenge.id
    )
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

  renderMatchesInProgress = () => {
    const { matchesInProgress } = this.state
    console.log({ matchesInProgress })
    return matchesInProgress.map(match => {
      return (
        <GamesInProgressListItem key={match.id}>
          <Link
            to={{
              pathname: `/${match.platform}/${match.game.slug}/matches/${
                match.id
              }`,
              state: { match }
            }}
          >
            {match.accepter.displayName} vs {match.challenger.displayName} for{' '}
            {match.betAmount}
          </Link>
        </GamesInProgressListItem>
      )
    })
  }

  render() {
    console.log('game page state', this.state)
    const coverImageUrl =
      'https://firebasestorage.googleapis.com/v0/b/mad-skillz-1839c.appspot.com/o/platforms%2Fmobile%2Fgames%2F8-ball-pool%2Fgame-assets%2Fcover-images%2F8ball-pool-cover.jpg?alt=media&token=21ba0d2a-8093-48e1-a874-a9ba39d087c5'
    return (
      <div>
        <Jumbotron>
          <Image src={coverImageUrl} alt="8 Ball Pool game banner" />
        </Jumbotron>
        <Content>
          <CenterDisplay>
            <CreateChallengeDiv>
              <h3>A container that allows you to create a challenge</h3>
              <p>
                If a user has previously provided information about their
                gamertag, it will also show up here. This form will have the
                following fields: Platform: , Game: , PlayerName: , Bet Amount:{' '}
              </p>
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
                Challenges created by the current user will have a cancel
                button. Others will have an accept button.
              </p>
              <ul>
                {this.state.openChallenges && this.renderOpenChallenges()}
              </ul>
            </CurrentOpenChallengesDiv>
            {/* <RecentGameResultsDiv>
              A container that displays the results of last few played games
            </RecentGameResultsDiv> */}
            <GamesInProgressDiv>
              <p>
                A container that displays the current number of games that are
                in progress
              </p>
              <ul>
                {this.state.matchesInProgress && this.renderMatchesInProgress()}
              </ul>
            </GamesInProgressDiv>
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
