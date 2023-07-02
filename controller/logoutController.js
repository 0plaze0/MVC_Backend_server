const userDB = {
  user: require("../model/user.json"),
  setUser: function (value) {
    this.user = value;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;

  //is refresh token in db?
  const foundUser = userDB.user.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  //delete refreshToken in db
  const otherUser = userDB.user.filter(
    (person) => person.username !== foundUser.username
  );
  console.log(otherUser);
  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUser([...otherUser, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "user.json"),
    JSON.stringify(userDB.user)
  );

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
