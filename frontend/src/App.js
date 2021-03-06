// @flow

import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App } from './modules/app/components/app'
import apolloClient from './modules/app/client'
import { ApolloProvider } from 'react-apollo'

import './App.css'

type Props = {}

class Root extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default Root
