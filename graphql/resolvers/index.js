const userResolvers = require('./users');
const postResolvers = require('./posts');
const commentResolvers = require('./comments');

module.exports = [userResolvers, postResolvers, commentResolvers];