# GraphQL and React
GraphQL is a specification.
Apollo is a GraphQL implementation (client, engine, server)
Use the **apollo dev tools extension for your browser**.

Apollo caches query results automatically preventing the same queries from 
running several times.


## Setting Up A GraphQL Server
[graphcms.com](https://graphcms.com) or [prisma.io](https://prisma.io) can be 
used to set up a server.

GraphQLPlayground is used to inspect the API.


## Setting Up A React GraphQL Frontend

```
npx create-react-app graphql-app graphql-tag
npm install apollo-boost @apollo/react-hooks graphql

apollo-boost: Package containing everything you need to set up Apollo Client
@apollo/react-hooks: React hooks based view layer integration
graphql: Also parses your GraphQL queries
```

## Connecting to a GraphQL Server
1. Create a graphql client
2. Pass the client to a top level apollo provider react element.

``` javascript
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({ uri: 'https://....' })

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">Apollo React</header>
    </div>
  </ApolloProvider>
)

```

## GraphQL Queries
Create a query in a template literal and execute the query with the 
`client.query()` method.

``` javascript
import gql from 'graphql-tag'

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
```

## GraphQL Queries With Apollo Hooks - `useQuery`

```javascript
import { ApolloProvider, useQuery } from '@apollo/react-hooks'

function Posts() {
  const { loading, error, data } = useQuery(POSTS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occured...</p>

  return data.posts.map(post => <h1>{post.title}</h1>)
}
```

## Named Queries
Giving queries an identifier allows them to be referenced later. All queries
should be named like this: `query name {}`.

``` javascript
const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
      createdAt
    }
  }
`
```
Queries will work with and without a name.


## Querying with Arguments and Parameters
Variables can be passed to query objects in parenthesis. The arguments must
be named - `where: value.

``` javascript
const POST_QUERY = gql`
  query postById {
    post(where: {id: "kskdiwer923r8"}) {
      id
      title
      body
    }
  }
`
```

## Querying with Variables
Variables can be passed to to a graphql operation by describing the variable in
parenthesis after the query identifier - the query must accept the variable
with a given type first before it can be used in an operation. Every variable
needs a type declaration.

An exclamation point `ID!` after the type declaration marks the variable as
required when using the query.

Variable identifiers must always start with a dollar sign `$`.

``` javascript
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
      createdAt
    }
  }
`

const Post = ({ match }) => {
  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: {
      id: match.params.id,
    },
  })
  if (loading) return <p>loading</p>
  if (error) return <p>error</p>
  const { post } = data

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )
}
```


## Mutations (create, update, delete)
The `useMutation` hook is used to perform mutations.
