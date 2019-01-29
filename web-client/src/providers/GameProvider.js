// THIS IS JUST AN EXPERIMENT SO FAR. NOT IMPORTED ANYWHERE.
// import React, { Component, createContext } from 'react'
// import { firestore } from '../firebase/firebase.config'
// import { collectIdsAndDocs } from '../utils'

// export const GameContext = createContext()

// class GameProvider extends Component {
//   state = {
//     game: []
//   }

//   componentDidMount = () => {
//     this.unsubscribeFromFirestore = firestore
//       .collection('posts')
//       .onSnapshot(snapshot => {
//         const posts = snapshot.docs.map(collectIdsAndDocs)
//         this.setState({ posts })
//       })
//   }

//   componentWillUnmount = () => {
//     this.unsubscribeFromFirestore()
//   }

//   render() {
//     const { game } = this.state
//     const { children } = this.props
//     return <GameContext.Provider value={game}>{children}</GameContext.Provider>
//   }
// }
// export default GameProvider
