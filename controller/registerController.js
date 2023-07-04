/* const userDB = {
  user: require("./../model/user.json"),
  setUser: function (value) {
    this.user = value;
  },
}; //When we use json to store and retrive info*/
const User = require("../model/User");

/* const fsPromises = require("fs").promises;
const path = require("path"); */
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) res.status(400).json({ message: "user and pwd required" });
  //const duplicate = userDB.user.find((people) => people.username === user);
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    /*     const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPwd,
    };
    userDB.setUser([...userDB.user, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(userDB.user)
    );
    console.log(newUser); */

    //create and store
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    /*  const newUser = new User();
   newUser.username....
    const result = await newUser.save(); */

    console.log(result);
    res.status(201).json({ success: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
