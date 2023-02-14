INSERT INTO departments (name) 
VALUES 
  ('Creative'), 
  ('Marketing'), 
  ('Production');

INSERT INTO roles (title, salary, department_id) 
VALUES 
  ('Sales Manager', 50000, 1), 
  ('Marketing Manager', 80000, 2), 
  ('Production Manager', 90000, 3), 
  ('Content Creator', 95000, 1), 
  ('Social Media Strategist', 65000, 2), 
  ('Animator', 75000, 3), 
  ('Graphic Designer', 75000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES 
  ('John', 'Doe', 1, NULL), 
  ('Jane', 'Doe', 2, 1), 
  ('Why', 'Doe', 3, 1), 
  ('Ciara', 'Johnson', 4, 1), 
  ('Janna', 'Giang', 5, 1), 
  ('Emily', 'Rice', 6, 1),
  ('Lina', 'Le', 7, 1), 
  ('Hiro', 'Nakamura', 4, 1), 
  ('Samantha', 'Smith', 3, 1), 
  ('Tom', 'Park', 7, 1);
