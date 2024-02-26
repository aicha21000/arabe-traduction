// controllers/clientSpaceController.js
const User = require('../models/User');
const Order = require('../models/Order');

// Controller to get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userOrders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add more controllers related to client space as needed
