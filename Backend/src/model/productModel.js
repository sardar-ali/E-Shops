const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: null,
    },
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        man: 0,
        max: 255,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    DateCreated: {
        type: Date,
        default: Date.now,

    }


})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;