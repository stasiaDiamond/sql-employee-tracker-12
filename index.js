const inquirer = require("inquirer");
// const mysql = require("mysql2");
const db = require("./db/connection");

const PORT = process.env.PORT || 3001;

// begin inquirer prompts
function promptUser() {
  inquirer
    .prompt({
      type: "list",
      name: "mainMenu",
      message: "What would you like to do first?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add Employee",
        "Update Employee Role",
      ],
    })
    .then(function (answers) {
      switch (answers.mainMenu) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add A Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
      }
    });
}

//  table for viewing employees
function viewAllEmployees() {
  db.query(
    `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
      ORDER BY employee.id;
    `,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

//  must have the ID of employee and ID of role to update
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the ID of the employee you want to update?",
        name: "employeeId",
      },
      {
        type: "input",
        message: "What is the ID of ne role you are assigning them?",
        name: "roleId",
      },
    ])
    .then((res) => {
      const employeeId = parseInt(res.employeeId);
      const roleId = parseInt(res.roleId);

      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId],
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          promptUser();
        }
      );
    });
}

// roles table viewing
function viewAllRoles() {
  db.query(
    `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY role.id;
    `,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      promptUser();
    }
  );
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        type: "list",
        name: "department",
        message: "Choose:",
        choices: [
          "Sales",
          "IT",
          "Marketing",
          "Operations",
          "Finance",
          "Customer Support",
        ],
      },
    ])
    .then((answers) => {
      const department = answers.department;
      let departmentId;

      switch (department) {
        case "Sales":
          departmentId = 1;
          break;
        case "IT":
          departmentId = 2;
          break;
        case "Marketing":
          departmentId = 3;
          break;
        case "Operations":
          departmentId = 4;
          break;
        case "Finance":
          departmentId = 5;
          break;
        case "Customer Support":
          departmentId = 6;
          break;
        default:
          // if entered incorrectly
          console.log("Invalid department selected.");
          promptUser();
          return;
      }

      const query = `
        INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)
      `;
      const values = [answers.title, answers.salary, departmentId];
      db.query(query, values, (err, res) => {
        if (err) throw err;
        promptUser();
      });
    });
}

// for adding an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter last name:",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the role ID?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager ID?",
      },
    ])
    .then((answers) => {
      const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
      `;
      const values = [
        answers.firstName,
        answers.lastName,
        parseInt(answers.roleId),
        parseInt(answers.managerId) || null,
      ];
      db.query(query, values, (err, res) => {
        if (err) throw err;
        promptUser();
      });
    });
}

// adding departments
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "Name of department:",
    })
    .then((answer) => {
      // insert the department into the database
      const query = `INSERT INTO department (name) VALUES (?)`;
      const values = [answer.departmentName];
      db.query(query, values, (err, res) => {
        if (err) throw err;
        promptUser();
      });
    });
}

function viewAllDepartments() {
  db.query(
    `
    SELECT * FROM department;
    `,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    }
  );
}

promptUser();
