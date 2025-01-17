// Query functions for database interactions
export const viewDepartments = async (db) => {
    const res = await db.query('SELECT * FROM department');
    console.table(res.rows);
  };
  
  export const viewRoles = async (db) => {
    const query = `
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      JOIN department ON role.department_id = department.id;
    `;
    const res = await db.query(query);
    console.table(res.rows);
  };
  
  export const viewEmployees = async (db) => {
    const query = `
      SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title AS job_title, 
        department.name AS department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id;
    `;
    const res = await db.query(query);
    console.table(res.rows);
  };
  
  export const addDepartment = async (db) => {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter the name of the new department:' },
    ]);
    await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added ${name} to departments.`);
  };
  
  export const addRole = async (db) => {
    const departments = await db.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(dept => ({ name: dept.name, value: dept.id }));
  
    const { title, salary, department_id } = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Enter the role title:' },
      { type: 'input', name: 'salary', message: 'Enter the role salary:' },
      { type: 'list', name: 'department_id', message: 'Select the department for this role:', choices: departmentChoices },
    ]);
  
    await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Added ${title} to roles.`);
  };
  
  export const addEmployee = async (db) => {
    const roles = await db.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({ name: role.title, value: role.id }));
  
    const employees = await db.query('SELECT * FROM employee');
    const managerChoices = employees.rows.map(emp => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));
    managerChoices.unshift({ name: 'None', value: null });
  
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      { type: 'input', name: 'first_name', message: "Enter the employee's first name:" },
      { type: 'input', name: 'last_name', message: "Enter the employee's last name:" },
      { type: 'list', name: 'role_id', message: "Select the employee's role:", choices: roleChoices },
      { type: 'list', name: 'manager_id', message: "Select the employee's manager:", choices: managerChoices },
    ]);
  
    await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
      first_name, last_name, role_id, manager_id,
    ]);
    console.log(`Added ${first_name} ${last_name} to employees.`);
  };
  
  export const updateEmployeeRole = async (db) => {
    const employees = await db.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(emp => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));
  
    const roles = await db.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({ name: role.title, value: role.id }));
  
    const { employee_id, role_id } = await inquirer.prompt([
      { type: 'list', name: 'employee_id', message: 'Select the employee to update:', choices: employeeChoices },
      { type: 'list', name: 'role_id', message: 'Select the new role:', choices: roleChoices },
    ]);
  
    await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log('Employee role updated successfully.');
  };
  
  // Add additional query functions as needed for managers, budgets, etc.
  export const updateEmployeeManager = async (db) => { /* ... */ };
  export const viewEmployeesByManager = async (db) => { /* ... */ };
  export const viewEmployeesByDepartment = async (db) => { /* ... */ };
  export const deleteDepartment = async (db) => { /* ... */ };
  export const deleteRole = async (db) => { /* ... */ };
  export const deleteEmployee = async (db) => { /* ... */ };
  export const viewDepartmentBudget = async (db) => { /* ... */ };  