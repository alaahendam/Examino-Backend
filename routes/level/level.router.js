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
  getLevel,
  addLevelOnUser,
  checkStudentApproved,
  getLevelStudents,
  ownerApproved,
} = require("./level.controller");
level.post("/create", create);
level.put("/edit", edit);
level.get("/getAll", getAll);
level.post("/levelInfo", levelInfo);
level.post("/getOwnerLevels", getOwnerLevels);
level.post("/addLevel", addLevel);
level.delete("/deleteAll", deleteAll);
level.post("/getLevel", getLevel);
level.post("/addLevelOnUser", addLevelOnUser);
level.post("/checkStudentApproved", checkStudentApproved);
level.get("/getLevelStudents/:id", getLevelStudents);
level.post("/ownerApproved", ownerApproved);
module.exports = level;
