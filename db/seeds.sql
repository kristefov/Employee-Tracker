INSERT INTO departments (id, department_name)
VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('Human Resources'),
  ('Finance'),
  ('Customer Service'),
  ('Research and Development'),
  ('Operations'),
  ('Information Technology'),
  ('Legal'),


INSERT INTO positions (id, title, salary, department_id)
VALUES
  ('Sales Manager', 80000.00),
  ('Marketing Coordinator', 50000.00),
  ('Software Engineer', 90000.00),
  ('Human Resources Manager', 75000.00),
  ('Financial Analyst', 65000.00),
  ('Customer Service Representative', 40000.00),
  ('Research Scientist', 100000.00),
  ('Operations Manager', 85000.00,),
  ('Systems Administrator', 70000.00),




INSERT INTO employees(id, first_name, last_name, role_id, manager_id) 
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('David', 'Lee', 3, 1),
  ('Amanda', 'Jones', 2, 3),
  ('Robert', 'Garcia', 2, 1),
  ('Jennifer', 'Kim', 3, 1),
  ('Kevin', 'Nguyen', 2, 6),
  ('Sarah', 'Chen', 1, NULL),
 