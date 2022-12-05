import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context.js';

const Header = () => {
  const { searchParam, setSearchParam } = useContext(Context);

  const handleChange = (event) => {
    setSearchParam(event.target.value);
    return;
  }

  return(
    <>
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
    </>
  )
}

export default Header