const Order = require('../model/OrderSchema');
const Item = require('../model/ItemSchema');
const Vehicle=require('../model/VehicleSchema');
const Customer=require('../model/CustomerSchema');

exports.CreateOrder = (async (req, res) => {
    try {
        const {itemId, customerId, quantity} = req.body;
        console.log("body payload",req.body);

        // fetch customer details by id
        const CustomerDetail = await Customer.findById(customerId);
        if (!CustomerDetail) {
            res.status(404).json({
                status:"failure",
                result:"no customer found with given customer id"
            })
            return
        }
        console.log("CustomerDetail",CustomerDetail);

        // search available vehicle in city with active order count less than 2
        const availableVehicle = await Vehicle.findOne({
            city: CustomerDetail.city,
            activeOrdersCount: { $lt: 2 } // Max 2 orders condition
        });
        console.log("availableVehicle",availableVehicle);

        if (availableVehicle){
            // fetch item details by id
            const itemDetail = await Item.findById(itemId);
            if (!itemDetail) {
                res.status(404).json({
                    status:"failure",
                    result:"no item found with given item id"
                })
                return
            }
            console.log("itemDetail",itemDetail);

            // calculate order price
            const orderTotalPrice = itemDetail.price * quantity;
            console.log("orderPrice",orderTotalPrice);

            // create order
            const newOrder = await Order.create({
                itemId: itemDetail._id,
                price: orderTotalPrice,
                customerId: customerId,
                vehicleId: availableVehicle._id,
                isDelivered: false
            });
            console.log("new order created:",newOrder);

            // update active order count for vehicle
            const updatedVehicle = await Vehicle.updateOne({_id:availableVehicle._id}, {$set:{activeOrdersCount : (availableVehicle.activeOrdersCount + 1)}})
            console.log("updated vehicle:",updatedVehicle);
            if(updatedVehicle){
                res.status(200).json({
                    status:"success",
                    result: newOrder
                })
            }else {
                res.status(500).json({
                    status:'failure',
                    result:"failed to update active order count for vehicle"
                })
            }
        } else {
            res.status(404).json({
                status:"failure",
                result:"no vehicle found so can not place order."
            })
        }
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while creating an order',
            error: error.message
        });
    }
});

exports.UpdateOrder=(async (req, res)=>{
    try{
        const OrderId=req.params;
        const OrderDetail=await Order.findById(OrderId);
        console.log(OrderDetail);
        if(OrderDetail){
            // mark order delivered
            const UpdatedOrder=await Order.updateOne({_id:OrderId}, {$set:{isDelivered : true}})
            if(UpdatedOrder){
                // fetch vehicle details by id
                const VehicleDetails = await Vehicle.findById(OrderDetail.vehicleId);
                if (!VehicleDetails) {
                    res.status(404).json({
                        status:"failure",
                        result:"no vehicle found with given vehicle id"
                    })
                    return
                }

                // decrease active order count for vehicle
                const updatedVehicle = await Vehicle.updateOne({_id:VehicleDetails._id}, {$set:{activeOrdersCount : (VehicleDetails.activeOrdersCount - 1)}})
                console.log("updated vehicle:",updatedVehicle);
                if(updatedVehicle){
                    res.status(200).json({
                        status:"success",
                        result: UpdatedOrder
                    })
                }else {
                    res.status(500).json({
                        status:'failure',
                        result:"failed to update active order count for vehicle"
                    })
                }
            }else {
                res.status(400).json({
                    status:'failure',
                    result:"failed to mark order delivered"
                })
            }
        }else {
            res.status(400).json({
                status:"failure",
                result:"no order exist with this order id"
            })
        }
    }catch (err){
        console.error('Error updating order:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while updating an order',
            error: err.message
        });
    }
})

