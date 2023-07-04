const User = require("./../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find().exec();
  if (!users)
    return res.status(204).json({ message: "No User in the Database" });
  res.json(users);
};

const updateUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "user id required" }); //BAD request
  const user = await User.findOne({ _id: req.body.id });
  if (!user) return res.status(404).json({ message: "No such user found" });

  if (req.body?.username) user.username = req.body.username;
  if (req.body?.roles) user.roles = req.body.roles;

  const result = await user.save();
  res.json({ result });
};
const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "user id required" }); //BAD request
  const user = await User.findOne({ _id: req.body.id });
  if (!user) return res.status(404).json({ message: "No such user found" });
  const result = await user.deleteOne();
  res.json(result);
};

const getAnUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User id required" });

  const user = await User.findOne({ _id: req.params.id });
  res.json(user);
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
  getAnUser,
};
