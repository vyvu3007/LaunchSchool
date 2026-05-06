# Golden car dealership tracker
A web application for managing car dealership employees and their sale records for the month of November 2025.

## Description 
Golden Auto Car dealership is a full-stack web application that allows user to manage employees information and track their sales.
Users can add, delete or edit employees information or their sale records.

## How it's made:
Technologies used: HTML, CSS, JavaScript
- **Node.js** v18.17.1
- **Express.js**
- **PostgreSQL** psql (PostgreSQL) 14.20
- **Pug**
- **express-validator**

## Installation and set up
Install these applications before begin
- Node.js
- PostgreSQL
- npm

1. Install dependencies
```bash
npm install
```

2. Configuration
Using enviroment variables in `.env` file for configuration

3. Create a PostgreSQL database:
```bash 
createdb -U postgres car_dealership
```

4. Run the schema file and load seed data:
```bash
psql -U postgres -d car_dealership < schema.sql
psql -U postgres -d car_dealership < lib/seed-data.sql
psql -U postgres -d car_dealership < lib/users.sql
```

5. Start application
```bash
npm start
```

## Usage

1. Sign In
To gain access to the application, sign in with username and password
- username: `manager`
- password: `access`
2. Employee management
- View list of employees
- Add a new employee
- Edit employee emails
- Delete employees
- Enter employee names to access their sales
3. Employee sale records
- Add a new sale
- Delete a sale
- Edit price of a sale



## Note for users
User passwords in the database are encrypted using bcrypt except for username : `technitian`
Sales can only be recorded for dates within November 2025
Each employee must have a unique email address
Case insensitive when searching for employee sale record. 
Sales are organized by oldest to latest. 