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
    type: String,
    required: true,
  },
  additionalMessage: String,
  numberOfPages: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    default: 25,
  },
  deliveryTime: {
    type: String,
    enum: ['normal', 'urgent_48h', 'very_urgent_24h'],
    default: 'normal',
  },
  deliveryMethod: {
    type: String,
    enum: ['postal', 'mail'],
    default: 'mail',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
