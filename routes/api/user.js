const express = require("express");
const router = express.Router();
const UserController = require("./../../controller/userController");
const ROLES_LIST = require("./../../config/roles_list");
const verifyRoles = require("./../../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    UserController.getAllUsers
  )
  .put(verifyRoles(ROLES_LIST.Admin), UserController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), UserController.deleteUser);

router
  .route("/:id")
  .get(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    UserController.getAnUser
  );

module.exports = router;
