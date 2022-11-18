const { Schema } = require('mongoose');


//**Create Schema based on the TMD API */
// This is a sub document schema, it won't become its own model but we'll use it as the schema for the User's `savedMovies` array in User.js
const movieSchema = new Schema({
  original_title: {
    type: String,
  },
  backdrop_path: {
      type: String,
    },
  overview: {
    type: String,
  },
  id: {
    type: String,
  }
});

module.exports = movieSchema;
