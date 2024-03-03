// controllers/clientSpaceController.js
const User = require('../models/User');
const Order = require('../models/Order');

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


exports.createOrder = async (req, res) => {
  try {
    const { userId, languageSource, languageTarget, additionalMessage } = req.body;

    const file = req.file;

    const document = `/uploads/${file.filename}`;

    const newOrder = new Order({
      user: userId,
      languageSource,
      languageTarget,
      additionalMessage,
      document,

    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    console.log('Cancel Order ID:', orderId);

    const order = await Order.findById(orderId);
    console.log('Order:', order);

    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ error: 'Order not found' });
    }

    const timeElapsed = Date.now() - order.createdAt;
    const minutesElapsed = Math.floor(timeElapsed / (1000 * 60));

    if (minutesElapsed >= 30) {
      console.log('Order cannot be canceled after 30 minutes');
      return res.status(400).json({ error: 'Order cannot be canceled after 30 minutes' });
    }

    await order.deleteOne();
    console.log('Order canceled successfully');
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



