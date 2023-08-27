const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber:{
      type:String
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    price:{
        type:Number
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
});

// updates order number when new order is created
orderSchema.pre('save', async function (next) {
    // Generate and set the orderNumber
    if (!this.orderNumber) {
        const lastOrder = await Order.findOne({}, {}, { sort: { orderNumber: -1 } });
        console.log(lastOrder);
        if (lastOrder) {
            const lastOrderNumber = parseInt(lastOrder.orderNumber, 10);
            this.orderNumber = String(lastOrderNumber + 1).padStart(4, '0');
            console.log(this.orderNumber);
        } else {
            this.orderNumber = '0001';
        }
    }

    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
