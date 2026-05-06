CREATE TABLE managers (
  username text UNIQUE,
  password text NOT NULL
);

CREATE TABLE employees (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  email text );
CREATE TABLE sales (
  id serial PRIMARY KEY,
  car_brand text NOT NULL,
  car_model text NOT NULL,
  car_year integer NOT NULL,
  sold_date date NOT NULL DEFAULT CURRENT_DATE,
  price integer NOT NULL,
  employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL
);