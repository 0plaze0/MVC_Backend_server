const userDB = {
  user: require("./../model/user.json"),
  setUser: function (value) {
    this.user = value;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) res.status(400).json({ message: "user and pwd required" });
  const duplicate = userDB.user.find((people) => people.username === user);
  if (duplicate) return res.sendStatus(400);
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashedPwd };
    userDB.setUser([...userDB.user, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(userDB.user)
    );
    console.log(newUser);
    res.status(201).json({ success: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
