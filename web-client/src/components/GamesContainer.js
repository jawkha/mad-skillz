import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import { firestore } from '../firebase/firebase.config'
import { collectIdsAndDocs } from '../utils'

class GamesContainer extends Component {
  state = {
    games: []
  }

  unsubscribeFromFirestore = null

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore
      .collection(`platforms/xbox/games`)
      .onSnapshot(snapshot => {
        const games = snapshot.docs.map(collectIdsAndDocs)
        this.setState({ games })
      })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore()
  }

  render() {
    const { games } = this.state
    console.log(this.props)
    console.log(games)
    return (
      <Card.Group>
        {games.map(game => (
          <Card key={game.id}>
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

export default GamesContainer
