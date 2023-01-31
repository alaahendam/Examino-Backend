const express = require("express");
const users = express.Router();
const { login, create, edit, getAll } = require("./users.controller");
users.post("/login", login);
users.post("/create", create);
users.put("/edit", edit);
users.get("/getAll", getAll);
module.exports = users;
