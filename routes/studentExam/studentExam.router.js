const express = require("express");
const studentExam = express.Router();
const {
  create,
  submitExam,
  getStudentExams,
  studentCertificates,
} = require("./studentExam.controller");
studentExam.post("/create", create);
studentExam.put("/submitExam", submitExam);
studentExam.post("/getStudentExams", getStudentExams);
studentExam.get("/studentCertificates/:id", studentCertificates);
module.exports = studentExam;
