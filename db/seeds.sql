
INSERT INTO department
  (name)
VALUES
  ('Design'),
  ('Lightning'),
  ('Structure'),
  ('Sales');


INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Jr. Architect', 85000, 1),
  ('Engineer', 75000, 2),
  ('Lightningh designer', 125000, 3),
  ('Project salesman', 200000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Azul', 'Lobos', 1, 4),
  ('Cristina', 'Rios', 2, 3),
  ('Jesus', 'Piñon', 3, 1),
  ('Estefany', 'Garcia', 4, 5);