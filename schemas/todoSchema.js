const { gql } = require('apollo-server-express');

const todoSchema = gql`
    type Todo {
        _id: ID
        task: String
        completed: Boolean
    }

    type Query {
        getTodos: Response
        getTodo(_id: ID!): Response
    }

    type Mutation {
        addTodo(task: String!): Response
        updateTodo(_id: ID!, task: String, completed: Boolean): Response
        deleteTodo(_id: ID!): Response
    }
`

module.exports = todoSchema;
