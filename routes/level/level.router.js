const express = require("express");
const level = express.Router();
const {
  create,
  edit,
  getAll,
  addLevel,
  deleteAll,
  getOwnerLevels,
  levelInfo,
} = require("./level.controller");
level.post("/create", create);
level.put("/edit", edit);
level.get("/getAll", getAll);
level.post("/levelInfo", levelInfo);
level.post("/getOwnerLevels", getOwnerLevels);
level.post("/addLevel", addLevel);
level.delete("/deleteAll", deleteAll);
module.exports = level;
