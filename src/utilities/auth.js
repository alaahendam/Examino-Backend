const { jwtSign, jwtVerify } = require("../../src/utilities/token");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"]
    ? req.headers["x-access-token"].toString()
    : false;

  if (!token) {
    console.log("A token is required for authentication");
  }
  try {
    const decoded = jwtVerify(token);
    prisma.user
      .findUnique({
        where: { id: decoded.id },
      })
      .then((user) => {
        console.log("user", user);
        req.body.tokenUser = { id: decoded.id };
        return next();
      })
      .catch((e) => {
        console.log("Invalid token.");
        res.status(401).send("Invalid token.");
      });
  } catch (error) {
    console.log("Invalid token.");
    res.status(401).send("Invalid token.");
  }
};

module.exports = verifyToken;
