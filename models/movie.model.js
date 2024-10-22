const mongoose = require('mongoose')

const movieSchema =new mongoose.Schema({
  movieTitle: { type: String, required: true },
  director: { type: String, required: true },
  genre:[{type:String,enum:["Action","Drama","Comedy","Sci-Fi","Fantacy","Horror"],required:true}]
})

const MovieModel = mongoose.model('reduxmovies', movieSchema)

module.exports = MovieModel