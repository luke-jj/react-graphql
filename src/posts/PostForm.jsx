import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// no variables
const NEW_POST_TEST = gql`
  mutation addPostTest {
    createPost(data: { title: "testTitle", body: "testBody" }) {
      title
      body
      id
    }
  }
`

const NEW_POST = gql`
  mutation addPost($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      title
      body
      id
    }
  }
`

const PostForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [addPost, info] = useMutation(NEW_POST)

  function handleSubmit(e) {
    e.preventDefault()
    addPost({ variables: { title, body } })
    setTitle('')
    setBody('')
  }

  if (info.data) {
    return <p>Post added with id: {info.data.createPost.id}</p>
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
