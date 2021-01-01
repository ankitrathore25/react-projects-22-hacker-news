import React from 'react'
import { useGlobalContext } from './context'

const TagsButtons = () => {
  const { isLoading, handleTags } = useGlobalContext()

  return (
    <div className='btn-container'>
      <button disabled={isLoading} onClick={() => handleTags('front_page')}>
        Front Page
      </button>
      <button disabled={isLoading} onClick={() => handleTags('story')}>
         Story
      </button>
      <button disabled={isLoading} onClick={() => handleTags('comment')}>
        Comments
      </button>
      <button disabled={isLoading} onClick={() => handleTags('poll')}>
        Poll
      </button>
      <button disabled={isLoading} onClick={() => handleTags('ask_hn')}>
        Ask HN
      </button>
    </div>
  )
}

export default TagsButtons
