import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import './App.css'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
})

const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

client.query({ query: POSTS_QUERY }).then(res => console.log(res))

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        Apollo React
        <Posts />
      </header>
    </div>
  </ApolloProvider>
)

function Posts() {
  const { loading, error, data } = useQuery(POSTS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occured...</p>

  return data.posts.map(post => <h1>{post.title}</h1>)
}

export default App
