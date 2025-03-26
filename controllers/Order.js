const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
    try{
        const {order, total, address, accepted, delivered, email, role} = req.body;
        
        if(role!=="User"){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        if(!total || !address || !email){
            return res.status(401).json({
                success: false,
                message: "Plese Fill All the Details"
            })
        }

        if(order.length===0){
            return res.status(401).json({
                success: false,
                message: "Please Add Products to the Cart"
            })
        }

        const response = await Order.create({order, total, address, accepted, delivered, email});
        return res.status(200).json({
            success: true,
            message: "Order Placed Successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getUserOrder = async (req, res) => {
    try{
        const {email, role} = req.body;

        if(role!=="User"){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const response = await Order.find({email})
        return res.status(200).json({
            success: true,
            message: "Order Fetched Successfully",
            data: response
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getAllOrder = async (req, res) => {
    try{
        const {role, email} = req.body;

        if(role!=="Admin"){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const checkAdmin = await User.findOne({email, role});
        if(!checkAdmin){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const response = await Order.find();
        return res.status(200).json({
            success: true,
            message: "Order Fetched Successfully",
            data: response
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.acceptOrder = async (req, res) => {
    try{
        const {orderid, role, email} = req.body;

        if(role!=="Admin"){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const checkAdmin = await User.findOne({email, role});
        if(!checkAdmin){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const response = await Order.findByIdAndUpdate(orderid, {$set :{accepted: true}});
        return res.status(200).json({
            success: true,
            message: "Order Accepted Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.deliveredOrder = async (req, res) => {
    try{
        const {orderid, role, email} = req.body;

        if(role!=="Admin"){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const checkAdmin = await User.findOne({email, role});
        if(!checkAdmin){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const response = await Order.findByIdAndUpdate(orderid, {$set :{delivered: true}});
        return res.status(200).json({
            success: true,
            message: "Order Delivered Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}