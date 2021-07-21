DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

/*
CREATE TABLE department (
 id INT NOT NULL,
 name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
 id INT NOT NULL,
 title VARCHAR(30) NOT NULL,
 department_id INT NOT NULL
);

CREATE TABLE employee (
 id INT PRIMARY KEY,
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 role_id INT,
 department_id INT NOT NULL,
 manager_id INT
);
*/

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) 
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  department_id INT,
  manager_id INT
);


