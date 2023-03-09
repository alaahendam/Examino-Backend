const { PrismaClient } = require("@prisma/client");
const { TokenExpiredError } = require("jsonwebtoken");
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
const deleteStudent = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const deleteUsers = await prisma.LevelsOnUsers.deleteMany({
      where: {
        ...data,
      },
    });
    return res.status(200).send("success delete student");
  } catch (error) {
    console.log(error);
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
  const { levelName, ownerId, specialCode } = req.body;
  console.log(req.body);
  try {
    const level = await prisma.level.findMany({
      where: {
        ownerId: Number(ownerId),
        name: levelName,
        specialCode: specialCode,
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
const getLevel = async (req, res) => {
  const data = req.body;
  console.log(req.body);
  try {
    const level = await prisma.level.findUnique({
      where: data,
      include: {
        owner: true,
      },
    });
    if (level) {
      return res.status(200).json(level);
    } else {
      return res.status(400).json("can't find any level");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("can't find any level");
  }
};
const addLevelOnUser = async (req, res) => {
  const { userId, levelId } = req.body;
  try {
    const levelOnUser = await prisma.levelsOnUsers.create({
      data: {
        user: { connect: { id: userId } },
        level: { connect: { id: levelId } },
      },
    });
    res.status(200).json(levelOnUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send("can't add Student in this level");
  }
};
const checkStudentApproved = async (req, res) => {
  const { userId, levelId } = req.body;
  try {
    const levelOnUser = await prisma.levelsOnUsers.findUnique({
      where: {
        userId_levelId: {
          userId: userId,
          levelId: levelId,
        },
      },
    });
    if (levelOnUser) {
      res.status(200).json(levelOnUser);
    } else {
      return res.status(400).send("Student not exist in this level");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Student not exist in this level");
  }
};
const getLevelStudents = async (req, res) => {
  const { id } = req.params;
  try {
    const levelOnUser = await prisma.levelsOnUsers.findMany({
      where: {
        levelId: Number(id),
      },
      include: {
        user: true,
      },
    });
    if (levelOnUser) {
      res.status(200).json(levelOnUser);
    } else {
      return res.status(400).send("Student not exist on this level");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Student not exist in this level");
  }
};
const ownerApproved = async (req, res) => {
  const { userId, levelId } = req.body;
  try {
    const ownerApprove = await prisma.levelsOnUsers.update({
      where: {
        userId_levelId: {
          userId: userId,
          levelId: levelId,
        },
      },
      data: {
        ownerApproved: true,
      },
    });
    return res.status(200).send("ownerApprove");
  } catch (error) {
    console.log(error);
    return res.status(400).send("cant update owner Approve");
  }
};
const studentMemberships = async (req, res) => {
  try {
    const memberships = await prisma.levelsOnUsers.findMany({
      where: {
        userId: Number(req.params.id),
      },
      select: {
        level: {
          select: {
            owner: true,
            name: true,
          },
        },
        ownerApproved: true,
      },
    });
    return res.status(200).json(memberships);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
module.exports = {
  create,
  edit,
  getAll,
  addLevel,
  deleteStudent,
  getOwnerLevels,
  levelInfo,
  getLevel,
  addLevelOnUser,
  checkStudentApproved,
  getLevelStudents,
  ownerApproved,
  studentMemberships,
};
