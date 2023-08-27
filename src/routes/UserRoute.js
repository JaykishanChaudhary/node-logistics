const express=require('express');
const {CreateUser, UserLogin} = require("../controller/UserController");
const UserRouter=express.Router();

UserRouter.post('/sign-up',CreateUser);
UserRouter.post('/login',UserLogin);

module.exports=UserRouter;