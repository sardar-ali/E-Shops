const express = require("express");
const {
    createUser,
    loginUser,
    getAllUsers,
    deleteUser,
    getSingleUser,
    getUserCount
} = require("../controllers/userController")
const router = express.Router();



router.post("/createUser", createUser)
router.post("/loginUser", loginUser)
router.get("/", getAllUsers)
router.delete("/deleteUser/:id", deleteUser)
router.get("/getSingleUser/:id", getSingleUser)
router.get("/getCount", getUserCount);



module.exports = router;
