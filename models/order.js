const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cart: {
        items:[{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            qty: Number
        }],
        total:Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Order',orderSchema)