const express = require("express");
const studentExam = express.Router();
const {
  create,
  submitExam,
  getStudentExams,
} = require("./studentExam.controller");
studentExam.post("/create", create);
studentExam.put("/submitExam", submitExam);
studentExam.post("/getStudentExams", getStudentExams);
module.exports = studentExam;
