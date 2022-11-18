import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { SAVE_MOVIE } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { searchTheMovieDatabase } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

const SearchMovies = () => {

  const userData = useQuery(QUERY_ME);
  
  // holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // hold saved movieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  const [saveMovie] = useMutation(SAVE_MOVIE, {
    refetchQueries: [
      {query: QUERY_ME}
    ]
  });


  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchTheMovieDatabase(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { results: moviesArray } = await response.json();
      console.log(moviesArray);
      // const { items } = await response.json(); ******

       const movieData = moviesArray.map((movie) => ({
        title: movie.title,
        image: movie.poster_path,
        description: movie.overview,
        release_date: movie.release_date,
        movieId: movie.id
      }));

      setSearchedMovies(movieData);
      // setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // function to handle saving a movie to our database
  const handleSaveMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveMovie({
        variables: { 
          userId: userData.data?.me._id, 
          title: movieToSave.title,
          image: movieToSave.poster_path,
          description: movieToSave.overview, 
          movieId: movieToSave.movieId, 
          release_date: movieToSave.release_date,
        }
      });
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img src={'http://image.tmdb.org/t/p/w500' + movie.image} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Release Date: {movie.release_date}</p>
                  <Card.Text>{movie.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been saved!'
                        : 'Save this Movie!'}
                    </Button>
                  )}
              
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchMovies;
