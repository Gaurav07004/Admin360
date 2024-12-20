/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    productID: {
        type: String,
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    stockStatus: {
        type: String,
        required: true,
    },
    supplier: {
        name: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    previousCount: {
        type: Number,
        required: true,
    },
    viewsCount: {
        type: Number,
        required: true,
    },
    purchaseCount: {
        type: Number,
        required: true,
    },
    wishlistCount: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    lastUpdatedBy: {
        type: String,
        required: true,
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now,
    },
    productImage: {
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
