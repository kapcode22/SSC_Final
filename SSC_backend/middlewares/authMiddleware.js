const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
    try {
        const token = req.cookies.token; // Assuming token is stored in cookies
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, "SSC_123"); // Use your secret key
        req.user = decoded; // Attach user data to request object

        next(); // Proceed to the next middleware/controller
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message });
    }
};

module.exports = isAuthorized;
