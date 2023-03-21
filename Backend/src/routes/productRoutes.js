const express = require("express");
const multer = require('multer')
const {
    getProducts,
    createProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getTotalOrders,
    updateImagesGellary
} = require("../controllers/productController");

const router = express.Router();

//spacify file/image type 
const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
}


//create directory where the image store and make the file name unique
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("Invalid image type");

        if (isValid) {
            uploadError = null
        }

        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-")
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

//set that directory here
const uploadOptions = multer({ storage })

router.get(`/`, getProducts)
router.post(`/create`, uploadOptions.single('image'), createProducts)
router.get("/getSingleProduct/:id", getSingleProduct);
router.put("/updateProduct", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct)
router.get("/getCount", getTotalOrders);
router.get("/getFeaturedProdcuts/:count", getFeaturedProducts)
router.put("/gellary-images/:id", uploadOptions.array("images", 10), updateImagesGellary);

module.exports = router;