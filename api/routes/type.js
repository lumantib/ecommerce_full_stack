const Product = require("../models/Product");
const Type = require("../models/Type");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");

const router = require("express").Router();
const { body, validationResult } = require('express-validator');

//create
router.post(
    "/",
    verifyTokenAndAdmin,
    [
        // Add validation checks using express-validator
        body('name').notEmpty().withMessage('Name is required'),
        body('type').notEmpty().withMessage('Type is required'),
        // Add more validation checks as needed for other fields
    ],
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.body);

            const newType = new Type(req.body);
            const savedType = await newType.save();
            res.status(200).json(savedType);
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

// Get types with optional type filter
router.get('/', async (req, res) => {
    try {
        const filter = req.query.type ? { type: req.query.type } : {};
        const types = await Type.find(filter);
        res.status(200).json(types);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit an existing type
router.patch(
    '/:id',
    verifyTokenAndAdmin,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('type').notEmpty().withMessage('Type is required'),
        // Add more validation checks as needed for other fields
    ],
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const typeId = req.params.id;
            const updatedType = await Type.findByIdAndUpdate(typeId, req.body, { new: true });
            if (!updatedType) {
                return res.status(404).json({ message: 'Type not found' });
            }
            res.status(200).json(updatedType);
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

// Delete a type
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const typeId = req.params.id;
        const deletedType = await Type.findByIdAndRemove(typeId);
        if (!deletedType) {
            return res.status(404).json({ message: 'Type not found' });
        }
        res.status(200).json({ message: 'Type deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
