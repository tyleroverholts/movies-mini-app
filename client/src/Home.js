import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context.js';

const Home = () => {
  const { movies, setSearchParam, searchParam, redirect, setRedirect } = useContext(Context)

  const handleReload = () => {
    if(redirect) window.location.reload();
    return true ? false : true;
  }

  useEffect(() => {
    handleReload();
    setRedirect(false)
  },[handleReload])


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
      })
    .catch(err => {
      console.log(err);
    })
  }

  const handleSetWatched = (movie) => {
    const setWatched = movie.watched ? false : true;
    const body = {
      id: movie.id,
      watched: setWatched
    }
    fetch('http://localhost:8080/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => {
      console.log(res.json())
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
            <label htmlFor='watched'>Watched</label>
            <input type='checkbox' name='watched' checked={movie.watched} onChange={() => handleSetWatched(movie)}/>
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