require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/FormData'); // Import your User model

const verifyToken = async (req, res, next) => {
    // Token can be sent in 3 ways: header, body, query
    const token = req.body.token || req.query.token || req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            success: false,
            msg: 'A token is required for authentication'
        });
    }

    try {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        const decodedData = jwt.verify(bearerToken, process.env.ACCESS_SECRET_TOKEN);
      

        // Fetch the user details from the database using userId
        const user = await User.findById(decodedData.userId);

        // Check if user exists and assign user details to req.user
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'User not found'
            });
        }

        // Assign user details to req.user
        req.user = user;

    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid Token'
        });
    }

    return next();
};

module.exports = verifyToken;
