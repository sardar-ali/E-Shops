const express = require("express");
const Product = require("../model/productModel")
const router = express.Router();

//GET PRODUCTS
router.get(`/`, async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status:"success",
            success: true,
            products
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            success:false,
            error
        })
    }
})


//CREATE PRODUCT
router.post(`/create`, async(req, res) => {
    try {
        const product = await Product.create(req?.body);
    console.log("product ::", product);
    res.status(201).json(product);

    } catch (error) {
        res.status(500).json({
            status:"fail",
            success:false,
            error
        })
    }
})


module.exports = router;