/* const userDB = {
  user: require("../model/user.json"),
  setUser: function (value) {
    this.user = value;
  },
}; */
const User = require("./../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.jwt) return res.sendStatus(401); //unauthorize
  const refreshToken = cookie.jwt;

  // const foundUser = userDB.user.find(
  //   (person) => person.refreshToken === refreshToken
  // );

  const foundUser = await User.findOne({ refreshToken }).exec(); //since variablename and value is same
  if (!foundUser) return res.sendStatus(403); //forbidden
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.error(err);
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
