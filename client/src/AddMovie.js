import React, { useContext, useState } from 'react';
import Context from './Context.js'

const AddMovies = () => {
  const { movies, addParam, setAddParam } = useContext(Context);

  const handleAddChange = (event) => {
    const postBody = {
      title: event.target.value
    }
    setAddParam(postBody);
    return;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addParam)
    })
    .then(res => console.log(res))
  }

  return(
    <>
      <label htmlFor='add-movie'>Add Movie:</label>
      <form className='add-movie'>

        <label htmlFor='title'>Movie Title:</label>
        <input type='text' id='title' onChange={handleAddChange}/>
        <div>
          <input type='submit' value='Add' onClick={handleSubmit}/>
        </div>
       </form>
    </>
  )
}

export default AddMovies