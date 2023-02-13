const inquirer = require("inquirer");

async function showQuestions() {
  return inquirer.prompt([
    {
      type: "list",
      name: "menuSelection",
      message: "Choose your selection.",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add A Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee",
      ],
    },
  ]);
}

function handleGetAllDepartments() {}
function handleGetAllRoles() {}
function handleGetAllEmployees() {}

async function handleAddDepartment() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What's the department's name?",
    },
  ]);
  console.log("answers ~>", answers);
  main();
}

async function handleAddRole() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the new role's name?",
    },
    {
        type: "input",
        name: "salary",
        message: "What is the new role's salary?",
    },
    {
        type: "input",
        name: "department",
        message: "Which department does this role belong to?",
    }
  ]);
  console.log("answers ~>", answers);
  main();
}

async function handleAddEmployee() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "employeeFirstName",
      message: "What is the employee's First name?",
    },
    {
      type: "input",
      name: "employeeLastName",
      message: "What is the employee's last name?",
    },

    {
      type: "input",
      name: "employeeRole",
      message: "What is the employee's role?",
    },
    {
      type: "input",
      name: "employeeManager",
      message: "Who is the employee's manager?",
    },
  ]);

  console.log("answers ~>", answers);
  main();
}

function handleUpdateEmployee() {}

function handleMenuSelection(menuSelection) {
  switch (menuSelection) {
    case "View all Departments":
      handleGetAllDepartments();
      break;
    case "View all Roles":
      handleGetAllRoles();
      break;
    case "View all Employees":
      handleGetAllEmployees();
      break;
    case "Add A Department":
      handleAddDepartment();
      break;
    case "Add a Role":
      handleAddRole();
      break;
    case "Add an Employee":
      handleAddEmployee();
      break;
    case "Update an Employee":
      handleUpdateEmployee();
      break;

    default:
      console.log("I don't know what you picked!");
  }
}

async function main() {
  const { menuSelection } = await showQuestions();
  handleMenuSelection(menuSelection);
}

main();
