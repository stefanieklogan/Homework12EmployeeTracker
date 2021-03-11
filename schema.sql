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
  FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
);