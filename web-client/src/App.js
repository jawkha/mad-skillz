import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './views/Home'

import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <Router>
        <main className="Application">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </Router>
    )
  }
}

export default hot(module)(App)
