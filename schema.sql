DROP DATABASE IF EXISTS companyDB;
CREATE DATABASE companyDB;

USE companyDB;

CREATE TABLE department(
  dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30)
);

CREATE TABLE role(
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(30),
  salary DECIMAL (6,0),
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(dept_id)
);

CREATE TABLE employee(
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);

----------------------------------------------------------------------
INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES 
(1, "Kristi", "Breen", 11, 0),
(2, "Scott", "Barton", 12, 1),
(3, "Steve", "Crow", 12, 1),
(4, "Stefanie", "Logan", 13, 2),
(5, "Pamela", "Fox", 21, 3),
(6, "Amy", "Alexander", 31, 3);

INSERT INTO role (role_id, title, salary, department_id)
VALUES 
(11, "Vice President", 250000, 111),
(12, "Manager", 150000, 111),
(13, "Engineer", 100000, 111),
(21, "Accountant", 80000, 222),
(31, "Sales Manager", 75000, 333);

INSERT INTO department (dept_id, dept_name)
VALUES 
(111, "Technology"),
(222, "Accounting"),
(333, "Marketing");