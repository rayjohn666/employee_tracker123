CREATE TABLE employee_info (
);

-- INSERT INTO employee_info
SELECT
  employee.id,
  employee.first_name,
  employee.last_name,
  roles.title,
  department.name AS department,
  roles.salary,
  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee 
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department.id
LEFT JOIN employee ON employee.manager_id = manager.id;

