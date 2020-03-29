import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import UpdatePost from './UpdatePost'

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
      <section>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </section>
      <section>
        <UpdatePost post={post} />
      </section>
    </div>
  )
}

export default Post
