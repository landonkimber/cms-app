const inquirer = require("inquirer");

const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
} = require("./dbFucntions/dbDisplayFunctions");

const {
  addDBDepartment,
  addDBRole,
  addDBEmployee,
} = require("./dbFucntions/dbAddFunctions");

const { updateDBEmployee } = require("./dbFucntions/dbUpdateFunctions");

const startupQuestions = [
  {
    type: "list",
    name: "start",
    message:
      "Chose one of the following options.\nPress Ctrl+C to quit at anytime.",
    choices: [
      "View departments",
      "View roles",
      "View employees",
      "Add department",
      "Add role",
      "Add employee",
      "Update employee",
      "QUIT",
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
    name: "title",
    message: "Please type in the name of the role you are adding.",
  },
  {
    type: "input",
    name: "salary",
    message: "Please type in the salary of the role you are adding.",
  },
  {
    type: "input",
    name: "depId",
    message: "Please type in the department id of the role you are adding.",
  },
];

const addEmp = [
  {
    type: "input",
    name: "firstname",
    message: "Please type in the first name of the employee you are adding.",
  },
  {
    type: "input",
    name: "lastname",
    message: "Please type in the last name of the employee you are adding.",
  },
  {
    type: "input",
    name: "roleId",
    message: "Please type in the role id of the employee you are adding.",
  },
  {
    type: "input",
    name: "managerId",
    message:
      "Please type in the id of the manager of the employee you are adding.",
  },
];

const upEmp = [
  {
    type: "input",
    name: "id",
    message: "Please type in the id of the employee you are updating.",
  },
  {
    type: "input",
    name: "firstname",
    message: "Please type in the first name of the employee you are updating.",
  },
  {
    type: "input",
    name: "lastname",
    message: "Please type in the last name of the employee you are updating.",
  },
  {
    type: "input",
    name: "roleId",
    message: "Please type in the role id of the employee you are updating.",
  },
  {
    type: "input",
    name: "managerId",
    message:
      "Please type in the id of the manager of the employee you are updating.",
  },
]

function askPromptQuestions() {
  inquirer.prompt(startupQuestions).then((choice) => {
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
        break;
      case "Add department":
        inquirer
          .prompt(addDep)
          .then((entry) => {
            addDBDepartment({ name: entry.newDep })
              .then(() => askPromptQuestions())
              .catch((err) => {
                console.error(
                  err,
                  "\nError adding department. Please try again."
                );
                askPromptQuestions();
              });
          })
          .catch((err) => {
            console.error(err, "\nError showing data. Please try again.");
            askPromptQuestions();
          });
        break;
      case "Add role":
        inquirer
          .prompt(addRole)
          .then((entry) => {
            addDBRole({
              title: entry.title,
              salary: entry.salary,
              department_id: entry.depId,
            })
              .then(() => askPromptQuestions())
              .catch((err) => {
                console.error(err, "\nError adding role. Please try again.");
                askPromptQuestions();
              });
          })
          .catch((err) => {
            console.error(err, "\nError showing data. Please try again.");
            askPromptQuestions();
          });
        break;
      case "Add employee":
        inquirer
          .prompt(addEmp)
          .then((entry) => {
            addDBEmployee({
              first_name: entry.firstname,
              last_name: entry.lastname,
              role_id: entry.roleId,
              manager_id: entry.managerId,
            })
              .then(() => askPromptQuestions())
              .catch((err) => {
                console.error(
                  err,
                  "\nError adding employee. Please try again."
                );
                askPromptQuestions();
              });
          })
          .catch((err) => {
            console.error(err, "\nError showing data. Please try again.");
            askPromptQuestions();
          });
        break;
      case "Update employee role":
        inquirer
          .prompt(upEmp)
          .then((entry) => {
            updateDBEmployee({
              id: entry.id,
              first_name: entry.firstname,
              last_name: entry.lastname,
              role_id: entry.roleId,
              manager_id: entry.managerId,
            })
              .then(() => askPromptQuestions())
              .catch((err) => {
                console.error(
                  err,
                  "\nError updating employee. Please try again."
                );
                askPromptQuestions();
              });
          })
          .catch((err) => {
            console.error(err, "\nError showing data. Please try again.");
            askPromptQuestions();
          });
        break;
      default:
        console.log("Invalid input. Please select a valid option.");
        return askPromptQuestions();
    }
  });
}

askPromptQuestions();
