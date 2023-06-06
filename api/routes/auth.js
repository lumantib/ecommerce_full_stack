const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { verifyToken } = require("./verifyToken");

// register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists in the database
        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (existingUser) {
            // User or email already exists, send appropriate error message
            if (existingUser.username === username) {
                return res
                    .status(400)
                    .json({ error: "Username is already taken. Please choose a different username." });
            }
            if (existingUser.email === email) {
                return res
                    .status(400)
                    .json({ error: "Email is already registered. Please use a different email." });
            }
        }

        // Encrypt the password
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password: encryptedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
});



//LOGIN
router.post("/login", async (req, res) => {
    console.log("this")
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
});

// Route to fetch personal profile info
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;