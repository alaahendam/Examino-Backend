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
    return res.status(200).json(createChapter);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
module.exports = {
  create,
};
