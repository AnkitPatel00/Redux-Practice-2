const { initializeDatabase } = require('./db/db.connection')
const MovieModel = require('./models/movie.model')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors({origin:"*"}))

app.get('/', (_,res) => {
  res.send('Welcome to Movie Server for Redux Practice Set 2')
})

//add multiple movies

app.post('/movies',async (req, res) => {
  const movies = req.body
  try {
    const savedMovies =await MovieModel.insertMany(movies)
    res.status(201).json({message:'Movies added successfully',savedMovies})
  }
  catch (error)
  {
res.status(500).json({error:'failed to add multiple movies'})
  }
})

//delete all movies

app.delete('/movies/deleteAll',async (req,res) => {
  try {
    const deletedMovies = await MovieModel.deleteMany()
    res.status(200).json({message:'All Movies Deleted Successfully',deletedMovies})
  }
  catch(error)
  {
res.status(500).json({error:'Failed to Delete add Movies',error})
  }
})

//add one movie

app.post('/movie',async (req, res) => {
  const {movieTitle,director,genre} = req.body
  try {
    const newMovie = new MovieModel({ movieTitle, director, genre })
    const savedMovie = await newMovie.save()
      res.status(201).json({message:'movie added successfully',savedMovie})  
  }
  catch (error)
  {
    res.status(500).json({error:'failed to add Movie',error})
  }
})

//delete one movie

app.delete('/movies/:movieId', async (req, res) => {
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(req.params.movieId)
   
    if (!deletedMovie)
    {
      res.status(404).json({error:'Movie Not Found'})
    }
    else
    {
      res.status(200).json({message:'Movie Deleted Successfully',deletedMovie})
      }
  }
  catch (error)
  {
res.status(500).json({error:'Failed to Delete Movie',error})
  }
})

//read all movies

app.get('/movies',async (req,res) => {
  try {
    const movies = await MovieModel.find()
    res.status(200).json(movies)
  }
  catch (error)
  {
    res.status(500).json({error:'Failed to Fetch All Movies',error})
  }
})

initializeDatabase()

const PORT =process.env.PORT || 3000
app.listen(PORT,() => {
  console.log(`Server is Running on Port ${PORT}`)
})