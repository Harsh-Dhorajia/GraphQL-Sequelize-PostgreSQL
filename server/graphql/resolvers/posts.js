const { AuthenticationError } = require('apollo-server-express');
const { Post, User } = require('../../models');

module.exports = {
  Mutation: {
    async createPost(_, { content, title }, { user = null }) {
      if (!user) {
        throw new AuthenticationError('You must login to create a post');
      }
      const post = await Post.create({
        userId: user.id,
        content,
        title,
      });

      return post;
    },
  },

  Query: {
    async getAllPosts() {
      const posts = await Post.findAll({
        include: [{ model: User, as: 'author', attributes: ['name', 'email'] }],
      });
      return posts;
    },

    async getSinglePost(_, { postId }) {
      const post = await Post.findByPk(postId);
      return post;
    },
  },

  Post: {
    async author(post) {
      const author = await post.getAuthor();
      return author;
    },
    async comments(post) {
      const comments = await post.getComments();
      return comments;
    },
  },
};
