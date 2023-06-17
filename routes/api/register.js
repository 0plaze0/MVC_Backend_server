const express = require("express");
const router = express.Router();
const registerController = require("./../../controller/registerController");

router.route("/").post(registerController.handleNewUser);

module.exports = router;
