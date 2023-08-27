const express=require('express');
const OrderRouter=express.Router();
const Order=require('../controller/OrderController');
const jwtAuth=require('../middleware/AuthMiddleware');


OrderRouter.post('/orders',jwtAuth,Order.CreateOrder);
OrderRouter.put('/order/:_id',jwtAuth,Order.UpdateOrder);

module.exports = OrderRouter;