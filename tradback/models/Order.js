// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  languageSource: {
    type: String,
    required: true,
  },
  languageTarget: {
    type: String,
    required: true,
  },
  document: {
    type: String, // Path to the uploaded document
    required: true,
  },
  additionalMessage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
