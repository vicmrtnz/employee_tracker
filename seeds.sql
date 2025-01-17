-- Clear existing data (use TRUNCATE to reset primary keys)
TRUNCATE employee, role, department RESTART IDENTITY CASCADE;

-- Populate the department table
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources');

-- Populate the role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Accountant', 60000, 2),
('HR Manager', 75000, 3);

-- Populate the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),      -- No manager
('Jane', 'Smith', 2, 1),      -- Reports to John Doe
('Emily', 'Jones', 3, 2);     -- Reports to Jane Smith