const express = require("express");
const question = express.Router();
const {
  create,
  edit,
  deleteAll,
  getChapterQuestions,
  deleteQuestion,
} = require("./question.controller");
question.post("/create", create);
question.post("/getChapterQuestions", getChapterQuestions);
question.put("/edit", edit);
question.delete("/deleteQuestion/:id", deleteQuestion);
question.delete("/deleteAll", deleteAll);
module.exports = question;
