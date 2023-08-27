const mongoose=require('mongoose');

const VehicleEnum=Object.freeze({
    bike:"bike",
    truck:"truck"
})


const VehicleSchema=new mongoose.Schema({
    registrationNumber:{
        type:String,
        unique:true
    },
    vehicleType:{
        type:String,
        enum:Object.values(VehicleEnum)
    },
    city:{
        type:String,
        required:true
    },
    activeOrdersCount:{
        type:Number,
        default:0,
        max:2
    }

})

const VehicleModel= mongoose.model("Vehicle",VehicleSchema);

module.exports=VehicleModel;