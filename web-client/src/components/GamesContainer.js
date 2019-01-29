import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  CardGroup,
  Card,
  CardImage,
  CardHeader
} from './custom-styled-components/CustomStyledComponents'
import { firestore } from '../firebase/firebase.config'
import { collectIdsAndDocs } from '../utils'

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
