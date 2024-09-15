const jwt = require('jsonwebtoken');  // Import JWT to verify tokens
const User = require('../models/User');  // Import the User model to find users in the database

// Middleware to protect routes (only logged-in users can access)
const protect = async (req, res, next) => {
  let token;

  // Check if there's an Authorization header with a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret stored in the .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user based on the ID in the token and attach the user's information to req.user
      req.user = await User.findById(decoded.id).select('-password'); // Exclude the password field from user info

      // Move on to the next middleware or route handler
      next();
    } catch (error) {
      // If the token is invalid or verification fails, send an error
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is provided, send an error
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
