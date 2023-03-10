const express = require("express");
const Product = require("../model/productModel")
const Category = require("../model/categoryModel")
const router = express.Router();

//GET PRODUCTS
router.get(`/`, async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json({
            status: "success",
            success: true,
            data: {
                products,
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            success: false,
            error
        })
    }
})


//CREATE PRODUCT
router.post(`/create`, async (req, res) => {
    try {

        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(400).json({
                status: "fail",
                error: { message: "Invilad category!" }
            })
        }


        // const products = new Product({
        // name: req?.body?.name,
        // descritpion: req?.body?.descritpion,
        // richDescritpion: req?.body?.richDescritpion,
        // image: req?.body?.image,
        // images: req?.body?.images,
        // brand: req?.body?.brand,
        // price: req?.body?.price,
        // category: req?.body?.category,
        // countInStock: req?.body?.countInStock,
        // rating: req?.body?.rating,
        // numReviews: req?.body?.numReviews,
        // isFeatured: req?.body?.isFeatured,
        // });

        // product = await product.save()


        const product = await Product.create(req?.body);
        res.status(201).json({
            status: "success",
            data: {
                product,
                message: "Product created successfully"
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            success: false,
            error
        })
    }
})


//GET single PRODUCT
router.get("/getSingleProduct/:id", async (req, res) => {
    try {

        // get spacific feilds (name, color) data from refrence collection ("Category")
        const product = await Product.findById(req?.params?.id).populate("category", "name color");

        if (!product) {
            return res.status(404).json({
                status: "fail",
                error: {
                    message: `product not found`
                }
            })
        }

        res.status(200).json({
            status: "success",
            data: {
                product,
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
});


//UPDATE PRODUCT
router.patch("/updateProduct", async (req, res) => {
    try {

        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(400).json({
                status: "fail",
                error: { message: "Invilad category!" }
            })
        }

        const product = await Product.findOneAndUpdate(
            req?.body?.id,
            {
                name: req?.body?.name,
                description: req?.body?.description,
                richDescription: req?.body?.richDescription,
                image: req?.body?.image,
                images: req?.body?.images,
                brand: req?.body?.brand,
                price: req?.body?.price,
                category: req?.body?.category,
                countInStock: req?.body?.countInStock,
                rating: req?.body?.rating,
                numReviews: req?.body?.numReviews,
                isFeatured: req?.body?.isFeatured,
            }, {
            new: true
        });

        if (!product) {
            return res.status(404).json({
                status: "fail",
                error: {
                    message: `product not found`
                }
            })
        }

        res.status(200).json({
            status: "success",
            data: {
                product,
                message: "Product updated successfully",
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
});


//UPDATE DELETE
router.delete("/deleteProduct/:id", async (req, res) => {
    try {


        const product = await Product.findOneAndDelete(req.params.id);
        if (!product) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "Product not found"
                }
            })
        }


        return res.status(200).json({
            status: "success",
            data: {
                product,
                message: "Product deleted successfully"
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error
        })
    }
})


//GET COUNT/TOTAL PRODUCT
router.get("/getCount", async (req, res) => {
    const count = await Product.countDocuments();
    res.status(200).json({
        status: "success",
        count
    })
});


module.exports = router;