// contactRoutes.js

const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactController');

// Route for submitting contact form
router.post('/', sendContactMessage);

module.exports = router;
