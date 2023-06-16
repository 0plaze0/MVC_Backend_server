const express = require("express");
const router = express.Router();
const employeeController = require("../../controller/employeeController");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createNewEmployees)
  .put(employeeController.updateEmployees)
  .delete(employeeController.deleteEmployee);
router.route("/:id").get(employeeController.getAEmployee);

module.exports = router;
