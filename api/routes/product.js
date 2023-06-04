const Product = require("../models/Product");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");

const router = require("express").Router();

//create
router.post("/", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id
        const newProduct = new Product({ ...req.body, seller: userId })
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update
router.patch("/verify", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product_id = req?.body?.product_id
        const isVerified = req.body.isVerified
        const updatedProduct = await Product.findByIdAndUpdate(
            product_id,
            {
                $set: { isVerified: isVerified }
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err)
    }
});

//get product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all products
router.get("/seller", verifyToken, async (req, res) => {

    try {
        const userId = req.user.id;

        const product = await Product.find({ seller: userId }).populate("seller");
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all products
router.get("/", async (req, res) => {

    try {
        const product = await Product.find().populate("seller");
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
