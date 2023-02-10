const bcrypt = require("bcrypt");
const { jwtSign, jwtVerify } = require("../../src/utilities/token");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (req, res) => {
  const { name, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
    include: {
      ownedLevels: true,
      LevelsOnUsers: true,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwtSign({
      id: user.id,
      name: user.name,
      role: user.role,
      userId: user.userId,
      password: null,
    });
    return res
      .status(200)
      .json({ token: token, data: { ...user, password: null } });
  } else {
    return res.status(400).json("cant login");
  }
};
const create = async (req, res) => {
  console.log(req.body);
  const { name, userId, email, telephone, password, role } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  if (user) return res.status(409).json("Username is already used");

  try {
    var createdUser = await prisma.user.create({
      data: {
        name: name,
        password: encryptedPassword,
        userId: Number(userId),
        telephone: telephone,
        email: email,
        role: role,
      },
    });
    return res.status(200).json("success to create user");
  } catch (error) {
    return res.status(400).json(error);
  }
};
const edit = (req, res) => {
  console.log(req.body);
  return res.status(200).json(req.body);
};
const getAll = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      ownedLevels: true,
      LevelsOnUsers: true,
    },
  });
  if (users) {
    return res.status(200).json(users);
  } else {
    return res.status(400).json("can't find any user");
  }
};
const getUser = async (req, res) => {
  console.log(req.body);
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      ownedLevels: true,
    },
  });
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(400).json("not found");
  }
};
const deleteAll = async (req, res) => {
  try {
    const deleteUsers = await prisma.user.deleteMany();
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
};
const checkToken = async (req, res) => {
  prisma.user
    .findUnique({
      where: { id: req.body.tokenUser.id },
      include: {
        ownedLevels: true,
        LevelsOnUsers: true,
      },
    })
    .then((user) => {
      req.body.tokenUser = { ...user, password: null };
      res.send(req.body.tokenUser);
    })
    .catch((e) => {
      console.log(e);
      res.status(401).send("Invalid token.");
    });
};
module.exports = {
  login,
  create,
  edit,
  getAll,
  getUser,
  deleteAll,
  deleteUser,
  checkToken,
};
