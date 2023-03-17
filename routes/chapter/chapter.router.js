const express = require("express");
const chapter = express.Router();
const { create } = require("./chapter.controller");
chapter.post("/create", create);

module.exports = chapter;
