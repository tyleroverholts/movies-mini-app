import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context.js';

const Home = () => {
  const { movies, setSearchParam, searchParam } = useContext(Context)

  const resetParam = () => {
    setSearchParam('')
    return
  }

  const handleChange = (event) => {
    setSearchParam(event.target.value);
    return;
  }

  return(
    <>
        {movies !== undefined ?
    <>
      <div className="App">
        <label htmlFor='movie-search'>Search for Movies:</label>
        <input type='search' id='movie-search' onChange={handleChange}/>
        <Link to={`/search/${searchParam}`}>
          <button>Search</button>
        </Link>
        {movies.map((movie, index) =>
          <p key={index}>{movie.title}</p>
        )}
      </div>
    </>
    :
      <p>Page is loading...</p>
      }
    </>
  )
}

export default Home;