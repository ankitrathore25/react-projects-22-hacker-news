import React from 'react'
import SearchForm from './SearchForm'
import Stories from './Stories'
import Buttons from './Buttons'
import TagsButtons from './TagsButtons'
function App() {
  return (
    <>
      <SearchForm />
      <TagsButtons/>
      <Stories />
      <Buttons />
    </>
  )
}

export default App
