const { gql } = require('apollo-server-express');
const userType = require('./users')
const postType = require('./posts')
const commentType = require('./comments')

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType, userType, postType, commentType];