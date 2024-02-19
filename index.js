const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to database '${DB_NAME}'.`)
);

const startupQuestions = [
  {
    type: "list",
    name: "start",
    message: "Chose one of the following options",
    choices: [
      "View departments",
      "View roles",
      "View employees",
      "Add department",
      "Add role",
      "Add employee",
      "Update employee role",
    ],
  },
];

const addDep = [
  {
    type: "input",
    name: "newDep",
    message: "Please type in the name of the department you are adding.",
  },
];

const addRole = [
  {
    type: "input",
    name: "newRole",
    message: "Please type in the name of the role you are adding.",
  },
];

const addEmp = [
  {
    type: "input",
    name: "newEmp",
    message: "Please type in the first name of the employee you are adding.",
  },
];

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

function askPromptQuestions() {
  inquirer.prompt(startupQuestions).then((choice) => {
    let nextPrompt = [];

    switch (choice.start) {
      case "View departments":
        getAllDepartments()
          .then(() => askPromptQuestions())
          .catch((err) => {
            console.error(err, "\nError showing data. Please try again.");
            askPromptQuestions();
          });
        break;
      case "View roles":
        getAllRoles()
          .then(() => askPromptQuestions())
          .catch((err) => {
            console.error(err, "\nError showing data. Please try again.");
            askPromptQuestions();
          });
        break;
      case "View employees":
        getAllEmployees()
          .then(() => askPromptQuestions())
          .catch((err) => {
            console.error(err, "\nError showing data. Please try again.");
            askPromptQuestions();
          });
      case "Add department":
        nextPrompt = addDep;
        break;
      case "Add role":
        nextPrompt = addRole;
        break;
      case "Add employee":
        nextPrompt = addEmp;
        break;
      case "Update employee role":
        nextPrompt = updateEmp;
        break;
      default:
        console.log("Invalid input. Please select a valid option.");
        return askPromptQuestions(); // Ask startup questions again
    }
  });
}

askPromptQuestions();
