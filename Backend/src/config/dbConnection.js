
const mongoose = require("mongoose")

exports.dbConnection = () => { 
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(`${err} Failed to connect database`);
    });
    
}