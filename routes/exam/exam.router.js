const express = require("express");
const exam = express.Router();
const {
  create,
  studentExams,
  getAllTeacherExams,
} = require("./exam.controller");
exam.post("/create", create);
exam.post("/studentExams", studentExams);
exam.get("/getAllTeacherExams/:id", getAllTeacherExams);
module.exports = exam;
