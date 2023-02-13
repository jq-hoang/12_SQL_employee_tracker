const inquirer = require("inquirer");
const mysql = require("mysql2");

const DBConnection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

const rolesSQLQuery = `SELECT 
roles.*,
departments.name as department_name
FROM 
roles 
INNER JOIN departments ON roles.department_id = departments.id;`;

const employeesSQLQuery = `SELECT 
employees.*, 
roles.title as role_title, 
roles.salary, 
departments.name as department_name,
managers.first_name as manager_first_name,
managers.last_name as manager_last_name
FROM 
employees 
INNER JOIN roles ON employees.role_id = roles.id
INNER JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees as managers ON employees.manager_id = managers.id;`;

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

async function handleGetAllDepartments() {
  const [rows] = await DBConnection.promise().query("SELECT * FROM departments");
  console.table(rows);
  main();
}

async function handleGetAllRoles() {
  const [rows] = await DBConnection.promise().query(rolesSQLQuery);
  console.table(rows);
  main();
}

async function handleGetAllEmployees() {
  const [rows] = await DBConnection.promise().query(employeesSQLQuery);
  console.table(rows);
  main();
}

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
    },
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
