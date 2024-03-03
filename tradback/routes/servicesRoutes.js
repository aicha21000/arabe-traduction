// servicesRoutes.js
const express = require('express');
const router = express.Router();
const { getAllAdditionalServices, addAdditionalService } = require('../controllers/servicesController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Route to get all additional services
router.get('/services', verifyToken, getAllAdditionalServices);

// Route to add a new additional service
router.post('/services', verifyToken, addAdditionalService);

// Add more routes related to services functionalities as needed

module.exports = router;
