import React from 'react';
import { useMutation } from '@apollo/client';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';
import { removeMovieId } from '../utils/localStorage';
import { useQuery } from '@apollo/client';


const SavedMovies = () => {

  const { loading, data: userData } = useQuery(QUERY_ME);

  const savedMovies = userData?.me.SavedMovies;

  const [removeMovie] = useMutation(REMOVE_MOVIE, {
    refetchQueries: [
      {query: QUERY_ME}
    ]
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDeleteMovie = async (movieId) => {

    try {
      removeMovieId(movieId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {savedMovies.length
            ? `Viewing ${savedMovies.length} saved ${savedMovies.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {savedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Authors: {movie.authors}</p>
                  <Card.Text>{movie.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                    Delete this Movie!
                  </Button>
                  <div className='google-link'>
                    <a href={movie.link} target='_blank' rel='noopener noreferrer'>View in The Movie Database</a>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;
