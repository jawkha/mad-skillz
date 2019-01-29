import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Route } from 'react-router-dom'

import Home from './views/Home'
import Authentication from './views/Authentication'
import UserProfile from './views/UserProfile'
import GamePage from './views/GamePage'
import MatchPage from './views/MatchPage'
import NotFound404 from './views/NotFound404'

import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <main className="Application">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Authentication} />
          <Route exact path="/me" component={UserProfile} />
          <Route exact path="/:platform/:game" component={GamePage} />
          <Route
            exact
            path="/:platform/:game/matches/:match"
            component={MatchPage}
          />
          <Route component={NotFound404} />
        </Switch>
      </main>
    )
  }
}

export default hot(module)(App)
