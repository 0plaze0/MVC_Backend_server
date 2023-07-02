const userDB = {
  user: require("./../model/user.json"),
  setUser: function (value) {
    this.user = value;
  },
};
const bcrypt = require("bcrypt");
const { access } = require("fs");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: `Username and password required` });

  const findUser = userDB.user.find((people) => people.username === user);
  if (!findUser) return res.sendStatus(401);
  const match = await bcrypt.compare(pwd, findUser.password);
  if (match) {
    const roles = Object.values(findUser.roles); //only gets the value
    //create JWTS
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: findUser.username,
          roles: roles,
        },
      }, //payload
      process.env.ACCESS_TOKEN_SECRET, //secret key
      { expiresIn: "30s" } //options
    );
    console.log(accessToken);
    const refreshToken = jwt.sign(
      { username: findUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //saving refreshToken with current user
    const otherUsers = userDB.user.filter(
      (person) => person.username !== findUser.name
    );
    const currentUser = { ...findUser, refreshToken };
    userDB.setUser([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(userDB.user)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleUser };
