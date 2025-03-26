const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try{
        const {name, email, mobile, password, confirmPassword, role} = req.body;

        if(!name || !email || !mobile || !password || !confirmPassword || !role){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        if(password!==confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password must be Same"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await User.create({name, email, mobile, password: hashedPassword, role});
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
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

exports.login = async (req, res) => {
    try{
        const {email, password, role} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        const existingUser = await User.findOne({email, role});
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Doesn't Exist, Please Register"
            })
        }

        const hashedPassword = await bcrypt.compare(password, existingUser.password);
        if(!hashedPassword){
            return res.status(401).json({
                success: false,
                message: "Invalid Email Id or Password"
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: "Login Successful",
                name: existingUser.name
            })
        }


    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.cart = async (req, res) => {
    try{
        const {cart, email, role} = req.body;

        const existingProduct = await User.findOne({email, role, cart});
        if(existingProduct){
            return res.status(401).json({
                success: false,
                message: "Product Already Exists"
            })
        }

        const response = await User.updateOne({email, role},{$push: {cart: cart}});
        return res.status(200).json({
            success: true,
            message: "Product Added to Cart Successfully"
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

exports.getCart = async (req, res) => {
    try{
        const {email, role} = req.body;
        const cart = await User.findOne({email, role});
        return res.status(200).json({
            success: true,
            message: "Cart Fetched Successfully",
            data: cart
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

exports.delCart = async (req, res) => {
    try{
        const {slug, size, qty, email, role} = req.body;

        const response = await User.updateOne({email, role},{$pull: {cart: {slug, size, qty}}});
        return res.status(200).json({
            success: true,
            message: "Product Removed from the Cart"
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

exports.emptyCart = async (req, res) => {
    try{
        const {email, role} = req.body;
        if(!email || !role){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const response = await User.updateOne({email, role}, {$set: {"cart": []}})
        return res.status(200).json({
            success: true,
            message: "Cart Empty Successfully"
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

exports.userInfo = async (req, res) => {
    try{
        const {email, role} = req.body;

        if(!email || !role){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const user = await User.findOne({email, role});
        return res.status(200).json({
            success: true,
            message: "User Details Fetched Successfully",
            data: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address1: user.address1,
                address2: user.address2,
                city: user.city,
                state: user.state,
                pincode: user.pincode
            }
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

exports.updateInfo = async (req, res) => {
    try{
        const {address1, address2, city, state, pincode, email, role} = req.body;
        
        if(!email || !role){
            return res.status(401).json({
                success: false,
                message: "Authorized Access"
            })
        }

        const response = await User.findOneAndUpdate({email, role}, {
            address1, address2, city, state, pincode
        })
        return res.status(200).json({
            success: true,
            message: "User Details Updated Successfully"
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

exports.wishlist = async (req, res) => {
    try{
        const {cart, email, role} = req.body;

        const existingProduct = await User.findOne({email, role, wishlist: cart});
        if(existingProduct){
            return res.status(401).json({
                success: false,
                message: "Product Already Exists"
            })
        }

        const response = await User.updateOne({email, role},{$push: {wishlist: cart}});
        return res.status(200).json({
            success: true,
            message: "Product Added to Wishlist Successfully"
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

exports.getWishlist = async (req, res) => {
    try{
        const {email, role} = req.body;
        const user = await User.findOne({email, role});
        return res.status(200).json({
            success: true,
            message: "Wishlist Fetched Successfully",
            data: user.wishlist
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

exports.delWishlist = async (req, res) => {
    try{
        const {slug, email, role} = req.body;

        const response = await User.updateOne({email, role},{$pull: {wishlist: {slug}}});
        return res.status(200).json({
            success: true,
            message: "Product Removed from the Wishlist"
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

exports.manageUser = async (req, res) => {
    try{
        const {email, role} = req.body;
        if(role!=="Admin"){
            return res.status(401).json({
                success: false,
                message: "UnAuthorized Access"
            })
        }
        
        const checkAdmin = await User.findOne({email, role});
        if(!checkAdmin){
            return res.status(401).json({
                success: false,
                message: "UnAuthorized Access"
            })
        }

        const user = await User.find({role: "User"}).select({name: 1, email: 1, mobile: 1, address1: 1, address2: 1,city: 1, state: 1, pincode: 1, _id: 0})
        return res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            data: user
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