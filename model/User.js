const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number, //this two are not always required so required no given
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String, //while registering it will not have refresh token
  },
});

module.exports = mongoose.model("User", userSchema);
