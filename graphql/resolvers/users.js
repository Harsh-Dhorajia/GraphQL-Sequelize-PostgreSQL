const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../../models');

module.exports = {
  Mutation: {
    async register(root, args, context) {
      //get the req body from user
      const { name, email, password } = args.input;
      const user = User.create({ name, email, password });
      return user;
    },

    async login(root, { input }, context) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return { user, token };
      }
      throw new AuthenticationError('Invalid credentials');
    },
  },
};
