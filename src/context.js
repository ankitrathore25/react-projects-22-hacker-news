import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  HANDLE_TAGS,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'
// https://hn.algolia.com/?dateRange=all&page=0&prefix=false&query=&sort=byDate&type=story
// https://hn.algolia.com/api/v1/search?tags=front_page
const initialState = {
  isLoading: true,
  hits: [],
  query: '',
  page: 0,
  nbPages: 0,
  tags: 'front_page'
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id })
  }
  const handleSearch = (query, tags) => {
    dispatch({ type: HANDLE_SEARCH, payload: {query: query, tags: tags }})
  }
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value })
  }
  const handleTags = (tags) => {
    dispatch({ type: HANDLE_TAGS, payload: tags })
  }


  useEffect(() => {
    fetchStories(`${API_ENDPOINT}tags=${state.tags}&query=${state.query}&page=${state.page}`)
  }, [state.tags, state.query, state.page])

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage, handleTags }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
