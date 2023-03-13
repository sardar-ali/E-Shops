const express = require("express");
const User = require("../model/userModel")
const router = express.Router();



// CREATE USER 
router.post("/createUser", async (req, res) => {
    try {
        const user = await User.create(req.body);

        if (!user) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "User not created!"
                }
            })
        }

        res.status(201).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
})



//LOGIN USER 
router.post("/loginUser", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // if (await user.comparePassword(req.body?.password, user.passwordHash)) {
        //     console.log("ture")
        // } else {
        //     console.log("false")
        // }
        if (!user) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "User not found!"
                }
            })
        }

        res.status(201).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
})

//GET USERS LIST
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-passwordHash");

        if (!users) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "User not found!"
                }
            })
        }

        res.status(200).json({
            status: "success",
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
})


//GET SINGLE USER 
router.get("/getSingleUser/:id", async (req, res) => {
    try {
        const users = await User.findById(req?.params?.id).select("-passwordHash");

        if (!users) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "User not found!"
                }
            })
        }

        res.status(200).json({
            status: "success",
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
})


module.exports = router;
