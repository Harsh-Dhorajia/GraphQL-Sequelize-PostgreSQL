const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../../models');

module.exports = {
  Mutation: {
    async register(root, args) {
      try {
        // get the req body from user
        const {
          name, email, password, isAdmin,
        } = args.input;
        const user = User.create({
          name, email, password, isAdmin,
        });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    async login(root, { input }) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return { token, user };
      }
      throw new AuthenticationError('Invalid credentials');
    },
  },

  Query: {
    async getAllUsers(root, {}, { user = null }) {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
