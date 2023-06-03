const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log(req.headers.token)
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SEC, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token." });
        }

        // Token is valid, attach user information to the request object
        req.user = decodedToken;

        next();
    });
};

module.exports = authMiddleware;
