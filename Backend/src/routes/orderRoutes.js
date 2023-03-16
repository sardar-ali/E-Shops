const express = require("express");
const Order = require("../model/orderModel")
const OrderItems = require("../model/orderItemModel")
const router = express.Router();


//CREATE ORDER
router.post("/create", async (req, res) => {
    try {

        //HERE WE CREATE ORDER ITEM IT IS LIST WE ARE LOOPING ON IT SO IN THE CALL PROMISES CALL MULTIPLE TIME SO WE USE PROMISE ALL METHOD TO RETURN SENGLE PROMISE IN RESULT
        const orderItemsId = Promise.all(req?.body?.orderItems.map(async (itm) => {
            const orderItem = await OrderItems.create({ ...itm });
            return orderItem?._id;
        }))

        //IT RETURN A SINGLE PROMISE IN RESULT SO WE RESOLVED HERE TO IDS
        const orderItemsIdResolved = await orderItemsId;

        // HERE WE CREATE ORDER AND PASSWORD SELECTED ORDER ITEMS IDS 
        const order = await Order.create({ ...req.body, orderItems: orderItemsIdResolved });

        res.status(201).json({
            status: "success",
            data: {
                order,
                message: "Order created successfully!"
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
})

// GET ALL ORDERS 
router.get("/getOrders", async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email phone")
            .populate("orderItems")
            .sort("-orderDate");

        res.status(200).json({
            status: "success",
            data: {
                orders,
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
})


// GET SINGLE ORDER 
router.get("/getSingleOrder/:id", async (req, res) => {
    try {

        //here nested and multiple papulation
        const order = await Order.findById(req?.params?.id)
            // order=>orderItem=>product=>category 
            .populate({
                path: "orderItems",
                populate: { path: "product", populate: "category" }
            })
            .populate("user", "name email phone");

        // IMPORTANT NOTE

        //simple papulate orderItems to Order to show order Items detail in order collection/table
        // .populate("orderItems")


        //join product table/collection to orderItem collection to show all product field or detail in orderItem collection/table
        // .populate({ path: "orderItems", populate: "product" })


        //join product table/collection to orderItem collection to show product detail in orderItem collection/table (select mean get only "name","descriptionn" of product in orderItem collection/table)
        // or 
        //get onlye few field of the collection/table in orderItems collection/table
        // .populate({ path: "orderItems", populate: { path: "product", select: "name description" } })

        res.status(200).json({
            status: "success",
            data: {
                order,
            }
        })

    } catch (error) {
        console.log("error :", error)
        res.status(500).json({
            status: "fail",
            error
        })
    }
})


//UPDATE ORDER
router.put("/updateOrder/:id", async (req, res) => {

    try {


        const order = await Order.findByIdAndUpdate(
            req?.params?.id,
            {
                status: req?.body?.status
            },
            {
                new: true
            }
        );

        if (!order) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "Order not found!"
                }
            })
        }

        res.status(200).json({
            status: "success",
            data: {
                order
            },
            message: "Order updated successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        })
    }

})


//DELETE ORDER
router.delete("/deleteOrder/:id", async (req, res) => {

    try {


        const order = await Order.findByIdAndDelete(req?.params?.id);

        if (!order) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "Order not found!"
                }
            })
        }

        res.status(200).json({
            status: "success",
            data: {
                order
            },
            message: "Order deleted successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        })
    }

})

module.exports = router;
