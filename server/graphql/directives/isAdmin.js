const {
  SchemaDirectiveVisitor,
  ApolloError,
} = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

class isAdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (...args) => {
      if (args[2].user.isAdmin) {
        const user = await resolve.apply(this, args);
        return user;
      }
      throw new ApolloError('You are not admin');
    };
  }
}

module.exports = isAdminDirective;
