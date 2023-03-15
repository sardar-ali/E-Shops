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

userSchema.virtual("id").get(function () {
    return this?._id?.toHexString()
});

//hashed the password beforing in db
userSchema.pre("save", async function (next) {
    console.log(" is password change ::", this.isModified("passwordHash"))
    // if(this.isModified("passwordHash"))
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    next();
});

userSchema.methods.comparePassword = async function (userPassword, passwordHash) {
    return await bcrypt.compare(userPassword, passwordHash);
}

userSchema.pre(/^find/, async function (next) {
    this.passwordHash = undefined;
    next();
});






const User = mongoose.model("Users", userSchema);

module.exports = User;