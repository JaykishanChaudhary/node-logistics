const express=require('express');
const ItemRouter=express.Router();
const Item=require('../controller/ItemController');
const jwtAuth=require('../middleware/AuthMiddleware')


ItemRouter.post('/items',jwtAuth,Item.CreateItem);
ItemRouter.get('/items',jwtAuth,Item.GetItems);
ItemRouter.put('/item/:_id',jwtAuth,Item.UpdateItem);

module.exports = ItemRouter