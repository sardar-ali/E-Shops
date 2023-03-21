var jwt = require('jsonwebtoken');
const User = require("../model/userModel");

const createToken = (user) => {
    return jwt.sign({ userId: user?.id, isAdmin: user?.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
}

// CREATE USER 
exports.createUser = async (req, res) => {
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
}

//LOGIN USER 
exports.loginUser = async (req, res) => {
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
}

//GET USERS LIST
exports.getAllUsers = async (req, res) => {
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
}

// DELETE PRODUCT
exports.deleteUser =  async (req, res) => {

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
}

//GET SINGLE USER 
exports.getSingleUser = async (req, res) => {
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
}

//GET COUNT/TOTAL USER
exports.getUserCount =  async (req, res) => {
    const count = await User.countDocuments();
    res.status(200).json({
        status: "success",
        count
    })
}