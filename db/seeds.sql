INSERT INTO department (department_name)
VALUES  ("Squires"),
        ("Mess Cooks"),
        ("Knights"),
        ("Lords"),
        ("Artilley Men");

INSERT INTO roles (title, salary, department_id)
VALUES ("1st Cook", 30000, 2),
       ("Saucié", 40000, 2),
       ("Squire 1", 50000, 1),
       ("Squire 2", 60000, 1),
       ("Knight 1", 75000, 3),
       ("Knight 2", 85000, 3),
       ("Duke of Edinburough", 100000, 4),
       ("King of England", 1000000, 4),
       ("Artillery Soldier", 60000, 5),
       ("Artillery Engineer", 70000, 5);  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rowan", "Atkinson", 2, NULL),
       ("David", "Attenborough", 4, 1),
       ("Gary", "Oldman", 4, 2),
       ("Ralph", "Fiennes", 3, 3),
       ("Sean", "Connery", 3, 4),
       ("Steven", "Segal", 1, 5),
       ("Steve", "Austin", 1, 6),
       ("John Claude", "Vandamme", 5, 7),
       ("Arnold", "Schwarzenegger", 5, 8);     