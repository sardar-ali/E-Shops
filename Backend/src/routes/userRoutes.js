const express = require("express");
var jwt = require('jsonwebtoken');
const User = require("../model/userModel")
const router = express.Router();

const createToken = (user) => {
    return jwt.sign({ userId: user?.id, isAdmin: user?.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
}


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

        if (!user) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "User not found!"
                }
            })
        }

        if (!user || ! await user.comparePassword(req.body?.password, user.passwordHash)) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "Invalid credentials Please try again!"
                }
            })
        }

        const token = createToken(user);

        res.status(201).json({
            status: "success",
            data: {
                user: {
                    email: user?.email,
                    token
                },
                message: "Login successfully",
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



// DELETE PRODUCT
router.delete("/deleteUser/:id", async (req, res) => {

    try {
        const user = await User.findOneAndDelete(req.params.id);
        
        if (!user) {
            return res.status(400).json({
                status: "fail",
                error: {
                    message: "User not found"
                }
            })
        }

        return res.status(200).json({
            status: "success",
            data: {
                user,
                message: "User deleted successfully"
            }
        })
    } catch (error) {
        return res.status(500).json({
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

//GET COUNT/TOTAL USER
router.get("/getCount", async (req, res) => {
    const count = await User.countDocuments();
    res.status(200).json({
        status: "success",
        count
    })
});



module.exports = router;
