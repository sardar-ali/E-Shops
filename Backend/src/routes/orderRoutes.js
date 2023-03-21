const express = require("express");
const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getTotalSales,
    getTotalOrders,
    getUserOrders
} = require("../controllers/orderController")
const router = express.Router();


//all order api's
router.post("/create", createOrder)
router.get("/getOrders", getAllOrders)
router.get("/getSingleOrder/:id", getSingleOrder)
router.put("/updateOrder/:id", updateOrder)
router.delete("/deleteOrder/:id", deleteOrder)
router.get("/getTotalSales", getTotalSales)
router.get("/getOrderCount", getTotalOrders);
router.get("/getUserOrder/:id", getUserOrders);


module.exports = router;
