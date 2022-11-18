import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      movieCount
      savedMovies {
        _id
        description
        movieId
        image
        link
        title
      }
    }
  }
`;
