# employee_tracker

Description

The Employee Tracker is a command-line application built using Node.js, Inquirer, and PostgreSQL. It allows business owners to manage their company's departments, roles, and employees efficiently. The application provides various functionalities, including viewing, adding, and updating data, as well as advanced features like budget calculations and hierarchical views of employees.

Table of Contents

Description

Installation

Usage

Features

Technologies Used

Database Schema

Future Enhancements

License

Installation

Clone the repository to your local machine:

git clone https://github.com/yourusername/employee-tracker.git

Navigate to the project directory:

cd employee-tracker

Install the dependencies:

npm install

Create a .env file (optional) for storing database credentials.

Set up the database:

Use pgAdmin 4 or a terminal to create the employee_tracker database.

Execute the SQL schema and seeds file:

psql -U your_username -d employee_tracker -f ./db/schema.sql
psql -U your_username -d employee_tracker -f ./db/seeds.sql

Usage

Start the application:

node index.js

Follow the on-screen prompts to perform operations like viewing departments, roles, and employees or adding new records.

Example Workflow:

View all employees to get a quick overview.

Add a new department, role, or employee.

Update an employee's role or manager.

View the total budget utilized by a specific department.

Features

Basic CRUD Operations:

View all departments, roles, and employees.

Add new departments, roles, and employees.

Update employee roles.

Advanced Features:

Update employee managers.

View employees grouped by manager.

View employees grouped by department.

Delete departments, roles, or employees.

Calculate the total budget of a department.

Technologies Used

Node.js

Inquirer.js

PostgreSQL

pg (Node.js PostgreSQL client)

Database Schema

The application uses the following schema:

Tables:

department

id: SERIAL PRIMARY KEY

name: VARCHAR(30) UNIQUE NOT NULL

role

id: SERIAL PRIMARY KEY

title: VARCHAR(30) UNIQUE NOT NULL

salary: DECIMAL NOT NULL

department_id: INTEGER NOT NULL REFERENCES department(id)

employee

id: SERIAL PRIMARY KEY

first_name: VARCHAR(30) NOT NULL

last_name: VARCHAR(30) NOT NULL

role_id: INTEGER NOT NULL REFERENCES role(id)

manager_id: INTEGER REFERENCES employee(id)

Future Enhancements

Add authentication and authorization to secure sensitive operations.

Create a web-based front-end interface for easier interaction.

Add analytics features like headcount trends or salary distributions.

License

This project is licensed under the MIT License.

Video Walkthrough:



