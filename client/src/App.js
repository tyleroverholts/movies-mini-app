import React, { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './Home.js';
import Context from './Context.js'
import SearchResults from './SearchResults.js';

function App() {
  const [ movies, setMovies ] = useState(null)
  const [ searchParam, setSearchParam ] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080')
    .then(res => res.json())
    .then(movies => setMovies(movies))
  }, [])

  //const searchMovies = movies.filter(movie => movie.title.includes(searchParam))

  return (
    <>
    {movies !== null ?
    <>
    <Context.Provider value={{movies, searchParam, setSearchParam}}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search/:results' element={<SearchResults />}/>
      </Routes>
    </Context.Provider>
    </>
    :
      <p>Page is loading...</p>
      }
    </>
  );
}

export default App;
