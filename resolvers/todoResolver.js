const Todo = require("../models/todo");

const todoResolver = {
  Query: {
    getTodos: async (_, { user }) => {
      try {
        const todos = await Todo.find({ user: user._id });
        return {
          status: 200,
          message: "Get todos successfully",
          data: todos,
        };
      } catch (error) {
        console.error(error.message);
        return {
          status: 400,
          message: "Get todos failed",
          data: null,
        };
      }
    },
    getTodo: async (_, { _id, user }) => {
      try {
        const todo = await Todo.findOne({ _id, user: user._id });
        if (!todo)
          return {
            status: 400,
            message: "Todo not found",
            data: null,
          };
        return {
          status: 200,
          message: "Get todo successfully",
          data: todo,
        };
      } catch (error) {
        console.error(error.message);
        return {
          status: 400,
          message: "Get todo failed",
          data: null,
        };
      }
    },
  },
  Mutation: {
    addTodo: async (_, { task, user }, context, info) => {
      try {
        const todo = await Todo.create({ task, user: user._id });

        return {
          status: 201,
          message: "Add todo successfully",
          data: todo,
        };
      } catch (error) {
        console.error(error.message);
        return {
          status: 400,
          message: "Add todo failed",
          data: null,
        };
      }
    },
    updateTodo: async (_, { _id, task, completed, user }) => {
      try {
        const todo = await Todo.findOneAndUpdate(
          { _id, user: user._id },
          { task, completed },
          { new: true }
        );
        return {
          status: 200,
          message: "Update todo successfully",
          data: todo,
        };
      } catch (error) {
        console.error(error.message);
        return {
          status: 400,
          message: "Update todo failed",
          data: null,
        };
      }
    },
    deleteTodo: async (_, { _id, user }) => {
      try {
        const todo = await Todo.findOneAndDelete({ _id, user: user._id });
        return {
          status: 200,
          message: "Delete todo successfully",
          data: todo,
        };
      } catch (error) {
        console.error(error.message);
        return {
          status: 400,
          message: "Delete todo failed",
          data: null,
        };
      }
    },
  },
};

module.exports = todoResolver;
