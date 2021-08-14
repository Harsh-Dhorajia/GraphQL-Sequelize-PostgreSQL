const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/contexts');
const db = require('./models');

// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;
// Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => "Hello world!",
//   },
// };
// const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
  },
  context,
});

db.sequelize.sync({ alter: true })
  // eslint-disable-next-line promise/always-return
  .then(async () => {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`listening on port ${process.env.PORT}`);
    });
    // eslint-disable-next-line no-console
    console.log('DB connection established');
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log('Error in db connection');
    throw new Error(error);
  });

server.applyMiddleware({ app });

module.exports = app;
