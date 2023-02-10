const express = require("express");
const question = express.Router();
const {
  create,
  edit,
  //   getAll,
  //   addquestion,
  deleteAll,
  getChapterQuestions,
  //   questionInfo,
} = require("./question.controller");
question.post("/create", create);
question.post("/getChapterQuestions", getChapterQuestions);
question.put("/edit", edit);
// question.get("/getAll", getAll);
// question.post("/questionInfo", questionInfo);
// question.post("/getOwnerquestions", getOwnerquestions);
// question.post("/addquestion", addquestion);
question.delete("/deleteAll", deleteAll);
module.exports = question;
