const { dbQuery } = require("./db-query");
const bcrypt = require("bcrypt");

module.exports = class PgPersistence {
  constructor(session) {
    this.username = session.username;
  }

  // Authentication and validation
  async authenticate(username, password) {
    const FIND_HASHED_PASSWORD = "SELECT password from managers WHERE username = $1"
    let result = await dbQuery(FIND_HASHED_PASSWORD, username)
    if(result.rowCount === 0) return false

    return bcrypt.compare(password,result.rows[0].password)
  }
  async validateEmployeeId(id){
    const ID_LIST = "SELECT EXISTS (SELECT * FROM employees WHERE id = $1)"
    let result = await dbQuery(ID_LIST, id)
    return result.rows[0].exists;
  }
  async validateSaleId(id){
    const ID_LIST = "SELECT EXISTS (SELECT * FROM sales WHERE id = $1)"
    let result = await dbQuery(ID_LIST, id)
    return result.rows[0].exists;
  }

  // Employee queries
  async loadEmployeesWithSaleCount(page = 1, limit = 10) {
    const offset = (page -1) * limit
    const LIST_EMPLOYEES = `
      SELECT e.id, e.name, e.email, COUNT(s.id) AS sale_count
      FROM employees AS e
      LEFT JOIN sales AS s ON e.id = s.employee_id
      GROUP BY e.id, e.name, e.email
      ORDER BY LOWER(e.name) ASC LIMIT $1 OFFSET $2`
    let result = await dbQuery(LIST_EMPLOYEES, limit, offset);
    return result.rows;
  }
  async getTotalEmployeeCount() {
    const COUNT_EMPLOYEES = "SELECT count(*) FROM EMPLOYEES"
    let result = await dbQuery(COUNT_EMPLOYEES)
    return parseInt(result.rows[0].count)
  }
  async loadEmployee(employeeId){
    const LOAD_EMPLOYEE = "SELECT * FROM employees WHERE id = $1"
    let result = await dbQuery(LOAD_EMPLOYEE, employeeId)
    return result.rows[0]
  }
  async loadEmployeeId(employeeName){
    const EMPLOYEE_NAME = `SELECT id FROM employees WHERE LOWER(name) = LOWER($1)`
    let result = await dbQuery(EMPLOYEE_NAME, employeeName)
    return result.rows[0].id
  }
  async loadEmployeeName(employeeId){
    const EMPLOYEE_NAME = `SELECT name FROM employees WHERE id = $1`
    let result = await dbQuery(EMPLOYEE_NAME, employeeId)
    return result.rows[0].name
  }
  async newEmployee(name, email){
    const ADD_EMPLOYEE = "INSERT INTO employees (name, email) VALUES ($1,$2)"
  
    let result = await dbQuery(ADD_EMPLOYEE, name, email);
    console.log(result.rows + "new employeee")
    return result.rowCount > 0;
    
  }
  async updateEmail(id, email){
    const UPDATE_EMAIL = "UPDATE employees SET email = $1 WHERE id = $2";
    
    let result = await dbQuery(UPDATE_EMAIL, email, id)
    return result.rowCount > 0;
  }
  async deleteEmployees(id){
    const DELETE_EMPLOYEE = "DELETE FROM employees WHERE id = $1";
    
    let result = await dbQuery(DELETE_EMPLOYEE, id)
    console.log("hello")
    console.log(result.rowCount)
    return result.rowCount > 0;
  }
  async existsEmployeeName(name){
    const CHECK_EMPLOYEE = "SELECT null FROM employees WHERE name = $1"
    let result = await dbQuery(CHECK_EMPLOYEE,name)
    return result.rowCount > 0; 
  }
  async notEmployeeName(name){
    const CHECK_EMPLOYEE = "SELECT EXISTS (SELECT * FROM employees WHERE LOWER(name) = LOWER($1))";
    let result = await dbQuery(CHECK_EMPLOYEE, name)
    return result.rows[0].exists;
  }
  async existingEmail( email){
    const CHECK_EMAIL = "SELECT null FROM employees WHERE email = $1"
    let result = await dbQuery(CHECK_EMAIL, email)
    return result.rowCount > 0;
  }
  async employeeSaleAmount(employeeId){
    const SALE_AMOUNT = "SELECT count(id) FROM sales WHERE employee_id = $1"
    let result = await dbQuery(employeeId)
    //check if not exist?
    return result.rows;
  }
  

  // Sales queries
  async employeeSales(employeeId, page = 1, limit = 5){
    let offset = (page - 1) * limit
    const EMPLOYEE_SALES = `SELECT sales.id AS sale_id, car_brand, car_model, car_year, sold_date, price
                            FROM sales WHERE sales.employee_id = $1
                            ORDER BY sold_date ASC, car_brand ASC LIMIT $2 OFFSET $3`
    
    let result = await dbQuery(EMPLOYEE_SALES, employeeId, limit, offset)
    return result.rows
  }
  async getTotalSalesCount(employeeId){ 
    const COUNT_SALES = "SELECT COUNT(*) FROM sales WHERE employee_id = $1";
    let result = await dbQuery(COUNT_SALES, employeeId);
    return parseInt(result.rows[0].count);
  }
  async loadSalePrice(saleId){
    const SALE_PRICE = "SELECT price from sales WHERE id = $1"
    let result = await dbQuery(SALE_PRICE, saleId)
    return result.rows[0].price
  }
  async addSale(carBrand, carModel,carYear,date, price,employeeId,){
    const ADD_SALE = "INSERT INTO sales ( car_brand, car_model,car_year ,sold_date, price, employee_id) VALUES ( $1,$2,$3,$4,$5,$6)"
    let result = await dbQuery(ADD_SALE, carBrand, carModel, carYear, date, price, employeeId)
    return result.rowCount > 0;
  }
  async updateSalePrice(price, saleId){
    const UPDATE_PRICE = "UPDATE sales SET price = $1 WHERE id = $2"
    
    let result = await dbQuery(UPDATE_PRICE, price,saleId)
    return result.rowCount > 0
  }
  async deleteSale(employeeId,saleId){
    const DELETE_SALE = "DELETE FROM sales WHERE employee_id = $1 AND id = $2"
    let result = await dbQuery(DELETE_SALE, employeeId, saleId)
    return result.rowCount > 0
  }
};