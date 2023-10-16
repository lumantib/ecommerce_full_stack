const path = require("path");
const Product = require("../models/Product");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");
const multer = require('multer');
const router = require("express").Router();

// Set storage for uploaded photos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Images')); // Absolute path to the destination folder for uploaded photos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); // Set the filename of the uploaded photo
    },
});

// File filter to only allow certain file types (e.g., images)
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true); // Accept the file
    } else {
        cb(null, false); // Reject the file
    }
};

// Initialize multer with the storage and file filter options
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Create route with file upload
router.post('/', verifyToken, upload.single('photo'), async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, price, description, categories, seasons } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required fields.' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Product photo is required.' });
        }

        const photoPath = req.file.filename;

        const newProduct = new Product({
            name: name,
            price: price,
            photo: photoPath,
            description: description,
            seller: userId,
            categories: categories.split(","),
            seasons: seasons.split(","),
        });

        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create product. Please try again later.', err });
    }
});

router.patch('/seller/:id', verifyToken, upload.single('photo'), async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const { name, price, description, categories, seasons } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required fields.' });
        }

        // You can check if a new photo was uploaded and update it if needed
        let photoPath;
        if (req.file) {
            photoPath = req.file.filename;
        }

        // Find the existing product by ID
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Check if the user is the owner of the product
        if (existingProduct.seller.toString() !== userId) {
            return res.status(403).json({ error: 'You are not authorized to update this product.' });
        }

        // Update the product properties
        existingProduct.name = name;
        existingProduct.price = price;
        if (photoPath) {
            existingProduct.photo = photoPath;
        }
        existingProduct.description = description;
        existingProduct.categories = categories.split(",");
        existingProduct.seasons = seasons.split(",");

        // Save the updated product
        const updatedProduct = await existingProduct.save();

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the product. Please try again later.' });
    }
});

// Create route with file upload
// router.patch('/seller/:id', verifyToken, upload.single('photo'), async (req, res) => {
//     try {
//         const userId = req.user.id;
//         console.log('req.body: ', await req.body);
//         const { name, price, description, categories, seasons } = req.body;

//         if (!name || !price) {
//             return res.status(400).json({ error: 'Name and price are required fields.' });
//         }

//         if (!req.file) {
//             return res.status(400).json({ error: 'Product photo is required.' });
//         }

//         // const photoPath = req.file.filename;

//         // const newProduct = new Product({
//         //     name: name,
//         //     price: price,
//         //     photo: photoPath,
//         //     description: description,
//         //     seller: userId,
//         //     categories: categories.split(","),
//         //     seasons: seasons.split(","),
//         // });

//         // const savedProduct = await newProduct.save();
//         res.status(200).json(savedProduct);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to create product. Please try again later.' });
//     }
// });


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

//get all products of seller
router.get("/seller", verifyToken, async (req, res) => {

    try {
        const userId = req.user.id;

        const product = await Product.find({ seller: userId }).populate("seller");
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all products which are verified and match specific categories
router.get("/isVerified", async (req, res) => {
    try {
        const { category } = req.query;
        let productQuery = {
            isVerified: true,
            buyer: { $exists: false }
        };
        console.log("category", category)
        if (category) {
            productQuery.categories = { $in: category };
        }
        console.log("category", productQuery)

        const products = await Product.find(productQuery).populate("seller");

        // Modify the response to send the relative photo path instead of the absolute file path
        const modifiedProducts = products.map((product) => ({
            ...product._doc,
            photo: `/${product._doc.photo}` // Assuming the photos are served from the "/photos" route
        }));

        res.status(200).json(modifiedProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve products. Please try again later." });
    }
});


//get all products
router.get("/", async (req, res) => {

    try {
        const product = await Product.find().populate("seller").populate("buyer");
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
