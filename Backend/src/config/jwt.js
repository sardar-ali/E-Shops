var { expressjwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.JWT_SECRET_KEY
    return expressjwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /(.*)/, methods: ["GET", "OPTIONS"] },

            //here use to allow only these methods on selected path
            { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/users(.*)/ },
            "/api/v1/users/loginUser",
            "/api/v1/users/createUser",
        ]
    });

}

//this function check if the user is adming create data if not admin sho Unauthorized error
async function isRevoked(req, token) {
    if (!token.payload.isAdmin) {
        return true;
    }
}

module.exports = authJwt;