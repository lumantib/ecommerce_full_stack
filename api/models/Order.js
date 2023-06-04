const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        products: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Product'

        }],
        payement_completed: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);