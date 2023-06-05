const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        categories: {
            type: Array
        },
        seasons: {
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
            ref: 'User',
            required: true
        },
        payement_completed: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);