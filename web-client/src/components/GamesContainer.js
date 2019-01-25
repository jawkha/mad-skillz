import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { firestore } from '../firebase/firebase.config'
import { collectIdsAndDocs } from '../utils'

const CardGroup = styled.div`
  display: flex;
  margin: 0.5rem;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 20rem;
  height: 20rem;
  margin: 0.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
`

const CardImage = styled.img`
  width: 20rem;
`

const CardHeader = styled.h3`
  color: black;
`

class GamesContainer extends Component {
  state = {
    games: []
  }

  unsubscribeFromFirestore = null

  componentDidMount = () => {
    const { platform } = this.props
    this.unsubscribeFromFirestore = firestore
      .collection(`platforms/${platform}/games`)
      .onSnapshot(snapshot => {
        const games = snapshot.docs.map(collectIdsAndDocs)
        this.setState({ games })
      })
  }

  componentDidUpdate = prevProps => {
    if (this.props.platform !== prevProps.platform) {
      const { platform } = this.props
      this.unsubscribeFromFirestore = firestore
        .collection(`platforms/${platform}/games`)
        .onSnapshot(snapshot => {
          const games = snapshot.docs.map(collectIdsAndDocs)
          this.setState({ games })
        })
    }
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore()
  }

  render() {
    const { games } = this.state
    const { platform } = this.props
    // console.log({ platform }, { games })
    return (
      <CardGroup>
        {games.map(game => (
          <Card key={game.id}>
            <Link
              to={{ pathname: `/${platform}/${game.slug}`, state: { game } }}
            >
              <CardImage src={game.cardImageUrl} alt={game.title} />
            </Link>
            <CardHeader>{game.title}</CardHeader>
          </Card>
        ))}
      </CardGroup>
    )
  }
}

GamesContainer.propTypes = {
  platform: PropTypes.string.isRequired
}

export default GamesContainer
