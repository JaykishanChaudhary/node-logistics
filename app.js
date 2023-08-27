const express=require('express');
const app=express();
const mongoose=require('mongoose');
const ItemRouter=require('./src/routes/ItemRoute');
const VehicleRouter=require('./src/routes/VehicleRoute');
const OrderRouter=require('./src/routes/OrderRoute');
const CustomerRouter=require('./src/routes/CustomerRoute');
const UserRouter=require('./src/routes/UserRoute');
require('dotenv').config()

// const  port=3000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(ItemRouter);
app.use(VehicleRouter);
app.use(OrderRouter);
app.use(CustomerRouter);
app.use(UserRouter);
mongoose.connect(process.env.DATABASE_CONNECTION_STRING,{
  useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.error(err);
})

app.listen(process.env.PORT,()=>{
    console.log('server is listening on port 3000');
})