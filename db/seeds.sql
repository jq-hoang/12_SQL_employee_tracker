INSERT INTO departments (name) 
VALUES 
  ('Sales'), 
  ('Marketing'), 
  ('IT');

INSERT INTO roles (title, salary, department_id) 
VALUES 
  ('Sales Manager', 50000, 1), 
  ('Marketing Manager', 60000, 2), 
  ('IT Manager', 80000, 3), 
  ('Sales Associate', 35000, 1), 
  ('Marketing Coordinator', 45000, 2), 
  ('IT Support', 55000, 3);

INSERT INTO employees (first_name, last_name, role_id) 
VALUES 
  ('John', 'Doe', 1), 
  ('Jane', 'Doe', 2), 
  ('Jim', 'Smith', 3), 
  ('Ciara', 'Johnson', 4), 
  ('Janna', 'Giang', 5), 
  ('Emily', 'Davis', 6);
