// clientSpaceRoutes.js
const express = require('express');
const router = express.Router();
const { getUserOrders, createOrder, cancelOrder } = require('../controllers/clientSpaceController');

router.get('/orders/:userId', getUserOrders);

router.post('/orders', createOrder);

router.delete('/orders/:orderId', cancelOrder);

module.exports = router;
