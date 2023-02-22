const express = require("express");
const exam = express.Router();
const { create, studentExams } = require("./exam.controller");
exam.post("/create", create);
exam.post("/studentExams", studentExams);
module.exports = exam;
