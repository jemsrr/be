const jwt = require("jsonwebtoken");
const environment = require("../utils/environment");

const authMiddleware = async (resolve, parent, args, context, info) => {
  try {
    const token = context.token;
    console.log(token.split(" ")[1]);
    if (!token) {
      return {
        status: 401,
        message: "Unauthorized Access",
        data: null,
      };
    }
    const decoded = jwt.verify(token.split(" ")[1], environment.jwt.secret);
    args.user = decoded;
    return resolve(parent, args, context, info);
  } catch (error) {
    return {
      status: 401,
      message: "Unauthorized Access",
      data: null,
    };
  }
};

module.exports = authMiddleware;
