const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
  console.log(req.body);
  const { name, specialCode, ownerId } = req.body;
  try {
    var createdUser = await prisma.level.create({
      data: {
        name: name,
        specialCode: specialCode,
        owner: { connect: { id: Number(ownerId) } },
      },
    });
    return res.status(200).json("success to create user");
  } catch (error) {
    return res.status(400).json(error);
  }
};
const edit = async (req, res) => {
  const { name, id } = req.body;
  try {
    var createdUser = await prisma.level.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    return res.status(200).json("success to create user");
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getAll = async (req, res) => {
  const level = await prisma.level.findMany();
  if (level) {
    return res.status(200).json(level);
  } else {
    return res.status(400).json("can't find any level");
  }
};
const addLevel = async (req, res) => {
  const { name, ownerId } = req.body;
  var createdUser = await prisma.user.update({
    where: {
      id: Number(ownerId),
    },
    data: {
      levels: {
        connect: [{ id: 1 }, { id: 7 }],
      },
    },
  });
  return res.status(200).json("all levels");
};
const deleteAll = async (req, res) => {
  try {
    const deleteUsers = await prisma.level.deleteMany();
    return res.status(200).json("success");
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getOwnerLevels = async (req, res) => {
  const { id } = req.body;
  try {
    const levels = await prisma.level.findMany({
      where: {
        ownerId: Number(id),
      },
    });
    return res.status(200).json(levels);
  } catch (error) {
    return res.status(400).json("can't find any level");
  }
};
const levelInfo = async (req, res) => {
  const { levelName, ownerId } = req.body;
  console.log(req.body);
  try {
    const level = await prisma.level.findMany({
      where: {
        ownerId: Number(ownerId),
        name: levelName,
      },
      include: {
        chapters: true,
      },
    });
    return res.status(200).json(level);
  } catch (error) {
    console.log(error);
    return res.status(400).json("can't find any level");
  }
};
module.exports = {
  create,
  edit,
  getAll,
  addLevel,
  deleteAll,
  getOwnerLevels,
  levelInfo,
};
