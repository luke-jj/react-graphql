import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

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

function Posts() {
  const { loading, error, data } = useQuery(POSTS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occured...</p>

  return (
    <ul>
      {data.posts.map(post => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
