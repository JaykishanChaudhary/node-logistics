const VehicleModel=require('../model/VehicleSchema');

exports.CreateVehicle = (async(req,res) => {
    try{
        const {registrationNumber,vehicleType,city} = req.body;
        const NewVehicle = await VehicleModel.create({
            registrationNumber,
            vehicleType,
            city,
            activeOrderCount: 0 // Set activeOrderCount to zero during creation
        })
        console.log(NewVehicle)
        if(NewVehicle){
            res.status(200).json({
                status:"success",
                result:NewVehicle
            })
        }else {
            res.status(500).json({
                status:"failure",
                result:"Unable to create a new vehicle"
            })
        }
    }catch (err){
        console.error('Error creating vehicle:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while creating the vehicle',
            error: err.message
        });
    }
})

exports.GetVehicles = (async(req, res) => {
    try {
        const Vehicles=await  VehicleModel.find({});
        if (Vehicles.length > 0) {
            res.status(200).json({
                status: 'success',
                result: Vehicles
            });
        } else {
            res.status(404).json({
                status: 'fail',
                result: 'No vehicles found'
            });
        }
    }catch (err){
        console.error('Error fetching vehicles:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching vehicles',
            error: err.message
        });
    }
})

exports.UpdateVehicle = (async(req,res) => {
    try{
        const _id = req.params;
        console.log(_id);
        const Vehicle = await VehicleModel.findOne({_id});
        console.log(Vehicle);
        if(Vehicle){
            const { activeOrderCount, ...updateData } = req.body; // Exclude activeOrderCount from updateData
            const UpdatedVehicle = await VehicleModel.updateOne({_id},updateData);
            console.log(UpdatedVehicle);
            res.status(200).json({
                status:'success',
                result:UpdatedVehicle
            })
        }else {
            res.status(404).json({
                status:"failure",
                result:"No Vehicle found of this id"
            })
        }
    }catch (err){
        console.error('Error updating vehicle:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while updating the vehicle',
            error: err.message
        });
    }
})