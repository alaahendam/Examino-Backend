const jwt = require("jsonwebtoken");

const TOKEN_KEY = process.env.TOKEN_KEY ?? "123456";

const jwtSign = (user) => {
  return jwt.sign({ ...user }, TOKEN_KEY, {
    expiresIn: "1h",
  });
};

const jwtVerify = (token) => {
  return jwt.verify(token, TOKEN_KEY);
};

module.exports = { jwtSign, jwtVerify };
