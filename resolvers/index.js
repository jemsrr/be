const userResolver = require("./userResolver");
const todoResolver = require("./todoResolver");

const resolvers = {
    Query: {
      ...userResolver.Query,
      ...todoResolver.Query
    },
    Mutation: {
      ...userResolver.Mutation,
      ...todoResolver.Mutation
    },
  };
  
  module.exports = resolvers;