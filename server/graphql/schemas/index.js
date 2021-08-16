const { gql } = require('apollo-server-express');
const userType = require('./users');
const postType = require('./posts');
const commentType = require('./comments');

const rootType = gql`
  directive @isAdmin on FIELD_DEFINITION

  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [rootType, userType, postType, commentType];
