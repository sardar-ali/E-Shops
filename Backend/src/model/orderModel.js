const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    orderItems:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true
    }],

    shippingAddress1: {
        type: String,
        required: true,
    },

    shippingAddress2: {
        type: String,
    },

    city: {
        type: String,
        required: true,
    },

    zip: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        required: true,
        default: "Pending"
    },

    totalPrice: {
        type: Number,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },

    orderDate: {
        type: Date,
        default: Date.now
    },

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


orderSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;