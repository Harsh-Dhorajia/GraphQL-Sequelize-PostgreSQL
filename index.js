const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/contexts');
const db = require('./models')
const port = 4000;

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
      endpoint: "/graphql",
  },
  context
});

server.applyMiddleware({ app });

db.sequelize.sync({ alter: true })
  .then(async () => {
    app.listen({ port }, () =>
      console.log(
        `🚀 Server is running`
      )
    );
    console.log('DB connection established')
  });
