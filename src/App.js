import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import './App.css'
import Post from './posts/Post'
import Posts from './posts/Posts'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
})

const FIRST_QUERY = gql`
  query fristQuery {
    posts {
      id
      title
      body
    }
  }
`

client.query({ query: FIRST_QUERY }).then(res => console.log(res))

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <header className="App-header">
          Apollo React
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/posts/:id" component={Post} />
          </Switch>
        </header>
      </div>
    </Router>
  </ApolloProvider>
)

export default App
