const express = require("express");
const Category = require("../model/categoryModel")
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const category = await Category.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                category,
                message: "Product created successfully!"
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
})


router.get("/getCategories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            status: "success",
            data: {
                categories,
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
})

router.delete("/deleteCategories/:id", async (req, res) => {
    try {
        const category = await Category.findOneAndDelete(req?.params?.id);

        if (!category) {
            return res.status(404).json({
                status: "fail",
                error: {
                    message: `category not found this Id : ${req?.id}`
                }
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                category,
                message: "Product deleted successfully!"
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
});


router.get("/getSingleCategories/:id", async (req, res) => {
    try {

        const category = await Category.findOne({ _id: req?.params?.id });

        if (!category) {
            return res.status(404).json({
                status: "fail",
                error: {
                    message: `category not found this Id : ${req?.id}`
                }
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                category,
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
});



router.patch("/updateCategories", async (req, res) => {
    try {

        const category = await Category.findOneAndUpdate({ _id: req?.body?.id }, {
            name: req?.body?.name,
            icon: req?.body?.icon,
            color: req?.body?.color,
        },
            { new: true });

        if (!category) {
            return res.status(404).json({
                status: "fail",
                error: {
                    message: `category not found this Id : ${req?.id}`
                }
            })
        }

        // const updatedCategory = new Category({
        // name: req?.body?.name,
        // icon: req?.body?.icon,
        // color: req?.body?.color,
        // });

        // const result = await updatedCategory.save();

        res.status(200).json({
            status: "success",
            data: {
                category,
                // category: result,
                message: "Product updated successfully!"
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
})

module.exports = router;
