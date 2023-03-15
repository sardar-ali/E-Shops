const errorHandler = (err, req, res, next) => {
console.log("error ::", err)
    if (err?.name == "UnauthorizedError") {
        return res.status(401).json({
            error: {
                message: "The user is not Authorized"
            }
        })
    }


    if (err?.name == "ValidationError") {
        return res.status(400).json({
            error: {
                message: err,
            }
        })
    }


    return res.status(500).json({
        error: {
            message: err
        }
    })



}

module.exports = errorHandler;