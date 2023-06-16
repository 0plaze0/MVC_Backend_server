const fsPromises = require("fs").promises;
const path = require("path");

const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployees = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployees = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee)
    res.status(400).json({ message: `Employee Id:${req.body.id} not found` });
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  unsortedArray.filter((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  data.setEmployees(unsortedArray);
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (!employee)
    return res
      .status(400)
      .json({ message: `Employee id:${req.body.id} not found` });
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getAEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee)
    return res
      .status(400)
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
