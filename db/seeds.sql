INSERT INTO departments (department_name)
VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('Human Resources'),
  ('Finance'),
  ('Customer Service'),
  ('Research and Development'),
  ('Operations');
  


INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Manager', 80000.00, 1),
  ('Marketing Coordinator', 50000.00, 2),
  ('Software Engineer', 90000.00, 3),
  ('Human Resources Manager', 75000.00, 4),
  ('Financial Analyst', 65000.00, 5),
  ('Customer Service Representative', 40000.00, 6),
  ('Research Scientist', 100000.00, 7), 
  ('Operations Manager', 85000.00, 8);
  




INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('David', 'Lee', 3, 1),
  ('Amanda', 'Jones', 2, 3),
  ('Robert', 'Garcia', 2, 1),
  ('Jennifer', 'Kim', 3, 1),
  ('Kevin', 'Nguyen', 2, 6),
  ('Sarah', 'Chen', 1, NULL);
 