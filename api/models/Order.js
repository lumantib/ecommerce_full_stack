const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        product: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Product'

        }]
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);