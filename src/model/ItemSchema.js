const mongoose=require('mongoose');

const itemSchema=mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    }
})


const itemModel=new mongoose.model("Item",itemSchema);

module.exports=itemModel