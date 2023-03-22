const express = require("express");
const Product = require("../model/productModel")
const Category = require("../model/categoryModel")


//GET PRODUCTS
exports.getProducts = async (req, res) => {
    let filter = {};
    if (req?.query?.category) {
        filter = { category: req.query.category?.split(",") }
    }
    try {
        const products = await Product.find(filter).populate("category");
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
}

//CREATE PRODUCT
exports.createProducts = async (req, res) => {
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

        const file = req?.file;
        if (!file) {
            return res.status(400).json({
                status: "fail",
                error: { message: "File is required!" }
            })
        }

        const basePath = `${req?.protocol}://${req?.get("host")}/public/uploads/`
        const fileName = req?.file?.filename

        const product = await Product.create({ ...req?.body, image: `${basePath}${fileName}` });

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
}

//GET single PRODUCT
exports.getSingleProduct = async (req, res) => {
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
}

//UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(400).json({
                status: "fail",
                error: { message: "Invilad category!" }
            })
        }

        const file = req.file;
        if (!file && !req?.body?.image) {
            return res.status(400).json({
                status: "fail",
                error: { message: "Image is required!" }
            })
        }

        const baseUrl = `${req.protocol}://${req?.get("host")}/public/uploads/`
        const fileName = req?.file?.filename;
        const image = file ? `${baseUrl}${fileName}` : req?.body?.image;
       
        const product = await Product.findOneAndUpdate(
            req?.body?.id,
            {
                ...req?.body,
                image: image,
                // name: req?.body?.name,
                // description: req?.body?.description,
                // richDescription: req?.body?.richDescription,
                // image: req?.body?.image,
                // images: req?.body?.images,
                // brand: req?.body?.brand,
                // price: req?.body?.price,
                // category: req?.body?.category,
                // countInStock: req?.body?.countInStock,
                // rating: req?.body?.rating,
                // numReviews: req?.body?.numReviews,
                // isFeatured: req?.body?.isFeatured,
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
}

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
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
}

// GET FEATURED PRODUCTS 
exports.getFeaturedProducts = async (req, res) => {

    const limits = req?.params?.count;
    const featuredProducts = await Product.find({ isFeatured: true }).limit(limits * 1);
    if (!featuredProducts) {
        return res.status(400).json({
            status: "fail",
            error: {
                message: "Featured product not found!"
            }

        })
    }

    res.status(200).json({
        status: "success",
        data: {
            featuredProducts
        }
    })
}

//GET COUNT/TOTAL PRODUCT
exports.getTotalOrders = async (req, res) => {
    const count = await Product.countDocuments();
    res.status(200).json({
        status: "success",
        count
    })
}

//UPDATE PRODUCT IMAGES GELLARYS
exports.updateImagesGellary = async (req, res) => {
    try {

        const files = req?.files;
        const imagesPath = [];
        const basePath = `${req?.protocol}://${req?.get("host")}/public/uploads/`
        if (files) {
            files?.map((file) => {
                imagesPath?.push(`${basePath}${file?.filename}`)
            })
        } else {
            return res.status(400).json({
                status: "fail",
                error: { message: "images is required!" }
            })
        }

        const product = await Product.findOneAndUpdate(
            req?.body?.id,
            {
                images: imagesPath,
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
}