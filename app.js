const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const schemas = require("./schemas");
const resolvers = require("./resolvers");
const { applyMiddleware } = require("graphql-middleware");
const authMiddleware = require("./Middleware/auth.middleware");
const cors = require("cors");

const schema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: resolvers,
});

const middlewareSchema = applyMiddleware(schema, {
  Query: {
    getTodos: authMiddleware,
    getTodo: authMiddleware,
  },
  Mutation: {
    addTodo: authMiddleware,
    updateTodo: authMiddleware,
    deleteTodo: authMiddleware,
  },
});

module.exports = middlewareSchema;

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

const startServer = async () => {
  const server = new ApolloServer({
    schema: middlewareSchema,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      return { token };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
};

startServer();

module.exports = app;
