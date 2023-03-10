const express = require("express");
const exam = express.Router();
const {
  create,
  studentExams,
  getAllTeacherExams,
  deleteExam,
} = require("./exam.controller");
exam.post("/create", create);
exam.post("/studentExams", studentExams);
exam.get("/getAllTeacherExams/:id", getAllTeacherExams);
exam.delete("/deleteExam/:id", deleteExam);
module.exports = exam;
