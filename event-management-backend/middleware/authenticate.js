const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Log header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    console.log("Extracted Token:", token); // Log extracted token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure secret key matches
        console.log("Decoded Token:", decoded); // Log decoded payload
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};
