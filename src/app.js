require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("../routes/user/user.router");
const levelRouter = require("../routes/level/level.router");
const chapterRouter = require("../routes/chapter/chapter.router");
const questionRouter = require("../routes/question/question.router");
const examRouter = require("../routes/exam/exam.router");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/level", levelRouter);
app.use("/chapter", chapterRouter);
app.use("/question", questionRouter);
app.use("/exam", examRouter);

module.exports = app;
