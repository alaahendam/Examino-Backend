const express = require("express");
const auth = require("../../src/utilities/auth");
const user = express.Router();
const {
  login,
  create,
  edit,
  getAll,
  getUser,
  deleteAll,
  deleteUser,
  checkToken,
} = require("./user.controller");
user.post("/login", login);
user.post("/create", create);
user.put("/edit", auth, edit);
user.get("/getAll", auth, getAll);
user.get("/getUser/:id", getUser);
user.delete("/deleteUser", auth, deleteUser);
user.delete("/deleteAll", deleteAll);
user.post("/checkToken", auth, checkToken);

checkToken;
module.exports = user;
