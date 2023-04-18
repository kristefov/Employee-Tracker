DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db;

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL 
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(60) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT  NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
);