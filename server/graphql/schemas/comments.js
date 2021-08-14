const { gql } = require('apollo-server-express');

module.exports = gql`
  type Comment {
    id: Int!
    content: String!
    author: User!
    post: Post!
    createdAt: String
  }

  extend type Query {
    getAllComments(postId: Int!): [Comment!]
  }

  extend type Mutation {
    createComment(content: String!, postId: Int!): CreateCommentResponse
  }

  type CreateCommentResponse {
    id: Int!
    content: String!
    createdAt: String!
  }
`;
