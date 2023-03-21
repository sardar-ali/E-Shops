const Category = require("../model/categoryModel");

//CREATE CATEGORY
exports.createCategory =  async (req, res) => {
    try {
        const category = await Category.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                category,
                message: "Category created successfully!"
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
}

// GET ALL CATEGORY 
exports.getCategories = async (req, res) => {
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
}

// DELETE CATEGORY 
exports.deleteCategory = async (req, res) => {
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
                message: "category deleted successfully!"
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
}

//GET SINGLE CATEGORY
exports.getSingleCategory =  async (req, res) => {
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
}

//UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
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
                message: "category updated successfully!"
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
}