const CustomerModel=require('../model/CustomerSchema');

exports.CreateCustomer = (async(req,res) => {
    try{
        const {name,city} = req.body;
        const NewCustomer = await CustomerModel.create({
            name,
            city
        })
        console.log('New customer created:', NewCustomer);
        res.status(200).json({
            status:"success",
            result:NewCustomer
        })
    }catch (err){
        console.error('Error creating customer:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while creating the customer',
            error: err.message
        })
    }
})