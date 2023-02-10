const express = require("express");
const chapter = express.Router();
const {
  create,
  //   edit,
  //   getAll,
  //   addchapter,
  //   deleteAll,
  //   getOwnerchapters,
  //   chapterInfo,
} = require("./chapter.controller");
chapter.post("/create", create);
// chapter.put("/edit", edit);
// chapter.get("/getAll", getAll);
// chapter.post("/chapterInfo", chapterInfo);
// chapter.post("/getOwnerchapters", getOwnerchapters);
// chapter.post("/addchapter", addchapter);
// chapter.delete("/deleteAll", deleteAll);
module.exports = chapter;
