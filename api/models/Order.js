const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        product: [{
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