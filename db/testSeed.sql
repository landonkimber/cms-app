INSERT INTO departments (id, name) VALUES
(1, 'Jedi'),
(2, 'Aviation'),
(3, 'Political');


INSERT INTO roles (id, title, salary, department_id) VALUES
(1, 'Pilot', 80000, 2),
(2, 'Astro Droid', 0, 2),
(3, 'Jedi Master', 250000, 1),
(4, 'Senator', 120000, 3),
(5, 'Jedi Knight', 100000, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Master', 'Yoda', 1, NULL),
(2, 'Sheev', 'Palpatine', 4, NULL),
(3, 'Anakin', 'Skywalker', 5, 1),
(4, 'Plo', 'Koon', 1, 1),
(5, 'R2', 'D2', 2, 3),
(6, 'Count', 'Dooku', 3, 2), 
(7, 'Mace', 'Windu', 3, 1),
(8, 'Padme', 'Amidala', 4, 1);
