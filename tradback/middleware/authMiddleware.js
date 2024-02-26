// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); // Replace with your secret key

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
