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

const PUBLISH_POST = gql`
  mutation publishPost($id: ID!) {
    publishPost(where: { id: $id }, to: PUBLISHED) {
      id
      publishedAt
    }
  }
`

const PostForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [published, setPublished] = useState(false)
  const [addPost, addStatus] = useMutation(NEW_POST)
  const [publishPost, publishStatus] = useMutation(PUBLISH_POST)

  function handleSubmit(e) {
    e.preventDefault()
    addPost({ variables: { title, body } })
    setTitle('')
    setBody('')
  }

  if (addStatus.data && !published) {
    publishPost({ variables: { id: addStatus.data.createPost.id } })
    setPublished(true)
  }

  if (addStatus.data) {
    return <p>Post added with id: {addStatus.data.createPost.id}</p>
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
