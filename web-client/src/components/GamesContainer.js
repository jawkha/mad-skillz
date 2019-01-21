import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Image } from 'semantic-ui-react'
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

    return (
      <Card.Group>
        {games.map(game => (
          <Card key={game.id} as={Link} to={`/${platform}/${game.slug}`}>
            <Image fluid src={game.imageUrl} />
            <Card.Content>
              <Card.Header>{game.title}</Card.Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }
}

GamesContainer.propTypes = {
  platform: PropTypes.string.isRequired
}

export default GamesContainer
