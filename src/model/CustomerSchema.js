const mongoose=require('mongoose');

const CustomerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})

const customerModel=new mongoose.model("Customer",CustomerSchema);

module.exports=customerModel