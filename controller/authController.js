const userDB = {
  user: require("./../model/user.json"),
  setUser: function (value) {
    this.user = value;
  },
};
const bcrypt = require("bcrypt");

const handleUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: `Username and password required` });

  const findUser = userDB.user.find((people) => people.username === user);
  console.log(findUser);
  if (!findUser) return res.sendStatus(401);
  const match = await bcrypt.compare(pwd, findUser.password);
  console.log(pwd, findUser.password);
  if (match) {
    res.json({ message: `User ${user} logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleUser };
