import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from './Context.js';
import Header from './components/Header.js'

const Home = () => {
  const { movies, setSearchParam, searchParam, redirect, setRedirect } = useContext(Context)
  const [ watchedMovies, setWatchedMovies] = useState(null)

  //RELOAD PAGE ON DATA CHANGES
  const handleReload = () => {
    if(redirect) window.location.reload();
    return true ? false : true;
  }

  useEffect(() => {
    handleReload();
    setRedirect(false)
  },[handleReload])

  //DELETE DATA
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

  //SET NEW PARAMETER
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
      console.log(res.json());
      setRedirect(true);
      handleReload();
      })
    .catch(err => {
      console.log(err);
    })
  }

  //RENDER HELP FUNCTIONS

  const mapOutput = (movie, index) => {
    return(
      <div key={index}>
        <p>{movie.title}</p><button onClick={() => handleDelete(movie.id)}>Delete</button>
        <label htmlFor='watched'>Watched</label>
        <input type='checkbox' name='watched' checked={movie.watched} onChange={() => handleSetWatched(movie)}/>
      </div>
    )
  }
  const mapMovies = () => {
    return movies.map((movie, index) => {
      if(movie.userAdded){
        return <>{mapOutput(movie, index)}</>
      }
      })
  }
  const defaultMovies = () => {
    return (
      <>
        {movies.length ? mapMovies():<p>You have not added any movies.</p>}
      </>
    )
  }

  const movieFilteredList = (parameter) => {
    return(
      <>
        {movies.length ? movies.map((movie, index) => {
          if(movie.userAdded && movie.watched === parameter){
            return <>{mapOutput(movie, index)}</>
           }
          })
            :
          <p>You have not added any movies.</p>
        }
      </>
    )
  }

  //APP RENDER
  return(
    <>
      {movies !== undefined ?
        <>
          <div className="App">
            <Header />
            <button onClick={() => setWatchedMovies(true)}>See Watched Movies</button>
            <button onClick={() => setWatchedMovies(false)}>See Movie to Watch</button>
            <button onClick={() => setWatchedMovies(null)}>See All Movies</button>
            {watchedMovies === null ? defaultMovies() : (watchedMovies ? movieFilteredList(true) : movieFilteredList(false))}
          </div>
        </>
      :
      <p>Page is loading...</p>
      }
    </>
  )
}

export default Home;