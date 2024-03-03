// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  console.log('Received Token:', token);

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided or in the wrong format' });
  }

  const tokenValue = token.split(' ')[1];

  try {
    const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);

    console.log('Decoded Token:', decoded);

    req.user = {
      userId: decoded.userId,
    };
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};