import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Route } from 'react-router-dom'

import Home from './views/Home'
import Authentication from './views/Authentication'

import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <main className="Application">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Authentication} />
        </Switch>
      </main>
    )
  }
}

export default hot(module)(App)
