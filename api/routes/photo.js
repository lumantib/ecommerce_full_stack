const path = require("path");
const Product = require("../models/Product");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");
const multer = require('multer');
const router = require("express").Router();

// Route to serve uploaded photos
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const photoPath = path.join(__dirname, '../Images', filename); // Absolute path to the photo
    res.sendFile(photoPath);
    console.log("first called")

});


module.exports = router;