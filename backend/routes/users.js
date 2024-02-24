const express = require('express');
const router = express.Router();
const Sign = require("../controller/SignLoginController");
const { createAccount, getAccount } = require('../controller/AccountInfoController');
const verifyToken = require("../Auth/UserAuth");
const { getcustomer, createcustomer, updateCustomer, deleteCustomer } = require('../controller/CustomerController');
const { getemployee, createemployee, updateemployee, deleteemployee } = require('../controller/EmployeeController');
const { getcompanies, updatecompanies, deletecompanies } = require('../controller/CompanyController');

// function isAuthenticated(req, res, next) {
//   if (verifyToken(req)) {
//     return next();
//   }
//   res.json({ message: 'Unauthorized' });
// }


//Account Route
router.post('/api/auth/login', Sign.loginUser);
router.post('/api/auth/signup', Sign.signupUser);
router.post('/api/accountinfo', createAccount);
router.get('/api/accountinfo', getAccount);

//Customer Route
router.post('/api/customers', createcustomer);
router.get('/api/customers', getcustomer);
router.put('/api/customers/:id', updateCustomer)
router.delete('/api/deletecustomer/:emailAddress', deleteCustomer)


//Employee Route
router.post('/api/employees', createemployee);
router.get('/api/employees', getemployee);
router.put('/api/employees/:id', updateemployee)
router.delete('/api/deleteemployee/:emailAddress', deleteemployee)

//Comapany Route
router.get('/api/companies', getcompanies);


module.exports = router;