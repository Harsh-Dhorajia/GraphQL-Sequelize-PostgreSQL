const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { Post, Comment } = require('../../models');

module.exports = {
  Mutation: {
    async createComment(_, { content, postId }, { user = null }) {
      if (!user) {
        throw new AuthenticationError('You must login to create a comment');
      }

      const post = await Post.findByPk(postId);

      if (post) {
        return post.createComment({ content, userId: user.id });
      }
      throw new ApolloError('Unable to create a comment');
    },
  },

  Query: {
    async getAllComments(_, { postId }, { user = null }) {
      if (!user) {
        throw new AuthenticationError('You must login to create a comment');
      }

      const post = await Post.findByPk(postId);
      if (!post) {
        throw new ApolloError('Unable to create a comment');
      }
      return Comment.findAll({ where: { postId } });
    },
  },

  Comment: {
    author(comment) {
      return comment.getAuthor();
    },
    post(comment) {
      return comment.getPost();
    },
  },
};
