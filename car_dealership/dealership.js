// Dependencies & Configuration
const config = require("./lib/config");
const express = require("express");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const { body, validationResult } = require("express-validator");
const store = require("connect-loki");
const PgPersistence = require("./lib/pg-persistence");
const catchError = require("./lib/catch-error");

const app = express();
const host = config.HOST;
const port = config.PORT;
const LokiStore = store(session);

// View Engine Setup
app.set("views", "./views");
app.set("view engine", "pug");

// Middleware
app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 31 * 24 * 60 * 60 * 1000, 
    path: "/",
    secure: false,
  },
  name: "launch-school-dealership-session-id",
  resave: false,
  saveUninitialized: false,
  secret: config.SECRET,
}));
app.use(flash());

// Create a new datastore
app.use((req, res, next) => {
  res.locals.store = new PgPersistence(req.session);
  next();
});

// Extract session info
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.signedIn = req.session.signedIn;
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

// Authentication Middleware
const requiresAuthentication = (req, res, next) => {
  if (!res.locals.signedIn) {
    console.log("Unauthorized. Please try again");
    req.flash("error", "Please sign in to access")
    res.redirect(302, "/users/signin");
  } else {
    next();
  }
}

// Home Route
app.get("/", (req, res) => {
  res.redirect("/users/signin");
});

// Authentication Routes
// Display sign in page
app.get("/users/signin", (req, res) => {
  res.render("signin")
})

// User sign in
app.post("/users/signin", catchError(async (req, res, next) => {
  let {username, password} = req.body;
  
  let authenticated = await res.locals.store.authenticate(username, password);
  
  if (!authenticated) {
    req.flash("error", "Invalid credentials!");
    res.render("signin", {
      flash: req.flash(),
      username: req.body.username,
    });
  } else {
    req.session.username = username;
    req.session.signedIn = true;
    res.redirect("/employeeList")
  }
}));

// Allow user to signout 
app.post("/users/signout", (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error);
    }
    res.redirect("/users/signin");
  });
});

// Employee List Routes
// Display list of employees page
app.get("/employeeList", requiresAuthentication, catchError(async (req, res) => {
  let store = res.locals.store
  let page = parseInt(req.query.page) || 1
  let limit = 5
   
  let employeeList = await store.loadEmployeesWithSaleCount(page, limit);
  let totalEmployees = await store.getTotalEmployeeCount()
  let totalPages = Math.ceil(totalEmployees / limit)
  if (page > totalPages && totalPages > 0 || req.query.page && isNaN(parseInt(req.query.page)) ){
    req.flash("error", "Invalid page number")
    req.flash("error", "Page does not exist. Showing page 1")
    res.redirect(`employeeList?page=1`)
  }
  
  res.render("employee-list", { 
    employeeList,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  })
}))

// Search name to check on an employee sales record
app.post("/employeeList/employee-sales", 
  requiresAuthentication,
  [
    body("employeeName")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Name must be valid!")
  ], 
  catchError(async (req, res) => {
    let errors = validationResult(req);
    let employeeName = req.body.employeeName;
    let employeeList = await res.locals.store.loadEmployeesWithSaleCount();
    
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));
      res.redirect(`/employeeList`);
    } else {
      let existEmployeeName = await res.locals.store.notEmployeeName(employeeName)
      if (!existEmployeeName) {
        req.flash("error", "Employee not found!");
        res.redirect(`/employeeList`);
      } else {
        let employeeId = await res.locals.store.loadEmployeeId(employeeName);
        res.redirect(`/employeeList/${employeeId}/sales`);
      }
    }
  })
);

// Render a new employee page
app.get("/employee/new", requiresAuthentication, catchError(async (req, res) => {
  res.render("employee-new")
}))

// Add a new employee
app.post("/employee/new", requiresAuthentication,
  [
    body("employeeName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("The employee name is required!")
      .isLength({ max: 100 })
      .withMessage("Employee name must be between 1 and 100 characters!"),
    body("email")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Email is required!")
      .isLength({ max: 100 })
      .withMessage("Email must be between 1 and 100 characters!")
      .isEmail()
      .withMessage("Must be a valid email address!")
  ], 
  catchError(async (req, res, next) => {
    let errors = validationResult(req)
    let employeeName = req.body.employeeName
    let email = req.body.email
    
    const rerenderNewList = () => {
      res.render("employee-new", {
        employeeName,
        flash: req.flash(),
      })
    }
    
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg))
      rerenderNewList()
    } else if (await res.locals.store.existsEmployeeName(employeeName)) {
      req.flash("error", "The employee name already exist!")
      rerenderNewList()
    } else if (await res.locals.store.existingEmail(email)) {
      req.flash("error", "The email already exist!")
      rerenderNewList()
    } else {
      let created = await res.locals.store.newEmployee(employeeName, email);
      if (!created) {
        next(new Error("Failed to add an employee"))
      } else {
        req.flash("success", "A new employee has been added")
        res.redirect("/employeeList")
      }
    }
  })
)

// Display edit employee 
app.get("/employeeList/:employeeId/edit", requiresAuthentication, catchError(async (req, res) => {
  let employeeId = req.params.employeeId;
  let validEmployeeId = await res.locals.store.validateEmployeeId(employeeId);
     if (!validEmployeeId){
      return res.status(404).send(`Not found. Invalid employee ID `);
    }
  let employee = await res.locals.store.loadEmployee(+employeeId)
  if (!employee) throw new Error("not found")
  res.render("employee-edit", { employee })
}))

// Edit an employee email
app.post("/employeeList/:employeeId/edit", requiresAuthentication, 
  [
    body("employeeEmail")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Email must be between 1 and 100 characters!")
  ], 
  catchError(async (req, res, next) => {
    let errors = validationResult(req)
    let employeeEmail = req.body.employeeEmail
    let employeeId = req.params.employeeId
    let validEmployeeId = await res.locals.store.validateEmployeeId(employeeId);
     if (!validEmployeeId){
      return res.status(404).send(`Not found. Invalid employee ID `);
    }
    let employee = await res.locals.store.loadEmployee(+employeeId)
    
    const rerenderNewList = () => {
      res.render("employee-edit", {
        employee,
        flash: req.flash(),
      })
    }
    
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg))
      rerenderNewList()
    } else if (await res.locals.store.existingEmail(employeeEmail)) {
      req.flash("error", "The email already existed!")
      rerenderNewList()
    } else {
      let created = await res.locals.store.updateEmail(employeeId, employeeEmail)
      if (!created) {
        next(new Error("Failed to update email!"))
      } else {
        req.flash("sucess", "Update email successfully")
        res.redirect("/employeeList")
      }
    }
  })
)

// Delete an employee
app.post("/employeeList/:employeeId/delete", requiresAuthentication, catchError(async (req, res, next) => {
  let employeeId = req.params.employeeId;
  let deleteEmployee = await res.locals.store.deleteEmployees(+employeeId)
  if (!deleteEmployee) throw new Error("Failed to remove employee!")
  req.flash("success")
  res.redirect("/employeeList")
}))

// Sales Management Routes
// Display an employee sales record
app.get("/employeeList/:employeeId/sales", 
  requiresAuthentication, 
  catchError(async (req, res) => {
    let employeeId = req.params.employeeId;
    let page = parseInt(req.query.page) || 1;
    let limit = 5; 
    let validEmployeeId = await res.locals.store.validateEmployeeId(employeeId);
     if (!validEmployeeId){
      req.flash("error", "Invalid page number")
      req.flash("error", "Page does not exist. Showing page 1")
      res.redirect(`/employeeList/${employeeId}/sales?page=1`)
    }
    
    let employeeName = await res.locals.store.loadEmployeeName(+employeeId);
    let employeeSaleList = await res.locals.store.employeeSales(+employeeId, page, limit);
    let totalSales = await res.locals.store.getTotalSalesCount(+employeeId);
    let totalPages = Math.ceil(totalSales / limit);
    if (page > totalPages && totalPages > 0 || req.query.page && isNaN(parseInt(req.query.page)) ){
      req.flash("error", "Invalid page number")
      req.flash("error", "Page does not exist. Showing page 1")
      res.redirect(`/employeeList/${employeeId}/sales?page=1`)
    }
    res.render("employee-sales", { 
      employeeSaleList, 
      employeeName, 
      employeeId,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  })
);


// Display page to add a sale to an employee sale record
app.get("/employeeList/sales/:employeeId/add", catchError(async (req, res) => {
  let employeeId = +req.params.employeeId
  let validEmployeeId = await res.locals.store.validateEmployeeId(employeeId);
     if (!validEmployeeId){
      return res.status(404).send(`Not found. Invalid employee ID `);
    }
  let employeeName = await res.locals.store.loadEmployeeName(employeeId)
  res.render("add-sales", { employeeId, employeeName })
}))

// Add a sale to an employee sale record
app.post("/employeeList/sales/:employeeId/add", 
  requiresAuthentication, 
  [
    body("brand")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Brand is required!")
      .isLength({ max: 100 })
      .withMessage("Brand name must be between 1 and 100 characters!"),
    body("model")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Model is required!")
      .isLength({ max: 100 })
      .withMessage("Model must be between 1 and 100 characters!"),
    body("year")
      .trim()
      .notEmpty()
      .withMessage("Year is required!")
      .isInt({ min: 1900, max: 2025 })
      .withMessage("Year must be a valid year between 1900 and 2025!"),
    body("date")
      .trim()
      .notEmpty()
      .withMessage("Date is required!")
      .isISO8601()
      .withMessage("Date must be a valid date format!")
      .custom((value) => {
        if (new Date(value) > new Date()) {
          throw new Error("Date cannot be in the future!");
        }
        return true
      })
      .isAfter('2025-10-31')
      .isBefore('2025-12-01')
      .withMessage("Date must be within November 2025!"),    
    body("price") 
      .trim()
      .notEmpty()
      .withMessage("Price is required!")
      .isNumeric()
      .withMessage("Price must be a valid number!")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number!")
  ], 
  catchError(async (req, res) => {
    let errors = validationResult(req);
    let employeeId = +req.params.employeeId;
    let employeeName = await res.locals.store.loadEmployeeName(employeeId)
    let { brand, model, year, date, price } = req.body;
    
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));
      res.render("add-sales", {
        employeeId, 
        employeeName,
        brand,
        model,
        year,
        date,
        price,
        flash: req.flash()
      })
    } else {
      let addSale = await res.locals.store.addSale(brand, model, year, date, price, employeeId)
      if (!addSale) {
        req.flash("error", "Unable to add the sale");
        res.render("add-sales", { employeeId, employeeName })
      }
      res.redirect(`/employeeList/${employeeId}/sales`);
    }
  })
); 
// Delete a sale record
app.post("/employeeList/sales/:employeeId/:saleId/delete", requiresAuthentication, catchError(async (req, res) => {
  let employeeId = req.params.employeeId
  let saleId = req.params.saleId
  let validEmployeeId = await res.locals.store.validateEmployeeId(employeeId);
    if (!validEmployeeId){
      res.status(404).send(`Not found. Invalid employee ID `);
    }
  let validSaleId = await res.locals.store.validateSaleId(saleId);
     if (!validSaleId){
      return res.status(404).send(`Not found. Invalid sale ID `);
    }
  let employeeName = await res.locals.store.loadEmployeeName(+employeeId)
  let deleted = await res.locals.store.deleteSale(+employeeId, +saleId)
  if (!deleted) throw new Error("Not found")
  let employeeSaleList = await res.locals.store.employeeSales(employeeId)
  res.render("employee-sales", { employeeSaleList, employeeName, employeeId })
}))

// Display edit sale price
app.get("/employeeList/sales/:employeeId/:saleId/edit-price", requiresAuthentication, catchError(async (req, res) => {
  let employeeId = +req.params.employeeId
  let saleId = +req.params.saleId
  let validEmployeeId = await res.locals.store.validateEmployeeId(employeeId);
    if (!validEmployeeId){
      res.status(404).send(`Not found. Invalid employee ID `);
    }
  let validSaleId = await res.locals.store.validateSaleId(saleId);
     if (!validSaleId){
      return res.status(404).send(`Not found. Invalid sale ID `);
    }
  let salePrice = await res.locals.store.loadSalePrice(saleId)
  res.render("edit-sale-price", { saleId, salePrice, employeeId })
}))

// Edit sale price
app.post("/employeeList/sales/:employeeId/:saleId/edit-price", requiresAuthentication,
  [
    body("price") 
      .trim()
      .notEmpty()
      .withMessage("Price is required!")
      .isNumeric()
      .withMessage("Price must be a valid number!")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number!")
  ],
  catchError(async (req, res) => {
    let employeeId = +req.params.employeeId
    let saleId = +req.params.saleId
    let errors = validationResult(req)
    let newPrice = req.body.price
    let salePrice = await res.locals.store.loadSalePrice(saleId)
    
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg))
      res.render("edit-sale-price", {
        saleId,
        salePrice,
        employeeId,
        newPrice,
        flash: req.flash()
      })
    } else {
      let updatePrice = await res.locals.store.updateSalePrice(newPrice, saleId)
      if (!updatePrice) {
        req.flash("error", "Unable to add the sale!");
        res.render("add-sales", res.render("edit-sale-price", {
          saleId,
          salePrice,
          employeeId,
          newPrice,
          flash: req.flash()
        }))
      }
      req.flash("succes", "Update price successfully")
      res.redirect(`/employeeList/${employeeId}/sales`)
    }
  })
)
app.use((req, res) => {
  res.status(404).render("404", {
    message: "Page not found"
  });
});

// Server Listener
app.listen(port, host, () => {
  console.log(`Todos is listening on port ${port} of ${host}!`);
});