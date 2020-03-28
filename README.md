# GraphQL and React
GraphQL is a specification.
Apollo is a GraphQL implementation (client, engine, server)


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
