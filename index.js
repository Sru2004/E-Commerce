const express = require('express');
require('dotenv').config();
const cors = require("cors");
const path = require('path');

const dbConnect = require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());
dbConnect();

const PORT = process.env.PORT || 8080;

const AuthRoutes = require('./routes/Auth');
const FileUpload = require('./controllers/FileUpload');
const ProductRoutes = require('./routes/Product');
const OrderRoutes = require('./routes/Order');

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/file", FileUpload);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/order", OrderRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, ()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})