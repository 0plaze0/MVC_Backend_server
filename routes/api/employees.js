const express = require("express");
const router = express.Router();
const employeeController = require("../../controller/employeeController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.createNewEmployees
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.updateEmployees
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);
router.route("/:id").get(employeeController.getAEmployee);

module.exports = router;
