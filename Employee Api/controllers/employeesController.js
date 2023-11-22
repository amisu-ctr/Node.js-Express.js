// const data = {
//     employees : require('../model/employees.json'),
//     setEmployees: function(data) {this.employees = data}
// }
// const fsPromises = require('fs').promises
// const path = require('path')

const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "No employees found" });
  res.json(employees);
  // res.json(data.employees);
};

const createNewEmployee = async (req, res) => {
//   const newEmployee = {
//     id: data.employees[data.employees.length - 1].id + 1 || 1,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//   };

//   if (!newEmployee.firstname || !newEmployee.lastname) {
//     return res
//       .status(400)
//       .json({ message: "First and last names are required." });
//   }

//   data.setEmployees([...data.employees, newEmployee]);

//   await fsPromises.writeFile(
//     path.join(__dirname, "..", "model", "employees.json"),
//     JSON.stringify(data.employees)
//   );

//   res.status(201).json(data.employees);
if(!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({'message': 'First and last names are required'})
}
try {
    const result = await Employee.create({
        firstname: req.body>firstname,
        lastname: req.body.lastname
    })
    res.status(201).json(result)
}catch (err) {
console.log(err)
}
};


const updateEmployee = async (req, res) => {
//   const employee = data.employees.find(
//     (emp) => emp.id === parseInt(req.body.id)
//   );

if(!req?.body?.id) {
    return res.status(400).json({'msessage': 'ID parameter is required'})
}

const employee = await Employee.findOne({_id: req.body.id})

  if (!employee) {
    return res
      .status(204)
      .json({ "message": `No employee matches ID ${req.body.id}` });
  }

  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  
//   const filteredArray = data.employees.filter(
//     (emp) => emp.id !== parseInt(req.body.id)
//   );
//   const unsortedArray = [...filteredArray, employee];
//   data.setEmployees(
//     unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
//   );
  res.json(result);
};

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message': 'Employee ID required'});
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if (!employee) {
        return res
          .status(204)
          .json({ "message": `No employee matches ID ${req.body.id}` });
      }
//   const employee = data.employees.find(
//     (emp) => emp.id === parseInt(req.body.id)
//   );
 
//   const filteredArray = data.employees.filter(
//     (emp) => emp.id !== parseInt(req.body.id)
//   );
//   data.setEmployees([...filteredArray]);

const result = await employee.deleteOne({_id: req.body.id});
res.json(result)
//   res.json(data.employees);
};

const getEmployee = async (req, res) => {
//   const employee = data.employees.find(
//     (emp) => emp.id === parseInt(req.params.id)
//   );
if (!req?.params?.id) return res.status(400).json({'message': "Employee ID required"})
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
