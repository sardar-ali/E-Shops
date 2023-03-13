const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String
    },
    apartment: {
        type: String,
    },
    city: {
        type: String,
    },
    zip: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

//hashed the password beforing in db
userSchema.pre("save", async function (next) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    next();
});

userSchema.method.comparePassword = async function (userPassword, passwordHash) {
    const isMatched = await bcrypt.compare(userPassword, passwordHash);
    console.log("isMatched ::", isMatched);

    return isMatched;
}

userSchema.pre(/^find/, async function (next) {
    this.passwordHash = undefined;
    next();
});



userSchema.virtual("id").get(function () {
    return this?._id?.toHexString()
});



const User = mongoose.model("Users", userSchema);

module.exports = User;