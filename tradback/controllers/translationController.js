// controllers/translationController.js
const Order = require('../models/Order');

// Controller to handle translation request
exports.requestTranslation = async (req, res) => {
  try {
    const { user, languageSource, languageTarget, document, additionalMessage } = req.body;
    const newOrder = new Order({ user, languageSource, languageTarget, document, additionalMessage });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all translation services
exports.getAllTranslationServices = async (req, res) => {
  try {
    // You can fetch services from the database or define them here
    const translationServices = [
      { name: 'Page Translation', description: 'Translation of a single page document' },
      { name: 'Document Translation', description: 'Translation of longer documents' },
      // Add more services as needed
    ];
    res.status(200).json(translationServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add more controllers related to translation as needed
