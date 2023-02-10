const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
  console.log(req.body);
  const { name, levelId } = req.body;
  try {
    var createChapter = await prisma.chapter.create({
      data: {
        name: name,
        level: { connect: { id: Number(levelId) } },
      },
    });
    console.log(createChapter);
    return res.status(200).json("success to create chapter");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
// const edit = async (req, res) => {
//   const { name, id } = req.body;
//   try {
//     var createdUser = await prisma.chapter.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name: name,
//       },
//     });
//     return res.status(200).json("success to create user");
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };
// const getAll = async (req, res) => {
//   const chapter = await prisma.chapter.findMany();
//   if (chapter) {
//     return res.status(200).json(chapter);
//   } else {
//     return res.status(400).json("can't find any chapter");
//   }
// };
// const addchapter = async (req, res) => {
//   const { name, ownerId } = req.body;
//   var createdUser = await prisma.user.update({
//     where: {
//       id: Number(ownerId),
//     },
//     data: {
//       chapters: {
//         connect: [{ id: 1 }, { id: 7 }],
//       },
//     },
//   });
//   return res.status(200).json("all chapters");
// };
// const deleteAll = async (req, res) => {
//   try {
//     const deleteUsers = await prisma.chapter.deleteMany();
//     return res.status(200).json("success");
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };
// const getOwnerchapters = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const chapters = await prisma.chapter.findMany({
//       where: {
//         ownerId: Number(id),
//       },
//     });
//     return res.status(200).json(chapters);
//   } catch (error) {
//     return res.status(400).json("can't find any chapter");
//   }
// };
// const chapterInfo = async (req, res) => {
//   const { chapterName, ownerId } = req.body;
//   console.log(req.body);
//   try {
//     const chapter = await prisma.chapter.findMany({
//       where: {
//         ownerId: Number(ownerId),
//         name: chapterName,
//       },
//       include: {
//         chatpers: true,
//       },
//     });
//     return res.status(200).json(chapter);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json("can't find any chapter");
//   }
// };
module.exports = {
  create,
  //   edit,
  //   getAll,
  //   addchapter,
  //   deleteAll,
  //   getOwnerchapters,
  //   chapterInfo,
};
