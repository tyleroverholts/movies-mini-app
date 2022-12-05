const express = require('express');
const cors = require('cors')
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'miniapp_1'
  }
});
const app = express();

app.use(cors())
app.use(express.json());

app.get('/', async (req, res) => {
  let movies
  try {
    movies = await knex('movies')
      .select('*')
      .then(rows => rows)
    res.status(200).send(movies);
  }catch(err) {
    console.log(err);
    res.send('There was an error processing your request.')
  }
})

app.post('/', async (req, res) => {
  const { body } = req;
  try {
    let newMovie = await knex('movies')
      .insert({title: `${body.title}`}, 'id')
      .then(id => console.log(id))
    let updatedMovies = await knex('movies')
      .select('*')
      .then(rows => rows)
     res.status(200).send(updatedMovies)
  }
  catch(err){
    console.log(err)
  }
})


module.exports = app