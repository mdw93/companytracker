
-- Test date to prepopulate our database

-- role ids/titles 11 = Manager, 12 = Analyst and 13 = Intern

USE employee_db;

-- Create departments
INSERT INTO department (name)
VALUES ('Finance'), ('Marketing'), ('Accounting'), ('Sales'), ('HR');

INSERT INTO role (title, department_id, salary)
VALUES 
-- managers
('Manager', 1, 100000), ('Manager', 2, 100000), ('Manager', 3, 100000), ('Manager', 4, 100000), ('Manager', 5, 100000),
-- analysts
('Analyst', 1, 75000), ('Analyst', 2, 75000), ('Analyst', 3, 75000), ('Analyst', 4, 75000), ('Analyst', 5, 75000),
-- interns
('Intern', 1, 35000), ('Intern', 2, 35000), ('Intern', 3, 35000), ('Intern', 4, 35000), ('Intern', 5, 35000);


INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id)
VALUES 
('Edd', 'Edwardson', 11, 0, 1), ('Jill', 'Jannerson', 11, 0, 2), 
('Frank', 'Funky', 11, 0, 3), ('Ann', 'Alberston', 11, 0, 4), ('Tim', 'Timmyston', 11, 0, 5),
-- Analysts 
('John', 'James', 12, 1, 1), ('Edward', 'Tough', 12, 2, 2), ('Dave', 'France', 12, 3, 3), 
('George', 'Jefferson', 12, 4, 4), ('Mike', 'Applewood', 12, 5, 5),
-- Interns 
('Phil', 'Forty', 13, 1, 1), ('Elizabeth', 'Etwinds', 13, 2, 2), ('Forest', 'Green', 13, 3, 3), 
('Jimmy', 'Williams', 13, 4, 4), ('Mike', 'Earsman', 13, 5, 5)


/*
-- Create departments
INSERT INTO department (id, name)
VALUES (1, 'Finance'), (2, 'Marketing'), (3, 'Accounting'), (4, 'Sales'), (5, 'HR');

INSERT INTO role (id, title, department_id)
VALUES 
-- managers
(1, 'Manager', 1), (2, 'Manager', 2), (3, 'Manager', 3), (4, 'Manager', 4), (5, 'Manager', 5),
-- analysts
(6, 'Analyst', 1), (7, 'Analyst', 2), (8, 'Analyst', 3), (9, 'Analyst', 4), (10, 'Analyst', 5),
-- interns
(11, 'Intern', 1), (12, 'Intern', 2), (13, 'Intern', 3), (14, 'Intern', 4), (15, 'Intern', 5);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id, department_id)
VALUES 
(1, 'Edd', 'Edwardson', 11, 0, 1), (2, 'Jill', 'Jannerson', 11, 0, 2), 
(3, 'Frank', 'Funky', 11, 0, 3), (4, 'Ann', 'Alberston', 11, 0, 4), (5, 'Tim', 'Timmyston', 11, 0, 5),
-- Analysts 
(6, 'John', 'James', 12, 1, 1), (7, 'Edward', 'Tough', 12, 2, 2), (8, 'Dave', 'France', 12, 3, 3), 
(9, 'George', 'Jefferson', 12, 4, 4), (10, 'Mike', 'Applewood', 12, 5, 5),
-- Interns 
(11, 'Phil', 'Forty', 13, 1, 1), (12, 'Elizabeth', 'Etwinds', 13, 2, 2), (13, 'Forest', 'Green', 13, 3, 3), 
(14, 'Jimmy', 'Williams', 13, 4, 4), (15, 'Mike', 'Earsman', 13, 5, 5);
*/
