/* const fsPromises = require("fs").promises;
const path = require("path");
 */
/* const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
}; */

const Employee = require("./../model/Employees");

const getAllEmployees = async (req, res) => {
  const employee = await Employee.find();
  if (!employee) res.send(204).json({ message: "No employee" });
  res.json(employee);
};

const createNewEmployees = async (req, res) => {
  const newEmployee = {
    /*     id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1, */
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  // data.setEmployees([...data.employees, newEmployee]);
  try {
    await Employee.create(newEmployee);
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployees = async (req, res) => {
  /* const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); */
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee id required" });
  const employee = await Employee.findById(req.body.id);
  if (!employee)
    res.status(400).json({ message: `Employee Id:${req.body.id} not found` });
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  /*  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  unsortedArray.filter((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  data.setEmployees(unsortedArray); */
  await employee.save();
  res.json(employee);
};

const deleteEmployee = async (req, res) => {
  /*  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); */
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee id required" });
  const employee = await Employee.findById(req.body.id);
  console.log(employee);
  if (!employee)
    return res
      .status(204)
      .json({ message: `Employee id:${req.body.id} not found` });
  /*   const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]); */
  await employee.deleteOne();

  res.json(employee);
};

const getAEmployee = async (req, res) => {
  /* const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); */
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee id required" });
  const employee = await Employee.findOne({ _id: req.params.id }); //reads directly from url
  if (!employee)
    return res
      .status(204)
      .json({ message: `Employee id:${req.body.id} not found` });
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployees,
  updateEmployees,
  deleteEmployee,
  getAEmployee,
};
