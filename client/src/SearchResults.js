import React, { useContext, useState } from 'react';
import Context from './Context.js'

const SearchResults = () => {
  const { movies, searchParam, setSearchParam } = useContext(Context);
  //const [ results, setResults ] = useState(null);
  return(
    <>
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