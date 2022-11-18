const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    movieCount: Int
    savedMovies: [Movie]
  }

  type Movie {
    _id: ID
    authors: [String]
    description: String
    movieId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveMovie(userId: ID!, authors: [String], description: String!, movieId: String!, image: String, link: String, title: String!): User
    removeMovie(userId: ID!, movieId: String!): User
  }
`;


module.exports = typeDefs;
