const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      // when querying the user table password will be excluded
      defaultScope: {
        rawAttributes: { exclude: ['password'] },
      },
    },
  );

  User.beforeCreate(async user => {
    // eslint-disable-next-line no-param-reassign
    user.password = await user.generatePasswordHash();
  });
  // eslint-disable-next-line consistent-return
  User.prototype.generatePasswordHash = () => {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  };
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  };
  return User;
};
