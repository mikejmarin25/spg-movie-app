import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation save\Movie($userId: ID!, $description: String!, $movieId: String!, $title: String!, $authors: [String], $image: String, $link: String) {
    saveMovie(userId: $userId, description: $description, movieId: $movieId, title: $title, authors: $authors, image: $image, link: $link) {
      _id
      username
      movieCount
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation RemoveMovie($userId: ID!, $movieId: String!) {
    removeMovie(userId: $userId, movieId: $movieId) {
      savedMovies {
        _id
      }
    }
  }
`;
