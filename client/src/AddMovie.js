import React, { useContext, useState } from 'react';
import Context from './Context.js';
import { useNavigate } from 'react-router-dom';

const AddMovies = () => {
  const navigate = useNavigate();
  const { movies, addParam, setAddParam, redirect, setRedirect } = useContext(Context);

  const handleAddChange = (event) => {
    const postBody = {
      title: event.target.value,
      userAdded: 'true'
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
    .then(res => {
      console.log(res.json())
      setRedirect(true)
      navigate('/')
      })
    .catch(err => {
      console.log(err);
    })
  }

  return(
    <>
      <div className='home-button'>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
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