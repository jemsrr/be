const { gql } = require('apollo-server-express');

const userSchema = gql`
    type User {
        _id: ID
        name: String
        email: String
        password: String
    }
    type Query {
        getUser(email: String!,password: String!): Response
    }
    type Mutation {
        addUser(name: String!, email: String!,password: String!): Response
    }
`;

module.exports = userSchema;