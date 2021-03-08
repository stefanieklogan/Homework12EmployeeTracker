USE companyDB;

INSERT INTO department (dept_name) 
VALUES 
("Executive Office"),
("Food & Beverage"),
("Support");

INSERT INTO role (role, salary, department_id) 
VALUES 
("Owner", 100000.00, 1),
("Business Manager", 50000.00, 3),
("Bakery Lead", 63000.00, 2),
("Baker I", 55000.00, 2),
("Baker II", 45000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("Betsy","Boston",1,null),
("Michelle","Reynolds",3,1),
("Pamela","Fox",2,1),
("Stefanie","Logan",4,2),
("Jeremy","Davis",4,2),
("Rachel","Gotts",5,2),
("David","Himes",5,2);