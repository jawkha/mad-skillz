import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import '@babel/polyfill'
import App from './App'
import DefaultErrorBoundary from './DefaultErrorBoundary'
import UserProvider from './providers/UserProvider'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

const mountNode = document.getElementById('app')

ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
      <Router>
        <UserProvider>
          <App />
        </UserProvider>
      </Router>
    </DefaultErrorBoundary>
  </React.StrictMode>,
  mountNode
)
