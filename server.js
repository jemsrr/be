// import app from "./app.js";
const app = require("./app.js");
const connectDB = require("./config/database.js");

require("dotenv").config();

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/graphql`)
);
