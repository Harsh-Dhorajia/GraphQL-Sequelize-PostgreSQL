const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    posts: [Post!]
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(input: LoginInput!): LoginResponse
  }

  extend type Query {
    getAllUsers: [User]! @isAdmin
  }

  type RegisterResponse {
    id: Int!
    name: String!
    email: String!
    isAdmin: Boolean!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    user: User!
    token: String!
  }
`;
