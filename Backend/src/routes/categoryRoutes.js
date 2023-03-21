const express = require("express");
const {
    createCategory,
    getCategories,
    deleteCategory,
    getSingleCategory,
    updateCategory
} = require("../controllers/categoryController")
const router = express.Router();


router.post("/create", createCategory)
router.get("/getCategories", getCategories)
router.delete("/deleteCategories/:id", deleteCategory);
router.get("/getSingleCategories/:id", getSingleCategory);
router.patch("/updateCategories", updateCategory)

module.exports = router;
