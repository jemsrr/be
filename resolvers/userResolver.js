const User = require("../models/user");
const jwt = require("jsonwebtoken");
const environment = require("../utils/environment");

const userResolver = {
  Query: {
    async getUser(_, { email, password }) {
      try {
        const checkUser = await User.findOne({ email }).select("+password");
        if (!checkUser) {
          return {
            status: 400,
            message: "User not found",
            data: null,
          };
        }
        const isMatch = await checkUser.comparePasswordAsync(password);
        if (!isMatch) {
          return {
            status: 400,
            message: "Invalid password",
            data: null,
          };
        }

        const token = jwt.sign(
          {
            _id: checkUser._id,
            email: checkUser.email,
            name: checkUser.name,
          },
          environment.jwt.secret,
          { expiresIn: environment.jwt.expiredIn }
        );

        return {
          status: 200,
          message: "User logged in successfully",
          data: {
            token,
          },
        };
      } catch (error) {
        console.error(error.message);
        return null;
      }
    },
  },
  Mutation: {
    async addUser(_, { name, email, password }) {
      try {
        const findUser = await User.findOne({ email });
        if (findUser) {
          return {
            status: 400,            
            message: "User already exists",
            data: null,
          };
        }
        const user = await User.create({ name, email, password });
        return {
          status: 200,
          message: "User created successfully",
          data: user,
        };
      } catch (error) {
        console.error(error.message);
        return null;
      }
    },
  },
};

module.exports = userResolver;
