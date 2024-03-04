// translationRoutes.js
const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');
const upload = require('../middlewares/Multer');
const { verifyToken } = require('../middlewares/authMiddleware');

// Route pour soumettre une demande de traduction
router.post('/request', upload.single('document'), verifyToken, translationController.requestTranslation);

// Route pour obtenir tous les services de traduction
router.get('/services', translationController.getAllTranslationServices);





module.exports = router;