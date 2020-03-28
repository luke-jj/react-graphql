import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import './App.css'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
})

const testQuery = gql`
  {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

client.query({ query: testQuery }).then(res => console.log(res))

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">Apollo React</header>
    </div>
  </ApolloProvider>
)

export default App
