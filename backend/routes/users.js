const express = require('express');
const router = express.Router();
const Sign = require("../controller/SignLoginController");
const { createAccount, getAccount } = require('../controller/AccountInfoController');
const verifyToken = require("../Auth/UserAuth");
const { getcustomer, createcustomer, updateCustomer, deleteCustomer } = require('../controller/CustomerController');

// function isAuthenticated(req, res, next) {
//   if (verifyToken(req)) {
//     return next();
//   }
//   res.json({ message: 'Unauthorized' });
// }

router.post('/api/auth/login', Sign.loginUser);
router.post('/api/auth/signup', Sign.signupUser);

router.post('/api/accountinfo', createAccount);
router.get('/api/accountinfo', getAccount);

router.post('/api/customers', createcustomer);
router.get('/api/customers', getcustomer);
router.put('/api/customers/:id', updateCustomer)
router.delete('/api/deletecustomer', deleteCustomer)
module.exports = router;