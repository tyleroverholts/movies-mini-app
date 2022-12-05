import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context.js';

const Home = () => {
  const { movies, setSearchParam, searchParam } = useContext(Context)

  // useEffect(() => {
  //   // handleReload();
  // },[])

  const handleReload = () => {
    window.location.reload()
  }
  const handleChange = (event) => {
    setSearchParam(event.target.value);
    return;
  }

  const handleDelete = (movieId) => {
    const body = {
      id: movieId
    }
    fetch('http://localhost:8080/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => {
      console.log(res.json())
      handleReload();
      })
    .catch(err => {
      console.log(err);
    })
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
        <div>
        <Link to='/add'>
          <button>Add Movies</button>
        </Link>
        </div>
        {movies.length ? movies.map((movie, index) => {
          if(movie.userAdded){
            return (
            <div key={index}>
            <p>{movie.title}</p><button onClick={() => handleDelete(movie.id)}>Delete</button>
            </div>
            )
          }
          })
        :
        <p>You have not added any movies.</p>
        }
      </div>
    </>
    :
      <p>Page is loading...</p>
      }
    </>
  )
}

export default Home;