const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        categories: {
            type: Array
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        buyer: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        seller: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },

    },
    { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);