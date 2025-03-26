const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order: {
        type: Array
    },
    total: {
        type: Number
    },
    address: {
        type: Object
    },
    email: {
        type: String
    },
    accepted: {
        type: Boolean
    },
    delivered: {
        type: Boolean
    }
})

module.exports = mongoose.model("Order", orderSchema);