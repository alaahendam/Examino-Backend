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
    return res.status(200).json("success to create question");
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
    return res.status(200).json("success to edit Question");
  } catch (error) {
    return res.status(400).json(error);
  }
};
// const getAll = async (req, res) => {
//   const question = await prisma.question.findMany();
//   if (question) {
//     return res.status(200).json(question);
//   } else {
//     return res.status(400).json("can't find any question");
//   }
// };
// const addquestion = async (req, res) => {
//   const { name, ownerId } = req.body;
//   var createdUser = await prisma.user.update({
//     where: {
//       id: Number(ownerId),
//     },
//     data: {
//       questions: {
//         connect: [{ id: 1 }, { id: 7 }],
//       },
//     },
//   });
//   return res.status(200).json("all questions");
// };
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
// const questionInfo = async (req, res) => {
//   const { questionName, ownerId } = req.body;
//   console.log(req.body);
//   try {
//     const question = await prisma.question.findMany({
//       where: {
//         ownerId: Number(ownerId),
//         name: questionName,
//       },
//       include: {
//         chatpers: true,
//       },
//     });
//     return res.status(200).json(question);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json("can't find any question");
//   }
// };
module.exports = {
  create,
  edit,
  //   getAll,
  //   addquestion,
  deleteAll,
  getChapterQuestions,
  //   questionInfo,
};
