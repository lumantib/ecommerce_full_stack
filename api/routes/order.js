const Order = require("../models/Order");
const Product = require("../models/Product");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");

const router = require("express").Router();
//get all products of seller
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("buyer")
            .populate("products")
            .sort({ createdAt: -1 }); // Sort by 'createdAt' in descending order (latest first)


        let totalPrice = 0;
        let totalPayementCompletedPrice = 0;
        let totalPayementRemainingPrice = 0;

        const ordersWithTotalPrice = orders.map((order) => {
            let orderTotalPrice = 0;

            order.products.forEach((product) => {
                order.payement_completed ? (totalPayementCompletedPrice += product.price) : (totalPayementRemainingPrice += product.price)
                console.log(product)
                orderTotalPrice += product.price;
            });

            totalPrice += orderTotalPrice;

            return { ...order._doc, totalPrice: orderTotalPrice };
        });

        res.status(200).json({ orders: ordersWithTotalPrice, totalPrice, totalPayementCompletedPrice, totalPayementRemainingPrice });
    } catch (err) {
        res.status(500).json(err);
    }
});

//create
router.post("/", verifyToken, async (req, res) => {
    try {
        if (req.body.products === undefined) {
            return res.status(500).json({ error: "Missing products", message: "Please send the products" });
        }

        const userId = req.user.id;
        const productIds = req.body.products;

        const products = await Product.find({ _id: { $in: productIds } });

        // Check if any of the products have already been bought
        const invalidProducts = products.filter((product) => product.buyer);

        if (invalidProducts.length > 0) {
            const invalidProductIds = invalidProducts.map((product) => product._id);
            return res.status(400).json({ error: "Invalid products", message: "The following products have already been bought", invalidProductIds: invalidProductIds });
        }

        if (productIds.length > 0) {
            const newOrder = new Order({
                buyer: userId,
                products: productIds
            });
            const savedOrder = await newOrder.save();

            // Update the buyer field for the products
            await Product.updateMany(
                { _id: { $in: productIds } },
                { buyer: userId }
            );

            // Update the buyer field in the products schema
            const updatedProducts = await Product.find({ _id: { $in: productIds } });

            return res.status(200).json({ success: true, order: savedOrder, products: updatedProducts });
        } else {
            return res.status(400).json({ error: "Missing products", message: "Please send the products" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal server error", message: "An error occurred while processing the request" });
    }
});




//update
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const payement_completed = req.body.payement_completed
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: { payement_completed: payement_completed },
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err)
    }
});

//get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
