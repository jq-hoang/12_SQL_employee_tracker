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

// how to create helpers ?
// store all these queries in a helper and import them to be called upon ??

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
// is there a simpler way? This SQL query took way too long to figure out how to do.
// how to implement managers into this? MOdify schema to include  manager crows foot??

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
  const [rows] = await DBConnection.promise().query(
    "SELECT * FROM departments"
  );
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

  try {
    const query = `INSERT INTO departments (name) VALUES (?)`;
    await DBConnection.promise().query(query, [answers.departmentName]);
    console.log(`Successfully added the new department: ${answers.departmentName}`);
  } catch (error) {
    console.error(`Error adding new department: ${error}`);
  }

  main();
}


async function handleAddRole() {
  const [departments] = await DBConnection.promise().query("SELECT id, name FROM departments");
  console.log('departments ~>', departments);
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
      type: "list",
      name: "departmentId",
      message: "Which department does this role belong to?",
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    },
  ]);

  try {
    const query = `INSERT INTO roles (title, salary, department_id)
                   VALUES (?, ?, ?)`;
    await DBConnection.promise().query(query, [
      answers.roleName,
      answers.salary,
      answers.departmentId,
    ]);
    console.log(`Successfully added the new role: ${answers.roleName}`);
  } catch (error) {
    console.error(`Error adding new role: ${error}`);
  }
  main();
}


async function handleAddEmployee() {

  const [roles] = await DBConnection.promise().query(
    "SELECT * FROM roles"
  );

  // const [managers] = await DBConnection.promise().query(
  //   "SELECT CONCAT(first_name, ' ', last_name) as Managers FROM employees"
  // );

  // const roleChoices = await getRoles();
  // const managerChoices = await getManagers();

  const { first_name, last_name, role, manager } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: roles.map((role) => ({
        name: role.title,
        value: role.id,
      })),
    },
  ]);

  try {
    const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                   VALUES (?, ?, ?, ?)`;
    await DBConnection.promise().query(query, [first_name, last_name, role, manager]);
    console.log(`Successfully added the new employee: ${first_name} ${last_name}`);
  } catch (error) {
    console.error(`Error adding new employee: ${error}`);
  }

  main();
}



async function handleUpdateEmployee() {
  // Get all employees and display them
  const [employees] = await DBConnection.promise().query(
    "SELECT * FROM employees"
  );
  console.table(employees);

  // Ask user which employee to update
  const { employee } = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee's role would you like to update?",
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })),
    },
  ]);

  // Get all roles
  const [roles] = await DBConnection.promise().query("SELECT * FROM roles");

  // Ask user for the new role for the selected employee
  const { role } = await inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "What is the new role for the employee?",
      choices: roles.map((roles) => ({ name: roles.title, value: roles.id })),
    },
  ]);

  // Update the employee's role
  await DBConnection.promise().query(
    "UPDATE employees SET role_id = ? WHERE id = ?",
    [role, employee]
  );
  console.log(`Employee's role has been updated to ${role}`);

  main();
}

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
