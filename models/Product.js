const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    // category: {
    //     type: String,
    //     required: true
    // },
    // subCategory: {
    //     type: String,
    //     required: true
    // },
    img: [{
        type: String
    }],
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    newArrival: {
        type: Boolean,
        required: true
    },
    // size: {
    //     type: Object
    // },
    review: [{
        type: Object
    }]
})

module.exports = mongoose.model("Product", productSchema);