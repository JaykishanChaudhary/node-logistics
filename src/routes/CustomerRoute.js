const express=require('express');
const CustomerRouter=express.Router();
const Customer=require('../controller/CustomerController');
const jwtAuth=require('../middleware/AuthMiddleware')

CustomerRouter.post('/customers',jwtAuth,Customer.CreateCustomer);

module.exports = CustomerRouter;