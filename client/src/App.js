import React, { useState, useEffect} from 'react';

function App() {
  const [ movies, setMovies ] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080')
    .then(res => res.json())
    .then(movies => setMovies(movies))
  }, [])

  return (
    <>
    {movies !== null ?
      <div className="App">
        {movies.map((movie, index) =>
          <p key={index}>{movie.title}</p>
        )}
      </div>
    :
      <p>Page is loading...</p>
      }
    </>
  );
}

export default App;
