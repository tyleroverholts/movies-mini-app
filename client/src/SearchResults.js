import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from './Context.js'

const SearchResults = () => {
  const navigate = useNavigate()
  const { movies, searchParam } = useContext(Context);
  //const [ results, setResults ] = useState(null);
  return(
    <>
    <div className='home-button'>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
      All movies containing '{searchParam}':
      {movies.map((movie, index) => {
        if(movie.title.toUpperCase().includes(searchParam.toUpperCase())){
        return <p key={index}>{movie.title}</p>
        }}
        )
      }
    </>
  )
}

export default SearchResults