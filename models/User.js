const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        required: true
    },
    mobile: {
        type: Number,
        default: ""
    },
    address1: {
        type: String,
        default: ""
    },
    address2: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: Number,
        default: ""
    },
    cart: [{
        type: Object
    }],
    wishlist: [{
        type: Object
    }]
})

module.exports = mongoose.model("User", userSchema);