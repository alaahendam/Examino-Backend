const express = require("express");
const studentExam = express.Router();
const { create } = require("./studentExam.controller");
studentExam.post("/create", create);
// studentExam.post("/studentstudentExams", studentstudentExams);
module.exports = studentExam;
