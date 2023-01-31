const bcrypt = require("bcrypt");

const test = "$2b$10$uctA8Y6kq5lztesFx3II4.ebmrntlG.rFLvGeiD8oQ6WsXnl97G1y";
const login = async (req, res) => {
  const { name, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log(password);
  if (bcrypt.compare(password, test)) {
    return res.status(200).json("success");
  } else {
    return res.status(400).json("cant login");
  }
};
const create = (req, res) => {
  console.log(req.body);
  return res.status(200).json(req.body);
};
const edit = (req, res) => {
  console.log(req.body);
  return res.status(200).json(req.body);
};
const getAll = (req, res) => {
  console.log(req.body);
  return res.status(200).json(req.body);
};
module.exports = {
  login,
  create,
  edit,
  getAll,
};
