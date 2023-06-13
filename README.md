# sql-employee-tracker-12

## Description

Challenge 12: SQL Employee Tracker

User Story

AS A business owner I WANT to be able to view and manage the departments, roles, and employees in my company SO THAT I can organize and plan my business

Acceptance Criteria

GIVEN a command-line application that accepts user input WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee rol
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Technologies Used

Node.js, JavaScript, and SQL, Mysql2, dotenv, inquirer, console.table

## Installation

1. Clone the repo

2. Open integrated terminal to install packages:

* enter: npm init -y
* enter: npm i inquirer@8.2.4
* enter: npm i sequelize mysql2 dotenv

3. Create the database:

* log into your mysql -uroot
* SOURCE db/schema.sql;
* SOURCE db/seeds.sql;
* quit

4. Start the app:

* enter: npm start

## How To

Use arrow and enter keys, follow prompts to choose a Department, Role, or Employee. Can view, add, and update

## Visuals

![Screenshot](/assets/Screenshot%202023-06-13%20at%203.46.28%20PM.png)
