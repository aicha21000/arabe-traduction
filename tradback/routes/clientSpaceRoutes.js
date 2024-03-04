// clientSpaceRoutes.js
const express = require('express');
const router = express.Router();
const { getUserOrders, createOrder, cancelOrder, downloadFile } = require('../controllers/clientSpaceController');

router.get('/orders/:userId', getUserOrders);

router.post('/orders', createOrder);

router.delete('/orders/:orderId', cancelOrder);
router.get('/orders/:orderId/download', downloadFile);

module.exports = router;
