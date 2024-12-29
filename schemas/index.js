const userSchema = require("./userSchema");
const todoSchema = require("./todoSchema");
const responseSchema = require("./response");
const { gql } = require("apollo-server-express");

const schemas = gql`
  ${userSchema}
  ${responseSchema}
  ${todoSchema}
`;
module.exports = schemas;
