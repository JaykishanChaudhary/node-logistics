const express=require('express');
const VehicleRouter=express.Router();
const Vehicle=require('../controller/VehicleController');
const jwtAuth=require('../middleware/AuthMiddleware')


VehicleRouter.post('/vehicles',jwtAuth,Vehicle.CreateVehicle);
VehicleRouter.get('/vehicles',jwtAuth,Vehicle.GetVehicles);
VehicleRouter.put('/vehicle/:_id',jwtAuth,Vehicle.UpdateVehicle);

module.exports=VehicleRouter