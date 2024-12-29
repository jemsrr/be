const { gql } = require("apollo-server-express");

const responseSchema = gql`
  scalar JSON

  type Response {
    status: String
    message: String
    data: JSON
  }
`;

module.exports = responseSchema;
