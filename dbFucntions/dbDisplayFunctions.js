
const db = require('../config'); // Assuming you have a database module


function getAllDepartments() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM departments", function (err, results) {
        if (err) {
          reject(err, "\nError fetching data. Try again.");
        } else {
          console.log(`----- Now showing all departments -----`);
          results.forEach((element) => {
            console.log(`
  -----ID: ${element.id}
       NAME: ${element.name}`);
          });
          console.log("\nAll departments shown!");
          resolve();
        }
      });
    });
  }
  
  function getAllRoles() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM roles", function (err, results) {
        if (err) {
          reject(err, "\nError fetching data. Try again.");
        } else {
          console.log(`----- Now showing all roles -----`);
          results.forEach((element) => {
            console.log(`
  -----ID: ${element.id}
       TITLE: ${element.title}
       SALARY: ${element.salary}
       DEPARTMENT_ID: ${element.department_id}`);
          });
          console.log("\nAll roles shown!");
          resolve();
        }
      });
    });
  }
  
  function getAllEmployees() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM employees", function (err, results) {
        if (err) {
          reject(err, "\nError fetching data. Try again.");
        } else {
          console.log(`----- Now showing all employees -----`);
          results.forEach((element) => {
            console.log(`
  -----ID: ${element.id}
       NAME: ${element.first_name} ${element.last_name}
       ROLE_ID: ${element.role_id}
       MANAGER ID: ${element.manager_id}`);
          });
          console.log("\nAll employees shown!");
          resolve();
        }
      });
    });
  }
module.exports = { getAllDepartments, getAllRoles, getAllEmployees };