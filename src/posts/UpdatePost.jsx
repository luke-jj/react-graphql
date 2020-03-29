import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(where: { id: $id }, data: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`

const PostForm = ({ post }) => {
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [updatePost, status] = useMutation(UPDATE_POST)

  function handleSubmit(e) {
    e.preventDefault()
    updatePost({ variables: { id: post.id, title, body } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        type="text"
        placeholder="title"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        type="text"
        placeholder="body"
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default PostForm
