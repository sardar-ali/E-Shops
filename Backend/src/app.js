const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config();
const { dbConnection } = require("./config/dbConnection")
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express();

//cors setups
app.use(cors());
app.options("*")

//db connection establish here
dbConnection()

// THIS MIDDLEWARE PARSE REQUEST BODY TO JSON
app.use(express.json());

//MORGAN SHOW LOGGING
app.use(morgan("tiny"))

//API ROUTING SETTINGS
const api = process.env.API_URL;
app.use(`${api}/users`, userRoutes)
app.use(`${api}/products`, productRoutes)
app.use(`${api}/categories`, categoryRoutes)
app.use(`${api}/orders`, orderRoutes)


//LISTEN SERVER ON PORT 8080
app.listen(8080, () => {
    console.log("Server is running on port 8080!")
})