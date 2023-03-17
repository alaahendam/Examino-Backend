const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
  console.log(req.body);
  const { chapterId, difficulty, type, details } = req.body;
  delete details.difficulty;
  delete details.questionType;
  try {
    var createquestion = await prisma.question.create({
      data: {
        chapter: { connect: { id: Number(chapterId) } },
        difficulty: difficulty,
        type: type,
        details: details,
      },
    });
    console.log(createquestion);
    return res.status(200).json(createquestion);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const edit = async (req, res) => {
  const id = req.body.id;
  const data = req.body;
  delete data.id;
  try {
    var question = await prisma.question.update({
      where: {
        id: id,
      },
      data: data,
    });
    return res.status(200).json(question);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteAll = async (req, res) => {
  try {
    const deleteQuestion = await prisma.question.deleteMany();
    return res.status(200).json("success");
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getChapterQuestions = async (req, res) => {
  const { chapterId } = req.body;
  try {
    const questions = await prisma.question.findMany({
      where: {
        chapterId: Number(chapterId),
      },
    });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(400).json("can't find any question");
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const deleteQuestion = await prisma.question.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json("success to delete Question");
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  create,
  edit,
  deleteAll,
  getChapterQuestions,
  deleteQuestion,
};
