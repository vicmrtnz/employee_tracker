import inquirer from 'inquirer';
import pkg from 'pg';
import {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewDepartmentBudget,
} from './dbQueries.js';

const { Client } = pkg;

// Database connection configuration
const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_tracker', 
  password: 'Babybenji0413@', 
  port: 5432,
});

db.connect()
  .then(() => console.log('Connected to the database!'))
  .catch(err => console.error('Connection error', err.stack));

// Main menu function
const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Update Employee Manager',
        'View Employees by Manager',
        'View Employees by Department',
        'Delete a Department',
        'Delete a Role',
        'Delete an Employee',
        'View Department Budget',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      await viewDepartments(db);
      break;
    case 'View All Roles':
      await viewRoles(db);
      break;
    case 'View All Employees':
      await viewEmployees(db);
      break;
    case 'Add a Department':
      await addDepartment(db);
      break;
    case 'Add a Role':
      await addRole(db);
      break;
    case 'Add an Employee':
      await addEmployee(db);
      break;
    case 'Update an Employee Role':
      await updateEmployeeRole(db);
      break;
    case 'Update Employee Manager':
      await updateEmployeeManager(db);
      break;
    case 'View Employees by Manager':
      await viewEmployeesByManager(db);
      break;
    case 'View Employees by Department':
      await viewEmployeesByDepartment(db);
      break;
    case 'Delete a Department':
      await deleteDepartment(db);
      break;
    case 'Delete a Role':
      await deleteRole(db);
      break;
    case 'Delete an Employee':
      await deleteEmployee(db);
      break;
    case 'View Department Budget':
      await viewDepartmentBudget(db);
      break;
    case 'Exit':
      console.log('Goodbye!');
      db.end();
      return;
  }

  mainMenu(); // Return to the main menu
};

// Start the application
mainMenu();