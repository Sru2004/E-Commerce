const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect(){
    await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("DB Connected Successfully!!"))
    .catch((error)=>{
        console.log(error)
        process.exit(1);
    });
}

module.exports = dbConnect;